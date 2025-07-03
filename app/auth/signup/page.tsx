"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuthContext } from "../../components/AuthProvider";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function SignUpPage() {
  const { signUp } = useAuthContext();
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    try {
      const user = await signUp(form.email, form.password);
      if (role === 'coach') {
        // Wait for Auth state to be ready and match UID
        await new Promise((resolve) => {
          const unsubscribe = onAuthStateChanged(getAuth(), (authUser) => {
            console.log('Auth state in generic signup:', authUser);
            if (authUser && authUser.uid === user.uid) {
              unsubscribe();
              resolve(null);
            }
          });
        });
        console.log('About to write to Firestore. UID:', user.uid, 'Auth user:', getAuth().currentUser);
        // Create coach document in Firestore
        const coachDoc = {
          email: user.email,
          createdAt: new Date(),
          status: 'active',
          role: 'coach',
        };
        console.log('Firestore write data:', coachDoc);
        await setDoc(doc(db, 'coaches', user.uid), coachDoc);
        console.log('Firestore write successful');
        router.push('/professionals/onboard');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      console.log('Error caught in handleSubmit:', err);
      setError(err.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError("");
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(getAuth(), provider);
      const isNewUser = result._tokenResponse?.isNewUser || result.additionalUserInfo?.isNewUser;
      
      if (isNewUser && role === 'coach') {
        // Create coach document in Firestore
        await setDoc(doc(db, 'coaches', result.user.uid), {
          email: result.user.email,
          createdAt: new Date(),
          status: 'active',
          role: 'coach',
          // Add any other default fields you want
        });
        router.push('/professionals/onboard');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      console.log('Google sign up error:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign up was cancelled.');
      } else if (err.code === 'auth/account-exists-with-different-credential') {
        setError('An account already exists with this email using a different sign-in method.');
      } else {
        setError('Google sign up failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] py-12 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#4AC1E0]">Sign Up</h1>
        {success ? (
          <div className="text-green-600 text-center mb-6 font-semibold">Account created! You can now <Link href="/auth/signin" className="underline text-[#4AC1E0]">sign in</Link>.</div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
                autoComplete="new-password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
                autoComplete="new-password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#4AC1E0] hover:bg-[#E0DF00] text-white hover:text-black font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl text-center"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
        )}
        <button
          onClick={handleGoogleSignUp}
          className="w-full mt-4 bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-xl flex items-center justify-center gap-2 shadow hover:bg-gray-50 transition"
          disabled={loading}
        >
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
          Sign up with Google
        </button>
        {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/signin" className="text-[#4AC1E0] hover:underline font-semibold">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
} 
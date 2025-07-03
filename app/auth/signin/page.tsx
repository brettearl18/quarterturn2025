"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuthContext } from "../../components/AuthProvider";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function SignInPage() {
  const { signIn } = useAuthContext();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await signIn(form.email, form.password);
      
      // Check if user is a coach
      const coachDoc = await getDoc(doc(db, 'coaches', user.uid));
      if (coachDoc.exists()) {
        router.push(`/coach/${user.uid}`);
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(getAuth(), provider);
      
      // Check if user is a coach
      const coachDoc = await getDoc(doc(db, 'coaches', result.user.uid));
      if (coachDoc.exists()) {
        router.push(`/coach/${result.user.uid}`);
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign in was cancelled.');
      } else if (err.code === 'auth/account-exists-with-different-credential') {
        setError('An account already exists with this email using a different sign-in method.');
      } else {
        setError('Google sign in failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] py-12 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#4AC1E0]">Sign In</h1>
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
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#4AC1E0] hover:bg-[#E0DF00] text-white hover:text-black font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl text-center"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <button
          onClick={handleGoogleSignIn}
          className="w-full mt-4 bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-xl flex items-center justify-center gap-2 shadow hover:bg-gray-50 transition"
          disabled={loading}
        >
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>
        {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
        <div className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="text-[#4AC1E0] hover:underline font-semibold">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
} 
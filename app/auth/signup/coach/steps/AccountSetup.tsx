'use client';

import { useState } from 'react';
import { useFormValidation, commonRules } from '../components/FormValidation';
import { auth } from '@/app/lib/firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

interface AccountSetupProps {
  onComplete: (data: any) => void;
  initialData?: any;
}

export default function AccountSetup({ onComplete, initialData }: AccountSetupProps) {
  const [formData, setFormData] = useState({
    email: initialData?.email || '',
    password: '',
    confirmPassword: '',
    agree: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { errors, validateField, validateForm } = useFormValidation({
    email: [commonRules.required(), commonRules.email()],
    password: [commonRules.required(), commonRules.password()],
    confirmPassword: [
      commonRules.required(),
      {
        validate: (value) => value === formData.password,
        message: 'Passwords do not match'
      }
    ],
    agree: [
      {
        validate: (value) => value === true,
        message: 'You must agree to the terms and conditions'
      }
    ]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    validateField(name, type === 'checkbox' ? checked : value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm(formData)) {
      setLoading(true);
      setError('');
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        const uid = userCredential.user.uid;
        // Wait for Auth state to be ready
        await new Promise((resolve) => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && user.uid === uid) {
              unsubscribe();
              resolve(null);
            }
          });
        });
        onComplete({ email: formData.email, uid });
      } catch (err: any) {
        setError(err.message || 'Failed to create account.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm
            ${errors.email ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}`}
          placeholder="your@email.com"
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm
            ${errors.password ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}`}
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="mt-2 text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm
            ${errors.confirmPassword ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}`}
          placeholder="••••••••"
        />
        {errors.confirmPassword && (
          <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
        )}
      </div>

      <div className="flex items-center">
        <input
          id="agree"
          name="agree"
          type="checkbox"
          checked={formData.agree}
          onChange={handleChange}
          className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500
            ${errors.agree ? 'border-red-300' : ''}`}
        />
        <label htmlFor="agree" className="ml-2 block text-sm text-gray-700">
          I agree to the <a href="#" className="text-blue-600 underline">Terms and Conditions</a> and <a href="#" className="text-blue-600 underline">Privacy Policy</a>
        </label>
      </div>
      {errors.agree && (
        <p className="mt-2 text-sm text-red-600">{errors.agree}</p>
      )}

      {error && <div className="text-red-600 text-sm">{error}</div>}

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Continue'}
        </button>
      </div>
    </form>
  );
} 
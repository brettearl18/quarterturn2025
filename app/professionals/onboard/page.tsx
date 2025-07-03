"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../../components/AuthProvider';
import OnboardingForm from './OnboardingForm';

export default function OnboardPage() {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth/signin');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl mt-24">
        <h1 className="text-3xl font-bold mb-6 text-center">Become a Health Professional</h1>
        <OnboardingForm user={user} />
      </div>
    </div>
  );
} 
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../../../components/AuthProvider';
import ProgressBar from './components/ProgressBar';
import AccountSetup from './steps/AccountSetup';
import BasicProfile from './steps/BasicProfile';
import ProfessionalDetails from './steps/ProfessionalDetails';
import ServicesPricing from './steps/ServicesPricing';
import AvailabilitySetup from './steps/AvailabilitySetup';
import VerificationReview from './steps/VerificationReview';
import { mockCoachData } from './mockData';
import { db, auth } from '@/app/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const STEPS = [
  { id: 'account', title: 'Account Setup', description: 'Create your secure login' },
  { id: 'profile', title: 'Basic Profile', description: 'Tell us about yourself' },
  { id: 'professional', title: 'Professional Details', description: 'Share your expertise' },
  { id: 'services', title: 'Services & Pricing', description: 'Define your offerings' },
  { id: 'availability', title: 'Schedule', description: 'Set your availability' },
  { id: 'verification', title: 'Verification', description: 'Verify your credentials' },
];

// For testing purposes
const USE_MOCK_DATA = true;

export default function CoachSignup() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(USE_MOCK_DATA ? mockCoachData : {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { user } = useAuthContext();

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleStepComplete = async (stepData: any) => {
    setFormData(prev => ({
      ...prev,
      [STEPS[currentStep].id]: stepData
    }));

    // If this is the last step, save to Firestore
    if (currentStep === STEPS.length - 1) {
      setLoading(true);
      setError('');
      setSuccess(false);
      try {
        // Get UID from formData (from AccountSetup step)
        const uid = formData.account?.uid || stepData.uid;
        if (!uid) throw new Error('User ID not found.');

        // Wait for Auth state to be ready and match UID
        await new Promise((resolve) => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log('Auth state in parent:', user);
            if (user && user.uid === uid) {
              unsubscribe();
              resolve(null);
            }
          });
        });
        console.log('About to write to Firestore. UID:', uid, 'Auth user:', auth.currentUser);

        // Prepare the data to save
        const coachProfile = {
          account: formData.account,
          profile: formData.profile,
          professional: formData.professional,
          services: formData.services,
          availability: formData.availability,
          verification: stepData,
          createdAt: new Date().toISOString(),
        };

        // Debug: Log the data being written
        console.log('Firestore write data:', coachProfile);
        await setDoc(doc(db, 'coachProfiles', uid), coachProfile, { merge: true });
        console.log('Firestore write successful');
        setSuccess(true);
        // Optionally redirect after a short delay
        setTimeout(() => {
          router.push(`/coach/${uid}`);
        }, 2000);
      } catch (err: any) {
        console.log('Error caught in handleStepComplete:', err);
        setError(err.message || 'Failed to save profile.');
      } finally {
        setLoading(false);
      }
    } else {
      handleNext();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <AccountSetup onComplete={handleStepComplete} initialData={formData.account} />;
      case 1:
        return <BasicProfile onComplete={handleStepComplete} initialData={formData.profile} />;
      case 2:
        return <ProfessionalDetails onComplete={handleStepComplete} initialData={formData.professional} />;
      case 3:
        return <ServicesPricing onComplete={handleStepComplete} initialData={formData.services} />;
      case 4:
        return <AvailabilitySetup onComplete={handleStepComplete} initialData={formData.availability} />;
      case 5:
        return <VerificationReview 
          onComplete={handleStepComplete} 
          initialData={formData.verification}
          allData={formData}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-10">
          <ProgressBar steps={STEPS} currentStep={currentStep} />
          {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">{error}</div>}
          {success && <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">Profile saved! Redirecting...</div>}
          {/* Step Content */}
          {loading ? (
            <div className="text-center py-12 text-lg text-blue-600 font-semibold">Saving your profile...</div>
          ) : (
            renderStep()
          )}
        </div>
      </div>
    </div>
  );
} 
import OnboardingForm from './OnboardingForm';

export default function OnboardPage() {
  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl mt-24">
        <h1 className="text-3xl font-bold mb-6 text-center">Become a Health Professional</h1>
        <OnboardingForm />
      </div>
    </div>
  );
} 
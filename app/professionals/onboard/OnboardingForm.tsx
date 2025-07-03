'use client';
import { useState } from 'react';
import { useAuthContext } from '../../components/AuthProvider';
import { db, storage } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { SPECIALTIES } from '../../constants/specialties';
import { useRouter } from 'next/navigation';

const steps = [
  'Basic Info',
  'Professional Details',
];

function Stepper({ step }) {
  return (
    <div className="mb-8 flex justify-center">
      <div className="flex items-center justify-center mx-auto w-full max-w-xl">
        {steps.map((label, idx) => (
          <div key={label} className="flex items-center">
            <div className={`rounded-full w-6 h-6 flex items-center justify-center font-bold text-white shadow transition-all duration-200
              ${step === idx ? 'bg-primary' : 'bg-gray-300'}
              border-2 border-white text-xs`}>{idx + 1}</div>
            {idx < steps.length - 1 && <div className="w-4 h-1 bg-gray-200 mx-0.5 rounded" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OnboardingForm() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    fullName: '',
    profileImage: '',
    email: '',
    location: '',
    title: '',
    experience: '',
    credentials: '',
    specialties: [],
    modalities: [],
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm((prev) => ({
        ...prev,
        [name]: checked
          ? [...(prev[name] || []), value]
          : (prev[name] || []).filter((v) => v !== value)
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploadingImage(true);
    try {
      const storageRef = ref(storage, `professionals/${user.uid}/profile`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setForm(prev => ({ ...prev, profileImage: downloadURL }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to create a profile');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await setDoc(doc(db, 'professionals', user.uid), {
        ...form,
        userId: user.uid,
        email: user.email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        onboardingComplete: true,
      });
      router.push(`/coach/${user.uid}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7fbf9] py-12 px-2">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div className="text-center font-semibold text-gray-500 mb-2">
          Step {step + 1} / {steps.length}
        </div>
        <Stepper step={step} />
        <form onSubmit={handleSubmit} className="space-y-10">
          {step === 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-primary">Basic Info</h2>
              <div className="space-y-5">
                <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required className="input input-bordered w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition" />
                <div>
                  <label className="block text-sm font-medium mb-1">Profile Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full border rounded px-3 py-2"
                    disabled={uploadingImage}
                    required
                  />
                  {uploadingImage && <div className="text-sm text-gray-500 mt-1">Uploading...</div>}
                  {form.profileImage && (
                    <img
                      src={form.profileImage}
                      alt="Profile preview"
                      className="w-24 h-24 rounded-full object-cover mt-2"
                    />
                  )}
                </div>
                <input name="email" placeholder="Contact Email" value={form.email} onChange={handleChange} required className="input input-bordered w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition" />
                <input name="location" placeholder="Location/Service Area" value={form.location} onChange={handleChange} required className="input input-bordered w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition" />
              </div>
            </div>
          )}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-primary">Professional Details</h2>
              <div className="space-y-5">
                <input name="title" placeholder="Professional Title (e.g. Health Coach)" value={form.title} onChange={handleChange} required className="input input-bordered w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition" />
                <input name="experience" placeholder="Years of Experience" value={form.experience} onChange={handleChange} required className="input input-bordered w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition" />
                <input name="credentials" placeholder="Credentials/Certifications" value={form.credentials} onChange={handleChange} required className="input input-bordered w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition" />
                <div>
                  <label className="block text-sm font-medium mb-1">Specialties</label>
                  {Object.entries(SPECIALTIES).map(([category, list]) => (
                    <div key={category} className="mb-4">
                      <div className="font-semibold mb-2 capitalize">{category} Specialties</div>
                      <div className="flex flex-col gap-1">
                        {list.map((spec) => (
                          <label key={spec} className="flex items-center">
                            <input
                              type="checkbox"
                              name="specialties"
                              value={spec}
                              checked={form.specialties.includes(spec)}
                              onChange={handleChange}
                              className="mr-2"
                            />
                            {spec}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <input name="modalities" placeholder="Modalities/Approaches (comma separated)" value={form.modalities} onChange={handleChange} required className="input input-bordered w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition" />
              </div>
            </div>
          )}
          <div className="flex justify-between mt-8 gap-4">
            <button type="button" className="btn" onClick={prev} disabled={step === 0}>Back</button>
            {step < steps.length - 1 && (
              <button type="button" className="btn btn-primary" onClick={next}>Next</button>
            )}
            {step === steps.length - 1 && (
              <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Saving...' : 'Finish & Create Profile'}</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
} 
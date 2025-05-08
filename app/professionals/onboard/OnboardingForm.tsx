'use client';
import { useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

const steps = [
  'Account',
  'Basic Info',
  'Specialties',
  'Credentials',
  'Location',
  'Pricing',
  'Availability',
  'Gallery',
  'Preview'
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
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    companyName: '',
    contactName: '',
    abnAcn: '',
    contactEmail: '',
    fullName: '',
    email: '',
    specialties: [],
    modalities: [],
    bio: '',
    credentials: '',
    location: '',
    pricing: '',
    availability: '',
    profileImage: '',
    contactInfo: ''
  });
  const [success, setSuccess] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'professionals'), form);
    setSuccess(true);
  };

  if (success) {
    return <div className="min-h-screen flex items-center justify-center bg-[#f7fbf9]"><div className="text-center text-green-600 font-semibold text-xl py-12 bg-white rounded-xl shadow-lg px-8">Profile created! <a href="/directory" className="underline text-primary">View Directory</a></div></div>;
  }

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
              <h2 className="text-2xl font-bold mb-6 text-primary">Account</h2>
              <div className="space-y-5">
                <input
                  name="companyName"
                  placeholder="Company Name"
                  value={form.companyName}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                />
                <input
                  name="contactName"
                  placeholder="Contact Name"
                  value={form.contactName}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                />
                <input
                  name="abnAcn"
                  placeholder="ABN/ACN"
                  value={form.abnAcn}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                />
                <input
                  name="contactEmail"
                  placeholder="Contact Email"
                  value={form.contactEmail}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                />
              </div>
            </div>
          )}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-primary">Basic Info</h2>
              <div className="space-y-5">
                <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required className="input input-bordered w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition" />
                <input name="profileImage" placeholder="Profile Image URL" value={form.profileImage} onChange={handleChange} className="input input-bordered w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition" />
                <input name="contactInfo" placeholder="Contact Info" value={form.contactInfo} onChange={handleChange} className="input input-bordered w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition" />
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-primary">Specialties & Modalities</h2>
              <div className="space-y-5">
                <div>
                  <label className="block font-semibold mb-1">Specialties:</label>
                  <label className="inline-flex items-center mr-4"><input type="checkbox" name="specialties" value="Physiotherapy" onChange={handleChange} className="mr-2" />Physiotherapy</label>
                  <label className="inline-flex items-center mr-4"><input type="checkbox" name="specialties" value="Nutrition" onChange={handleChange} className="mr-2" />Nutrition</label>
                  {/* Add more specialties */}
                </div>
                <div>
                  <label className="block font-semibold mb-1">Modalities:</label>
                  <label className="inline-flex items-center mr-4"><input type="checkbox" name="modalities" value="Online" onChange={handleChange} className="mr-2" />Online</label>
                  <label className="inline-flex items-center"><input type="checkbox" name="modalities" value="In-person" onChange={handleChange} className="mr-2" />In-person</label>
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-primary">Credentials & Bio</h2>
              <div className="space-y-5">
                <input name="credentials" placeholder="Credentials" value={form.credentials} onChange={handleChange} className="input input-bordered w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition" />
                <textarea name="bio" placeholder="Bio" value={form.bio} onChange={handleChange} className="textarea textarea-bordered w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition" />
              </div>
            </div>
          )}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-primary">Location & Service Area</h2>
              <div className="space-y-5">
                <input name="location" placeholder="Location" value={form.location} onChange={handleChange} className="input input-bordered w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition" />
                {/* Add map picker or online only toggle here */}
              </div>
            </div>
          )}
          {step === 5 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-primary">Pricing & Packages</h2>
              <div className="space-y-5">
                <input name="pricing" placeholder="Pricing" value={form.pricing} onChange={handleChange} className="input input-bordered w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition" />
                {/* Add package options here */}
              </div>
            </div>
          )}
          {step === 6 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-primary">Availability</h2>
              <div className="space-y-5">
                <input name="availability" placeholder="Availability" value={form.availability} onChange={handleChange} className="input input-bordered w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition" />
                {/* Add calendar picker here */}
              </div>
            </div>
          )}
          {step === 7 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-primary">Gallery & Media</h2>
              {/* Add file upload for photos/videos here */}
              <div className="space-y-5">
                <input name="gallery" placeholder="Gallery URLs (comma separated)" onChange={handleChange} className="input input-bordered w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition" />
              </div>
            </div>
          )}
          {step === 8 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-primary">Preview & Submit</h2>
              <div className="space-y-5">
                <p className="mb-4 text-gray-600">Please review your information before submitting your profile.</p>
                <div className="space-y-2">
                  <div><strong>Company Name:</strong> {form.companyName}</div>
                  <div><strong>Contact Name:</strong> {form.contactName}</div>
                  <div><strong>ABN/ACN:</strong> {form.abnAcn}</div>
                  <div><strong>Contact Email:</strong> {form.contactEmail}</div>
                  <div><strong>Full Name:</strong> {form.fullName}</div>
                  <div><strong>Email:</strong> {form.email}</div>
                  <div><strong>Specialties:</strong> {form.specialties.join(', ')}</div>
                  <div><strong>Modalities:</strong> {form.modalities.join(', ')}</div>
                  <div><strong>Bio:</strong> {form.bio}</div>
                  <div><strong>Credentials:</strong> {form.credentials}</div>
                  <div><strong>Location:</strong> {form.location}</div>
                  <div><strong>Pricing:</strong> {form.pricing}</div>
                  <div><strong>Availability:</strong> {form.availability}</div>
                  <div><strong>Contact Info:</strong> {form.contactInfo}</div>
                  <div><strong>Profile Image:</strong> {form.profileImage}</div>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button type="button" className="btn" onClick={prev}>Back</button>
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </div>
          )}
          <div className="flex justify-between mt-8 gap-4">
            <button type="button" className="btn" onClick={prev} disabled={step === 0}>Back</button>
            {step < steps.length - 1 && (
              <button type="button" className="btn btn-primary" onClick={next}>Next</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
} 
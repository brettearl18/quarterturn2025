'use client';

import { useState } from 'react';
import { useFormValidation, commonRules } from '../components/FormValidation';
import { SPECIALTIES } from '@/app/constants/specialties';
import ImageUpload from '@/components/ImageUpload';

interface ProfessionalDetailsProps {
  onComplete: (data: any) => void;
  initialData?: any;
}

export default function ProfessionalDetails({ onComplete, initialData }: ProfessionalDetailsProps) {
  const [formData, setFormData] = useState({
    specialties: initialData?.specialties || [],
    experience: initialData?.experience || '',
    certifications: initialData?.certifications || [],
    education: initialData?.education || '',
    credentials: initialData?.credentials || []
  });

  const { errors, validateField, validateForm } = useFormValidation({
    specialties: [
      {
        validate: (value) => value.length > 0,
        message: 'Please select at least one specialty'
      }
    ],
    experience: [commonRules.required()],
    education: [commonRules.required()]
  });

  const handleSpecialtyChange = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    validateField(name, value);
  };

  const handleCredentialUpload = (url: string) => {
    setFormData(prev => ({
      ...prev,
      credentials: [...prev.credentials, url]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm(formData)) {
      onComplete(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Specialties
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(SPECIALTIES).map(([category, specialties]) => (
            <div key={category} className="space-y-2">
              <h4 className="font-medium text-gray-900 capitalize">{category}</h4>
              <div className="space-y-2">
                {specialties.map((specialty) => (
                  <label key={specialty} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.specialties.includes(specialty)}
                      onChange={() => handleSpecialtyChange(specialty)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{specialty}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        {errors.specialties && (
          <p className="mt-2 text-sm text-red-600">{errors.specialties}</p>
        )}
      </div>

      <div>
        <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
          Years of Experience
        </label>
        <input
          type="number"
          id="experience"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          min="0"
          className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm
            ${errors.experience ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}`}
          placeholder="5"
        />
        {errors.experience && (
          <p className="mt-2 text-sm text-red-600">{errors.experience}</p>
        )}
      </div>

      <div>
        <label htmlFor="education" className="block text-sm font-medium text-gray-700">
          Education & Training
        </label>
        <textarea
          id="education"
          name="education"
          rows={3}
          value={formData.education}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm
            ${errors.education ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}`}
          placeholder="List your relevant education, certifications, and training..."
        />
        {errors.education && (
          <p className="mt-2 text-sm text-red-600">{errors.education}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Credentials & Certifications
        </label>
        <div className="space-y-4">
          {formData.credentials.map((url, index) => (
            <div key={index} className="flex items-center space-x-2">
              <img src={url} alt={`Credential ${index + 1}`} className="h-20 w-auto object-cover rounded" />
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    credentials: prev.credentials.filter((_, i) => i !== index)
                  }));
                }}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <ImageUpload
            folder="credentials"
            onUpload={handleCredentialUpload}
            label="Upload Credential"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Continue
        </button>
      </div>
    </form>
  );
} 
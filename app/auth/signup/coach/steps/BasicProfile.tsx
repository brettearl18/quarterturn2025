'use client';

import { useState } from 'react';
import { useFormValidation, commonRules } from '../components/FormValidation';
import ImageUpload from '@/components/ImageUpload';

interface BasicProfileProps {
  onComplete: (data: any) => void;
  initialData?: any;
}

export default function BasicProfile({ onComplete, initialData }: BasicProfileProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    bio: initialData?.bio || '',
    imageUrl: initialData?.imageUrl || '',
    location: initialData?.location || '',
    phone: initialData?.phone || ''
  });

  const { errors, validateField, validateForm } = useFormValidation({
    name: [commonRules.required(), commonRules.minLength(2)],
    bio: [commonRules.required(), commonRules.minLength(50)],
    location: [commonRules.required()],
    phone: [commonRules.phone()]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    validateField(name, value);
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
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm
            ${errors.name ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}`}
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="mt-2 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={4}
          value={formData.bio}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm
            ${errors.bio ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}`}
          placeholder="Tell us about yourself and your coaching experience..."
        />
        {errors.bio && (
          <p className="mt-2 text-sm text-red-600">{errors.bio}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Profile Image
        </label>
        <div className="mt-1 flex items-center space-x-4">
          {formData.imageUrl && (
            <img
              src={formData.imageUrl}
              alt="Profile preview"
              className="h-20 w-20 rounded-full object-cover"
            />
          )}
          <ImageUpload
            folder="profileImages"
            onUpload={(url) => {
              setFormData(prev => ({ ...prev, imageUrl: url }));
            }}
            label={formData.imageUrl ? 'Change Image' : 'Upload Image'}
          />
        </div>
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm
            ${errors.location ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}`}
          placeholder="City, Country"
        />
        {errors.location && (
          <p className="mt-2 text-sm text-red-600">{errors.location}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm
            ${errors.phone ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}`}
          placeholder="+1 (555) 000-0000"
        />
        {errors.phone && (
          <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
        )}
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
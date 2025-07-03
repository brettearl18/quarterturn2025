'use client';

import { useState } from 'react';
import { useFormValidation, commonRules } from '../components/FormValidation';
import ImageUpload from '@/components/ImageUpload';

interface VerificationReviewProps {
  onComplete: (data: any) => void;
  initialData?: any;
  allData: any;
}

export default function VerificationReview({ onComplete, initialData, allData }: VerificationReviewProps) {
  const [formData, setFormData] = useState({
    verificationDocuments: initialData?.verificationDocuments || [],
    agreeToVerification: false,
    agreeToBackgroundCheck: false
  });

  const { errors, validateField, validateForm } = useFormValidation({
    verificationDocuments: [
      {
        validate: (value) => value.length > 0,
        message: 'Please upload at least one verification document'
      }
    ],
    agreeToVerification: [
      {
        validate: (value) => value === true,
        message: 'You must agree to the verification process'
      }
    ],
    agreeToBackgroundCheck: [
      {
        validate: (value) => value === true,
        message: 'You must agree to the background check'
      }
    ]
  });

  const handleDocumentUpload = (url: string) => {
    setFormData(prev => ({
      ...prev,
      verificationDocuments: [...prev.verificationDocuments, url]
    }));
  };

  const removeDocument = (index: number) => {
    setFormData(prev => ({
      ...prev,
      verificationDocuments: prev.verificationDocuments.filter((_, i) => i !== index)
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
    validateField(name, checked);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm(formData)) {
      onComplete({
        ...formData,
        ...allData
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Verification Documents</h3>
          <p className="mt-1 text-sm text-gray-500">
            Please upload any relevant certifications, licenses, or credentials that verify your qualifications.
          </p>
        </div>

        <div className="space-y-4">
          {formData.verificationDocuments.map((url, index) => (
            <div key={index} className="flex items-center space-x-4">
              <img src={url} alt={`Document ${index + 1}`} className="h-20 w-auto object-cover rounded" />
              <button
                type="button"
                onClick={() => removeDocument(index)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <ImageUpload
            folder="verificationDocuments"
            onUpload={handleDocumentUpload}
            label="Upload Verification Document"
          />
        </div>

        {errors.verificationDocuments && (
          <p className="text-sm text-red-600">{errors.verificationDocuments}</p>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="agreeToVerification"
              name="agreeToVerification"
              type="checkbox"
              checked={formData.agreeToVerification}
              onChange={handleChange}
              className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500
                ${errors.agreeToVerification ? 'border-red-300' : ''}`}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="agreeToVerification" className="font-medium text-gray-700">
              I agree to the verification process
            </label>
            <p className="text-gray-500">
              I understand that my credentials and qualifications will be verified by our team.
            </p>
            {errors.agreeToVerification && (
              <p className="mt-1 text-sm text-red-600">{errors.agreeToVerification}</p>
            )}
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="agreeToBackgroundCheck"
              name="agreeToBackgroundCheck"
              type="checkbox"
              checked={formData.agreeToBackgroundCheck}
              onChange={handleChange}
              className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500
                ${errors.agreeToBackgroundCheck ? 'border-red-300' : ''}`}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="agreeToBackgroundCheck" className="font-medium text-gray-700">
              I agree to a background check
            </label>
            <p className="text-gray-500">
              I authorize a background check to verify my professional history and credentials.
            </p>
            {errors.agreeToBackgroundCheck && (
              <p className="mt-1 text-sm text-red-600">{errors.agreeToBackgroundCheck}</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Review Your Information</h3>
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <div>
            <h4 className="font-medium text-gray-900">Account Information</h4>
            <p className="text-sm text-gray-500">{allData.account?.email}</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Profile Information</h4>
            <p className="text-sm text-gray-500">{allData.profile?.name}</p>
            <p className="text-sm text-gray-500">{allData.profile?.location}</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Professional Details</h4>
            <p className="text-sm text-gray-500">
              Specialties: {allData.professional?.specialties?.join(', ')}
            </p>
            <p className="text-sm text-gray-500">
              Experience: {allData.professional?.experience} years
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Services</h4>
            {allData.services?.services?.map((service: any, index: number) => (
              <div key={index} className="text-sm text-gray-500">
                {service.name} - {service.price}
              </div>
            ))}
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Availability</h4>
            {allData.availability?.timeSlots?.map((slot: any, index: number) => (
              <div key={index} className="text-sm text-gray-500">
                {slot.day}: {slot.startTime} - {slot.endTime}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit Application
        </button>
      </div>
    </form>
  );
} 
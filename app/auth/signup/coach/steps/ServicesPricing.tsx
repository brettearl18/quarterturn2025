'use client';

import { useState } from 'react';
import { useFormValidation, commonRules } from '../components/FormValidation';

interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  type: 'one-time' | 'package';
}

interface ServicesPricingProps {
  onComplete: (data: any) => void;
  initialData?: any;
}

export default function ServicesPricing({ onComplete, initialData }: ServicesPricingProps) {
  const [services, setServices] = useState<Service[]>(
    initialData?.services || [
      {
        id: '1',
        name: '',
        description: '',
        duration: '',
        price: '',
        type: 'one-time'
      }
    ]
  );

  const { errors, validateField, validateForm } = useFormValidation({
    services: [
      {
        validate: (value) => value.length > 0,
        message: 'Please add at least one service'
      }
    ]
  });

  const handleServiceChange = (id: string, field: keyof Service, value: string) => {
    setServices(prev =>
      prev.map(service =>
        service.id === id ? { ...service, [field]: value } : service
      )
    );
  };

  const addService = () => {
    setServices(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        name: '',
        description: '',
        duration: '',
        price: '',
        type: 'one-time'
      }
    ]);
  };

  const removeService = (id: string) => {
    setServices(prev => prev.filter(service => service.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm({ services })) {
      onComplete({ services });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {services.map((service, index) => (
          <div key={service.id} className="p-4 border rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Service {index + 1}</h3>
              {services.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeService(service.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Service Name
                </label>
                <input
                  type="text"
                  value={service.name}
                  onChange={(e) => handleServiceChange(service.id, 'name', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="e.g., Initial Consultation"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Service Type
                </label>
                <select
                  value={service.type}
                  onChange={(e) => handleServiceChange(service.id, 'type', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="one-time">One-time Session</option>
                  <option value="package">Package</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Duration
                </label>
                <input
                  type="text"
                  value={service.duration}
                  onChange={(e) => handleServiceChange(service.id, 'duration', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="e.g., 60 minutes"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="text"
                  value={service.price}
                  onChange={(e) => handleServiceChange(service.id, 'price', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="e.g., $75"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={service.description}
                onChange={(e) => handleServiceChange(service.id, 'description', e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Describe what clients can expect from this service..."
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={addService}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Another Service
        </button>

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
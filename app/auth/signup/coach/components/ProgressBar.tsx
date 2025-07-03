'use client';

import { CheckIcon } from '@heroicons/react/24/solid';

interface Step {
  id: string;
  title: string;
  description: string;
}

interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (index: number) => void;
}

export default function ProgressBar({ steps, currentStep, onStepClick }: ProgressBarProps) {
  return (
    <nav aria-label="Progress" className="bg-white shadow-sm mb-8 rounded-lg">
      <div className="w-full overflow-x-auto max-w-full">
        <ol role="list" className="flex items-center px-4 py-4 space-x-6 min-w-max">
          {steps.map((step, index) => (
            <li key={step.id} className="relative">
              {index !== steps.length - 1 && (
                <div className="absolute top-4 left-full ml-3 h-0.5 w-8 bg-gray-200" aria-hidden="true">
                  <div
                    className="h-0.5 bg-blue-600 transition-all duration-500"
                    style={{ width: index < currentStep ? '100%' : '0%' }}
                  />
                </div>
              )}
              <button
                onClick={() => onStepClick?.(index)}
                disabled={index > currentStep}
                className={`relative flex items-center group ${
                  index > currentStep ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                <span className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors duration-200"
                  style={{
                    borderColor: index < currentStep ? '#2563eb' : index === currentStep ? '#2563eb' : '#e5e7eb',
                    backgroundColor: index < currentStep ? '#2563eb' : 'white'
                  }}
                >
                  {index < currentStep ? (
                    <CheckIcon className="w-5 h-5 text-white" />
                  ) : (
                    <span className={`text-sm font-medium ${index === currentStep ? 'text-blue-600' : 'text-gray-500'}`}>
                      {index + 1}
                    </span>
                  )}
                </span>
                <span className="ml-4 min-w-0 flex flex-col">
                  <span className={`text-xs font-semibold tracking-wide uppercase ${
                    index <= currentStep ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                  <span className="text-sm text-gray-500">{step.description}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
} 
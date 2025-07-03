'use client';

import { useState } from 'react';
import { useFormValidation, commonRules } from '../components/FormValidation';

interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
}

interface AvailabilitySetupProps {
  onComplete: (data: any) => void;
  initialData?: any;
}

const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

const TIME_SLOTS = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0');
  return `${hour}:00`;
});

export default function AvailabilitySetup({ onComplete, initialData }: AvailabilitySetupProps) {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(
    initialData?.timeSlots || []
  );

  const [selectedDay, setSelectedDay] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');

  const { errors, validateField, validateForm } = useFormValidation({
    timeSlots: [
      {
        validate: (value) => value.length > 0,
        message: 'Please add at least one time slot'
      }
    ]
  });

  const addTimeSlot = () => {
    if (selectedDay && startTime && endTime) {
      setTimeSlots(prev => [
        ...prev,
        {
          day: selectedDay,
          startTime,
          endTime
        }
      ]);
      setSelectedDay('');
      setStartTime('');
      setEndTime('');
    }
  };

  const removeTimeSlot = (index: number) => {
    setTimeSlots(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm({ timeSlots })) {
      onComplete({ timeSlots });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Day
            </label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">Select a day</option>
              {DAYS_OF_WEEK.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Time
            </label>
            <select
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">Select start time</option>
              {TIME_SLOTS.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Time
            </label>
            <select
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">Select end time</option>
              {TIME_SLOTS.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={addTimeSlot}
          disabled={!selectedDay || !startTime || !endTime}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Time Slot
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Your Availability</h3>
        {timeSlots.length === 0 ? (
          <p className="text-gray-500">No time slots added yet</p>
        ) : (
          <div className="space-y-2">
            {timeSlots.map((slot, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-sm text-gray-700">
                  {slot.day}: {slot.startTime} - {slot.endTime}
                </span>
                <button
                  type="button"
                  onClick={() => removeTimeSlot(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {errors.timeSlots && (
        <p className="text-sm text-red-600">{errors.timeSlots}</p>
      )}

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
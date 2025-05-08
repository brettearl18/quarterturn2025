import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function CoachProfileModal({ coach, onClose }: { coach: any, onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 transition-colors">
          <XMarkIcon className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center">
          {coach.image ? (
            <img src={coach.image} alt={coach.name} className="w-24 h-24 rounded-full object-cover border-4 border-blue-200 mb-4 shadow" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center text-3xl font-bold text-white mb-4">
              {coach.name.split(' ').map((n: string) => n[0]).join('')}
            </div>
          )}
          <h2 className="text-2xl font-bold mb-1 text-center">{coach.name}</h2>
          <div className="text-blue-700 font-semibold mb-1 text-center">{coach.specialty}</div>
          <div className="text-gray-600 mb-2 text-center">{coach.experience} experience</div>
          <div className="flex items-center justify-center mb-2">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="font-semibold">{coach.rating}</span>
          </div>
          <div className="mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${coach.availability.includes('Now') ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{coach.availability}</span>
          </div>
          {/* Add more details here if available (bio, reviews, etc.) */}
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded text-lg font-semibold transition shadow-lg mt-4">Submit Enquiry</button>
        </div>
      </div>
    </div>
  );
} 
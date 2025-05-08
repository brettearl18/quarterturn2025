import React from 'react';

export default function ProfessionalCard({ professional }) {
  return (
    <div className="card bg-white shadow p-4 rounded flex flex-col items-center">
      <img src={professional.profileImage || '/default-profile.png'} alt={professional.fullName} className="w-24 h-24 rounded-full mb-2 object-cover" />
      <h3 className="font-bold text-lg mb-1">{professional.fullName}</h3>
      <p className="text-sm text-gray-600 mb-1">{professional.specialties?.join(', ')}</p>
      <p className="text-sm text-gray-500 mb-1">{professional.location || ''}</p>
      <p className="text-yellow-500 font-semibold mb-2">⭐ {professional.rating || 'N/A'}</p>
      <button className="btn btn-outline btn-primary">View Profile</button>
    </div>
  );
} 
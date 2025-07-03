import React from 'react';

export default function GymCard({ gym, selected, onClick }: { gym: any, selected?: boolean, onClick?: () => void }) {
  return (
    <div
      className={`bg-white rounded-xl shadow p-4 flex gap-4 items-start cursor-pointer transition border-2 ${selected ? 'border-[#4AC1E0] ring-2 ring-[#4AC1E0]/30' : 'border-transparent'}`}
      onClick={onClick}
    >
      <div className="w-32 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
        {gym.images && gym.images[0] ? (
          <img src={gym.images[0]} alt={gym.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
        )}
      </div>
      <div className="flex-1">
        <div className="flex flex-wrap gap-2 items-center mb-1">
          <h2 className="text-lg font-bold text-[#4AC1E0]">{gym.name}</h2>
          {gym.type && gym.type.map((t: string) => (
            <span key={t} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-semibold">{t}</span>
          ))}
        </div>
        <div className="text-gray-600 text-sm mb-1">{gym.address}</div>
        <div className="flex flex-wrap gap-2 mb-1">
          {gym.amenities && gym.amenities.map((a: string) => (
            <span key={a} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">{a}</span>
          ))}
        </div>
        <div className="text-xs text-gray-400 mb-1">{gym.openingHours}</div>
        <div className="text-gray-700 text-sm mb-2 line-clamp-2">{gym.description}</div>
        <button className="mt-1 bg-[#4AC1E0] hover:bg-[#E0DF00] text-white hover:text-black font-semibold px-4 py-1 rounded transition-all text-sm">View Details</button>
      </div>
    </div>
  );
} 
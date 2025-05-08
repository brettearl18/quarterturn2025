import React from 'react';

const stockImages = [
  'https://images.unsplash.com/photo-1517363898873-fafc2070293c?auto=format&fit=facearea&w=400&h=267&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
];

function getRandomStockImage() {
  return stockImages[Math.floor(Math.random() * stockImages.length)];
}

export default function ProfessionalCard({ professional, mode = 'large', matchScore }: { professional: any, mode?: string, matchScore?: number }) {
  const imageUrl = professional.profileImage || getRandomStockImage();

  // Match badge
  const matchBadge =
    typeof matchScore === 'number' ? (
      <span className="absolute top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow z-10">
        Match: {matchScore}%
      </span>
    ) : null;

  if (mode === 'list') {
    // List mode: horizontal card
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-row h-40 transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl hover:border-blue-400 border border-transparent group">
        <div className="relative aspect-[3/2] h-full w-40 flex-shrink-0 bg-gray-100">
          <img src={imageUrl} alt={professional.fullName} className="object-cover w-full h-full" />
          {matchBadge}
          {professional.modalities?.includes('online') && (
            <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">Online</span>
          )}
          {professional.featured && (
            <span className="absolute top-3 right-3 bg-yellow-400 text-gray-900 text-xs px-3 py-1 rounded-full font-bold shadow">Featured</span>
          )}
        </div>
        <div className="flex-1 flex flex-col p-4 justify-center">
          <h3 className="font-bold text-lg mb-1">{professional.fullName}</h3>
          <p className="text-sm text-gray-500 mb-2">{professional.specialties?.join(', ')}</p>
          <div className="flex items-center mb-2">
            <span className="text-yellow-500 text-lg mr-1">★</span>
            <span className="font-semibold text-gray-800">{professional.rating || 'N/A'}</span>
          </div>
          <button className="w-32 bg-blue-400 hover:bg-blue-500 text-white py-2 rounded font-semibold transition group-hover:scale-105 group-hover:shadow-lg mt-2">More Info</button>
        </div>
      </div>
    );
  }

  // Small grid mode: compact card
  if (mode === 'small') {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-blue-400 border border-transparent group p-2">
        <div className="relative aspect-[3/2] w-full bg-gray-100">
          <img src={imageUrl} alt={professional.fullName} className="object-cover w-full h-full" />
          {matchBadge}
          {professional.modalities?.includes('online') && (
            <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold shadow">Online</span>
          )}
          {professional.featured && (
            <span className="absolute top-2 right-2 bg-yellow-400 text-gray-900 text-xs px-2 py-0.5 rounded-full font-bold shadow">Featured</span>
          )}
        </div>
        <div className="flex-1 flex flex-col p-2">
          <h3 className="font-bold text-base mb-0.5 truncate">{professional.fullName}</h3>
          <p className="text-xs text-gray-500 mb-1 truncate">{professional.specialties?.join(', ')}</p>
          <div className="flex items-center mb-1">
            <span className="text-yellow-500 text-base mr-1">★</span>
            <span className="font-semibold text-gray-800 text-sm">{professional.rating || 'N/A'}</span>
          </div>
          <button className="w-full bg-blue-400 hover:bg-blue-500 text-white py-1 rounded font-semibold text-sm transition group-hover:scale-105 group-hover:shadow-lg mt-auto">More Info</button>
        </div>
      </div>
    );
  }

  // Large grid mode: default
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl hover:border-blue-400 border border-transparent group">
      {/* Image with badge */}
      <div className="relative aspect-[3/2] w-full bg-gray-100">
        <img
          src={imageUrl}
          alt={professional.fullName}
          className="object-cover w-full h-full"
        />
        {matchBadge}
        {professional.modalities?.includes('online') && (
          <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
            Online
          </span>
        )}
        {professional.featured && (
          <span className="absolute top-3 right-3 bg-yellow-400 text-gray-900 text-xs px-3 py-1 rounded-full font-bold shadow">
            Featured
          </span>
        )}
      </div>
      {/* Card content */}
      <div className="flex-1 flex flex-col p-4">
        <h3 className="font-bold text-lg mb-1">{professional.fullName}</h3>
        <p className="text-sm text-gray-500 mb-2">{professional.specialties?.join(', ')}</p>
        <div className="flex items-center mb-4">
          <span className="text-yellow-500 text-lg mr-1">★</span>
          <span className="font-semibold text-gray-800">{professional.rating || 'N/A'}</span>
        </div>
        <div className="mt-auto">
          <button className="w-full bg-blue-400 hover:bg-blue-500 text-white py-2 rounded font-semibold transition group-hover:scale-105 group-hover:shadow-lg">
            More Info
          </button>
        </div>
      </div>
    </div>
  );
} 
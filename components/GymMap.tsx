import React from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
  minHeight: '350px',
  borderRadius: '1rem',
};

const perthCenter = { lat: -31.9505, lng: 115.8605 };

export default function GymMap({ gyms, selectedGym, setSelectedGym }: { gyms: any[], selectedGym: any, setSelectedGym: (gym: any) => void }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  if (!isLoaded) {
    return <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">Loading map...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={perthCenter}
      zoom={13}
      options={{
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      }}
    >
      {gyms.map((gym) => (
        <Marker
          key={gym.id}
          position={gym.location}
          onClick={() => setSelectedGym(gym)}
          icon={selectedGym && selectedGym.id === gym.id ? {
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            scaledSize: { width: 40, height: 40 },
          } : undefined}
          label={{ text: gym.name, className: 'text-xs font-bold text-[#4AC1E0] bg-white px-1 rounded' }}
        />
      ))}
      {selectedGym && (
        <InfoWindow
          position={selectedGym.location}
          onCloseClick={() => setSelectedGym(null)}
        >
          <div className="min-w-[120px]">
            <div className="font-bold text-[#4AC1E0] mb-1">{selectedGym.name}</div>
            <div className="text-xs text-gray-600">{selectedGym.address}</div>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
} 
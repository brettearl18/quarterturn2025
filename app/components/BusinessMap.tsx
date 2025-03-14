'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface Business {
  id: string;
  name: string;
  location: string;
  category: string;
  image: string;
  rating: number;
}

interface BusinessMapProps {
  businesses: Business[];
  onSelectBusiness?: (businessId: string) => void;
  selectedBusinessId?: string;
}

interface Coordinates {
  lat: number;
  lng: number;
}

// Mock coordinates for our locations (in real app, use geocoding)
const LOCATION_COORDINATES: Record<string, Coordinates> = {
  'New York, NY': { lat: 40.7128, lng: -74.0060 },
  'Los Angeles, CA': { lat: 34.0522, lng: -118.2437 },
  'Chicago, IL': { lat: 41.8781, lng: -87.6298 },
  'Boston, MA': { lat: 42.3601, lng: -71.0589 },
  'Seattle, WA': { lat: 47.6062, lng: -122.3321 },
  'Austin, TX': { lat: 30.2672, lng: -97.7431 },
  'Miami, FL': { lat: 25.7617, lng: -80.1918 }
};

export default function BusinessMap({ businesses, onSelectBusiness, selectedBusinessId }: BusinessMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg', // Temporary API key for development
      version: 'weekly',
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const mapInstance = new google.maps.Map(mapRef.current, {
          center: { lat: 39.8283, lng: -98.5795 }, // Center of USA
          zoom: 4,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        });

        setMap(mapInstance);
        setInfoWindow(new google.maps.InfoWindow());
      }
    });
  }, []);

  useEffect(() => {
    if (!map || !infoWindow) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    const newMarkers: google.maps.Marker[] = [];

    businesses.forEach(business => {
      const coords = LOCATION_COORDINATES[business.location];
      if (!coords) return;

      const marker = new google.maps.Marker({
        position: coords,
        map,
        title: business.name,
        animation: google.maps.Animation.DROP,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: business.id === selectedBusinessId ? '#2563EB' : '#000000',
          fillOpacity: 0.7,
          strokeWeight: 2,
          strokeColor: '#FFFFFF'
        }
      });

      const content = `
        <div class="p-2 max-w-[200px]">
          <div class="font-bold mb-1">${business.name}</div>
          <div class="text-sm text-gray-600">${business.category}</div>
          <div class="text-sm">⭐ ${business.rating}</div>
        </div>
      `;

      marker.addListener('click', () => {
        infoWindow.setContent(content);
        infoWindow.open(map, marker);
        onSelectBusiness?.(business.id);
      });

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);
  }, [map, businesses, infoWindow, selectedBusinessId, onSelectBusiness]);

  return (
    <div ref={mapRef} className="w-full h-[600px] rounded-lg shadow-lg" />
  );
} 
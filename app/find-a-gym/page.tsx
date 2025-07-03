"use client";
import FilterSidebar from '../../components/FilterSidebar';
import GymCard from '../../components/GymCard';
import GymMap from '../../components/GymMap';
import { useState } from 'react';

const gyms = [
  {
    id: 'gym-001',
    name: 'Champions Gym',
    type: ['CrossFit', 'Boxing'],
    description: 'Best Muay Thai, Boxing and Bootcamps training centre in Perth.',
    address: '123 Main St, Perth WA',
    city: 'Perth',
    state: 'WA',
    country: 'Australia',
    postcode: '6000',
    location: { lat: -31.9505, lng: 115.8605 },
    website: 'https://championsgym.com.au',
    phone: '+61 8 1234 5678',
    email: 'info@championsgym.com.au',
    images: [
      'https://placehold.co/400x300/4AC1E0/FFFFFF.png?text=Champions+Gym',
    ],
    amenities: ['Showers', 'Parking', 'Cardio Classes'],
    openingHours: 'Mon-Fri 6am-9pm, Sat 7am-5pm',
    isActive: true,
  },
  {
    id: 'gym-002',
    name: 'Revo Fitness',
    type: ['Gym'],
    description: '24/7 gym with modern equipment and group classes.',
    address: '123 Hay St, Subiaco WA',
    city: 'Subiaco',
    state: 'WA',
    country: 'Australia',
    postcode: '6008',
    location: { lat: -31.9509, lng: 115.8265 },
    website: 'https://revofitness.com.au',
    phone: '+61 8 8765 4321',
    email: 'info@revofitness.com.au',
    images: [
      'https://placehold.co/400x300/4AC1E0/FFFFFF.png?text=Revo+Fitness',
    ],
    amenities: ['Showers', 'Parking', '24/7 Access'],
    openingHours: '24/7',
    isActive: true,
  },
  {
    id: 'gym-003',
    name: 'F45 Training Perth CBD',
    type: ['F45', 'HIIT'],
    description: 'High-intensity group training with a focus on results.',
    address: '456 Murray St, Perth WA',
    city: 'Perth',
    state: 'WA',
    country: 'Australia',
    postcode: '6000',
    location: { lat: -31.9502, lng: 115.8575 },
    website: 'https://f45training.com.au',
    phone: '+61 8 2345 6789',
    email: 'perthcbd@f45training.com.au',
    images: [
      'https://placehold.co/400x300/4AC1E0/FFFFFF.png?text=F45+Perth+CBD',
    ],
    amenities: ['Showers', 'Group Classes'],
    openingHours: 'Mon-Fri 5am-8pm, Sat 7am-12pm',
    isActive: true,
  },
  {
    id: 'gym-004',
    name: 'Anytime Fitness East Perth',
    type: ['Gym', '24/7'],
    description: 'Convenient 24/7 gym access with personal training available.',
    address: '789 Adelaide Terrace, East Perth WA',
    city: 'East Perth',
    state: 'WA',
    country: 'Australia',
    postcode: '6004',
    location: { lat: -31.9584, lng: 115.8716 },
    website: 'https://anytimefitness.com.au',
    phone: '+61 8 3456 7890',
    email: 'eastperth@anytimefitness.com.au',
    images: [
      'https://placehold.co/400x300/4AC1E0/FFFFFF.png?text=Anytime+Fitness',
    ],
    amenities: ['Showers', 'Parking', '24/7 Access', 'Personal Training'],
    openingHours: '24/7',
    isActive: true,
  },
];

export default function FindAGymPage() {
  const [selectedGym, setSelectedGym] = useState(null);
  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-6rem)] pt-20">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-white border-r p-4 overflow-y-auto">
        <FilterSidebar />
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row">
        {/* List */}
        <section className="w-full md:w-1/2 overflow-y-auto p-4">
          <h1 className="text-2xl font-bold mb-4 text-[#4AC1E0]">Gyms & Training Centres</h1>
          <div className="space-y-4">
            {gyms.map(gym => (
              <GymCard key={gym.id} gym={gym} selected={selectedGym && selectedGym.id === gym.id} onClick={() => setSelectedGym(gym)} />
            ))}
          </div>
        </section>
        {/* Map */}
        <section className="w-full md:w-1/2 h-96 md:h-auto">
          <GymMap gyms={gyms} selectedGym={selectedGym} setSelectedGym={setSelectedGym} />
        </section>
      </main>
    </div>
  );
} 
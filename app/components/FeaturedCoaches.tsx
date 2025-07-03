"use client";

import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";

interface Coach {
  id: string;
  fullName: string;
  photoUrl?: string;
  specialties?: string[];
}

const mockCoaches: Coach[] = [
  {
    id: 'mock-1',
    fullName: 'Dr. Jane Smith',
    photoUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    specialties: ['Physiotherapy', 'Rehabilitation'],
  },
  {
    id: 'mock-2',
    fullName: 'Mike Thompson',
    photoUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    specialties: ['Strength & Conditioning', 'HIIT'],
  },
  {
    id: 'mock-3',
    fullName: 'Elena Rodriguez',
    photoUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
    specialties: ['Nutrition', 'Weight Loss'],
  },
];

export default function FeaturedCoaches() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedCoaches() {
      setLoading(true);
      try {
        const q = query(collection(db, "professionals"), where("featured", "==", true));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Coach));
        setCoaches(data);
      } catch (e) {
        setCoaches([]);
      }
      setLoading(false);
    }
    fetchFeaturedCoaches();
  }, []);

  return (
    <section className="my-12 max-w-7xl mx-auto px-4 md:px-8">
      <h2 className="text-2xl font-bold mb-6 text-[#4AC1E0]">Featured Coaches</h2>
      {loading ? (
        <div>Loading...</div>
      ) : coaches.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mockCoaches.map((coach, index) => (
            <div
              key={coach.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-[#4AC1E0] via-[#E0DF00]/50 to-[#4AC1E0] overflow-hidden group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                  {coach.photoUrl ? (
                    <img src={coach.photoUrl} alt={coach.fullName} className="w-24 h-24 rounded-full object-cover shadow-lg" />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl text-gray-400">
                      {coach.fullName[0]}
                    </div>
                  )}
                </div>
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-[#E0DF00] text-gray-800 font-bold px-3 py-1 rounded-full text-sm shadow-md">
                    FEATURED COACH
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col items-center">
                <h3 className="text-xl font-bold text-[#4AC1E0] mb-2 text-center">{coach.fullName}</h3>
                {coach.specialties && (
                  <div className="text-sm text-gray-600 mb-4 text-center">
                    {coach.specialties.join(", ")}
                  </div>
                )}
                <button
                  className="w-full bg-gray-200 text-gray-500 font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-md cursor-not-allowed"
                  disabled
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coaches.map((coach, index) => (
            <div
              key={coach.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-[#4AC1E0] via-[#E0DF00]/50 to-[#4AC1E0] overflow-hidden group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                  {coach.photoUrl ? (
                    <img src={coach.photoUrl} alt={coach.fullName} className="w-24 h-24 rounded-full object-cover shadow-lg" />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl text-gray-400">
                      {coach.fullName[0]}
                    </div>
                  )}
                </div>
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-[#E0DF00] text-gray-800 font-bold px-3 py-1 rounded-full text-sm shadow-md">
                    FEATURED COACH
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col items-center">
                <h3 className="text-xl font-bold text-[#4AC1E0] mb-2 text-center">{coach.fullName}</h3>
                {coach.specialties && (
                  <div className="text-sm text-gray-600 mb-4 text-center">
                    {coach.specialties.join(", ")}
                  </div>
                )}
                <Link
                  href={`/find-a-coach/${coach.id}`}
                  className="w-full bg-[#4AC1E0] hover:bg-[#E0DF00] text-white hover:text-black font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl text-center"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
} 
"use client";

import { useState, useEffect } from "react";
import { db } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { CheckBadgeIcon, EnvelopeIcon, PhoneIcon, MapPinIcon, StarIcon, CalendarIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';

// Mock data fallback
const mockProfessional = {
  name: 'Dr. Jane Smith',
  title: 'Physiotherapist',
  photoUrl: 'https://images.unsplash.com/photo-1517363898873-fafc2070293c?auto=format&fit=facearea&w=256&h=256&facepad=2&q=80',
  specialties: ['Physiotherapy', 'Sports Injury', 'Rehabilitation'],
  location: 'Sydney, NSW',
  rating: 4.9,
  reviewsCount: 120,
  bio: 'Dr. Jane Smith is a highly experienced physiotherapist specializing in sports injuries and rehabilitation. She is passionate about helping clients achieve their health and fitness goals.',
  credentials: [
    'PhD in Physiotherapy',
    'Certified Sports Therapist',
    'Member of APA',
  ],
  services: [
    { name: 'Initial Consultation', price: 120, duration: '60min' },
    { name: 'Follow-up', price: 90, duration: '30min' },
  ],
  availability: 'Mon–Fri: 9am–6pm',
  gallery: [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
  ],
  contact: {
    email: 'jane.smith@email.com',
    phone: '+61 400 123 456',
  },
  mapEmbed: 'https://www.google.com/maps/embed?...', // Replace with real embed if needed
  reviews: [
    {
      name: 'Alex',
      date: 'Mar 2024',
      rating: 5,
      text: 'Jane is amazing! Helped me recover quickly.',
    },
    {
      name: 'Sam',
      date: 'Feb 2024',
      rating: 5,
      text: 'Very professional and knowledgeable.',
    },
  ],
};

const useMockData = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

export default function ProfessionalPage({ params }: { params: { id: string } }) {
  const [professional, setProfessional] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isMock, setIsMock] = useState(false);

  useEffect(() => {
    async function fetchProfessional() {
      setLoading(true);
      setError("");
      try {
        const docRef = doc(db, "professionals", params.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfessional({ id: docSnap.id, ...docSnap.data() });
          setIsMock(false);
        } else if (useMockData) {
          setProfessional(mockProfessional);
          setIsMock(true);
          setError("No such professional found. Showing demo profile.");
        } else {
          setProfessional(null);
          setIsMock(false);
          setError("No such professional found.");
        }
      } catch (err) {
        if (useMockData) {
          setProfessional(mockProfessional);
          setIsMock(true);
          setError("Error loading profile. Showing demo profile.");
        } else {
          setProfessional(null);
          setIsMock(false);
          setError("Error loading profile.");
        }
      }
      setLoading(false);
    }
    fetchProfessional();
  }, [params.id]);

  if (loading) {
    return <div className="text-center text-gray-500">Loading professional profile...</div>;
  }

  if (!professional) {
    return <div className="text-center text-red-500">Profile not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] pb-32">
      <div className="container mx-auto px-4 py-8 max-w-2xl mt-16">
        {error && (
          <div className="mb-4 text-center text-yellow-600 bg-yellow-50 border border-yellow-200 rounded p-2">{error}</div>
        )}
        {/* Profile Header */}
        <div className="flex flex-col items-center bg-white rounded-2xl shadow-2xl p-10 mb-10 relative border border-blue-100">
          <div className="relative mb-4">
            <img
              src={professional.photoUrl || professional.imageUrl || '/default-profile.png'}
              alt={professional.name}
              className="w-36 h-36 rounded-full object-cover border-4 border-blue-300 shadow-xl"
            />
            <span className="absolute bottom-2 right-2 bg-green-500 text-white rounded-full px-2 py-1 text-xs flex items-center gap-1 shadow">
              <CheckBadgeIcon className="w-4 h-4 inline-block" /> Verified
            </span>
            {isMock && (
              <span className="absolute top-2 left-2 bg-yellow-200 text-yellow-800 rounded px-2 py-1 text-xs font-bold shadow">Demo</span>
            )}
          </div>
          <h1 className="text-3xl font-extrabold mb-1 text-center text-gray-900">{professional.name}</h1>
          <div className="text-blue-700 font-semibold mb-1 text-center">{professional.title || professional.specialty}</div>
          <div className="flex flex-wrap gap-2 mb-2 justify-center">
            {(professional.specialties || []).map((spec: string) => (
              <span key={spec} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold shadow-sm">{spec}</span>
            ))}
          </div>
          {professional.location && (
            <div className="flex items-center gap-2 text-gray-600 mb-2 text-center">
              <MapPinIcon className="w-4 h-4 text-blue-400" />
              {professional.location}
            </div>
          )}
          <div className="flex items-center justify-center mb-4 gap-2">
            <StarIcon className="w-5 h-5 text-yellow-400" />
            <span className="font-semibold text-lg">{professional.rating}</span>
            <span className="text-gray-500">({professional.reviewsCount || 0} reviews)</span>
          </div>
          <div className="flex gap-3 justify-center w-full mb-2">
            <button className="bg-gradient-to-r from-[#4AC1E0] to-[#E0DF00] hover:from-[#E0DF00] hover:to-[#4AC1E0] text-black px-6 py-2 rounded-lg text-lg font-bold shadow-lg transition w-40 flex items-center justify-center gap-2">
              <CalendarIcon className="w-5 h-5" /> Book Now
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg text-lg font-semibold transition w-40 flex items-center justify-center gap-2">
              <EnvelopeIcon className="w-5 h-5" /> Contact
            </button>
          </div>
          <button className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-2 rounded transition shadow" title="Share">🔗</button>
        </div>
        {/* About & Credentials */}
        <section className="bg-white rounded-2xl shadow p-6 mb-6 border border-blue-50">
          <h2 className="text-xl font-bold mb-2 text-[#4AC1E0]">About</h2>
          <p className="mb-4 text-gray-700 leading-relaxed">{professional.bio}</p>
          {professional.credentials && professional.credentials.length > 0 && (
            <>
              <h3 className="font-semibold mb-1 flex items-center gap-2 text-gray-700"><CheckBadgeIcon className="w-5 h-5 text-green-500" /> Credentials</h3>
              <ul className="list-disc list-inside text-gray-700 ml-2">
                {professional.credentials.map((cred: string) => (
                  <li key={cred}>{cred}</li>
                ))}
              </ul>
            </>
          )}
        </section>
        {/* Services & Pricing */}
        {professional.services && professional.services.length > 0 && (
          <section className="bg-white rounded-2xl shadow p-6 mb-6 border border-blue-50">
            <h2 className="text-xl font-bold mb-2 text-[#4AC1E0]">Services & Pricing</h2>
            <div className="divide-y">
              {professional.services.map((service: any) => (
                <div key={service.name} className="flex justify-between items-center py-3">
                  <span className="flex items-center gap-2">
                    <CurrencyDollarIcon className="w-4 h-4 text-green-500" />
                    {service.name} <span className="text-gray-400 text-xs">({service.duration})</span>
                  </span>
                  <span className="font-semibold text-lg">${service.price}</span>
                </div>
              ))}
            </div>
          </section>
        )}
        {/* Availability */}
        {professional.availability && (
          <section className="bg-white rounded-2xl shadow p-6 mb-6 border border-blue-50">
            <h2 className="text-xl font-bold mb-2 text-[#4AC1E0]">Availability</h2>
            <div className="flex items-center gap-2 text-gray-700">
              <CalendarIcon className="w-5 h-5 text-blue-400" />
              <span>{professional.availability}</span>
            </div>
          </section>
        )}
        {/* Gallery */}
        {professional.gallery && professional.gallery.length > 0 && (
          <section className="bg-white rounded-2xl shadow p-6 mb-6 border border-blue-50">
            <h2 className="text-xl font-bold mb-2 text-[#4AC1E0]">Gallery</h2>
            <div className="flex gap-4 overflow-x-auto">
              {professional.gallery.map((image: string, idx: number) => (
                <img
                  key={idx}
                  src={image}
                  alt={`Gallery ${idx + 1}`}
                  className="w-32 h-32 object-cover rounded-lg border shadow hover:scale-105 transition-transform duration-200"
                />
              ))}
            </div>
          </section>
        )}
        {/* Reviews */}
        {professional.reviews && professional.reviews.length > 0 && (
          <section className="bg-white rounded-2xl shadow p-6 mb-6 border border-blue-50">
            <h2 className="text-xl font-bold mb-2 text-[#4AC1E0]">Reviews</h2>
            <div className="mb-4 flex items-center gap-2">
              <StarIcon className="w-5 h-5 text-yellow-400" />
              <span className="font-semibold text-lg">{professional.rating}</span>
              <span className="text-gray-500">({professional.reviewsCount || 0} reviews)</span>
            </div>
            <div className="space-y-4">
              {professional.reviews.map((review: any, idx: number) => (
                <div key={idx} className="border-b pb-2 flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700 text-lg">
                    {review.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{review.name}</span>
                      <span className="text-gray-400 text-xs">{review.date}</span>
                      <span className="text-yellow-400 ml-2">{'★'.repeat(review.rating)}</span>
                    </div>
                    <p className="text-gray-700">{review.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 transition font-semibold">Write a Review</button>
          </section>
        )}
        {/* Contact & Location */}
        <section className="bg-white rounded-2xl shadow p-6 mb-20 border border-blue-50">
          <h2 className="text-xl font-bold mb-2 text-[#4AC1E0]">Contact & Location</h2>
          <div className="flex flex-col gap-2">
            {professional.contact?.email && (
              <div className="flex items-center gap-2 text-gray-700">
                <EnvelopeIcon className="w-5 h-5 text-blue-400" />
                <span>{professional.contact.email}</span>
              </div>
            )}
            {professional.contact?.phone && (
              <div className="flex items-center gap-2 text-gray-700">
                <PhoneIcon className="w-5 h-5 text-blue-400" />
                <span>{professional.contact.phone}</span>
              </div>
            )}
            {professional.social && (
              <div className="flex items-center gap-2 text-gray-700">
                <span className="font-semibold">Social:</span>
                <span>{professional.social}</span>
              </div>
            )}
            {professional.location && (
              <div className="flex items-center gap-2 text-gray-700">
                <MapPinIcon className="w-5 h-5 text-blue-400" />
                <span>{professional.location}</span>
              </div>
            )}
          </div>
          {/* Map Embed if available */}
          {professional.mapEmbed && (
            <div className="mt-4">
              <iframe src={professional.mapEmbed} width="100%" height="200" className="rounded-lg border" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          )}
        </section>
      </div>
    </div>
  );
} 
"use client";

import { useState, useEffect } from "react";
import { db } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

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

export default function ProfessionalPage({ params }: { params: { id: string } }) {
  const [professional, setProfessional] = useState(mockProfessional);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfessional() {
      setLoading(true);
      const docRef = doc(db, "professionals", params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfessional({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No such professional found, using mock data");
      }
      setLoading(false);
    }
    fetchProfessional();
  }, [params.id]);

  if (loading) {
    return <div className="text-center text-gray-500">Loading professional profile...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl mt-16">
      {/* Profile Header */}
      <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-8 mb-8 relative">
        <img
          src={professional.photoUrl}
          alt={professional.name}
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 mb-4 shadow"
        />
        <h1 className="text-3xl font-bold mb-1 text-center">{professional.name}</h1>
        <div className="text-blue-700 font-semibold mb-1 text-center">{professional.title}</div>
        <div className="flex flex-wrap gap-2 mb-2 justify-center">
          {professional.specialties.map((spec) => (
            <span key={spec} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">{spec}</span>
          ))}
        </div>
        <div className="text-gray-600 mb-2 text-center">{professional.location}</div>
        <div className="flex items-center justify-center mb-4">
          <span className="text-yellow-500 mr-1">★</span>
          <span className="font-semibold">{professional.rating}</span>
          <span className="text-gray-500 ml-2">({professional.reviewsCount} reviews)</span>
        </div>
        <div className="flex gap-3 justify-center w-full mb-2">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded text-lg font-semibold transition w-40">Book Now</button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded text-lg font-semibold transition w-40">Contact</button>
        </div>
        <button className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-2 rounded transition" title="Share">🔗</button>
      </div>

      {/* About & Credentials */}
      <section className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">About</h2>
        <p className="mb-4 text-gray-700">{professional.bio}</p>
        <h3 className="font-semibold mb-1">Credentials</h3>
        <ul className="list-disc list-inside text-gray-700">
          {professional.credentials.map((cred) => (
            <li key={cred}>{cred}</li>
          ))}
        </ul>
      </section>

      {/* Services & Pricing */}
      <section className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">Services & Pricing</h2>
        <div className="divide-y">
          {professional.services.map((service) => (
            <div key={service.name} className="flex justify-between py-2">
              <span>{service.name} <span className="text-gray-400 text-xs">({service.duration})</span></span>
              <span className="font-semibold">${service.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Availability */}
      <section className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">Availability</h2>
        <p className="text-gray-700">{professional.availability}</p>
      </section>

      {/* Gallery */}
      <section className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">Gallery</h2>
        <div className="flex gap-4 overflow-x-auto">
          {professional.gallery.map((image, idx) => (
            <img
              key={idx}
              src={image}
              alt={`Gallery ${idx + 1}`}
              className="w-32 h-32 object-cover rounded-lg border"
            />
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">Reviews</h2>
        <div className="mb-4 flex items-center">
          <span className="text-yellow-500 mr-1">★</span>
          <span className="font-semibold">{professional.rating}</span>
          <span className="text-gray-500 ml-2">({professional.reviewsCount} reviews)</span>
        </div>
        <div className="space-y-4">
          {professional.reviews.map((review, idx) => (
            <div key={idx} className="border-b pb-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">{review.name}</span>
                <span className="text-gray-400 text-xs">{review.date}</span>
                <span className="text-yellow-400 ml-2">{'★'.repeat(review.rating)}</span>
              </div>
              <p className="text-gray-700">{review.text}</p>
            </div>
          ))}
        </div>
        <button className="mt-4 bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 transition">Write a Review</button>
      </section>

      {/* Contact & Location */}
      <section className="bg-white rounded-lg shadow p-6 mb-20">
        <h2 className="text-xl font-semibold mb-2">Contact & Location</h2>
        <div className="mb-2">
          <span className="font-semibold">Email:</span> <a href={`mailto:${professional.contact.email}`} className="text-blue-600 underline">{professional.contact.email}</a>
        </div>
        <div className="mb-4">
          <span className="font-semibold">Phone:</span> <a href={`tel:${professional.contact.phone}`} className="text-blue-600 underline">{professional.contact.phone}</a>
        </div>
        {/* <iframe src={professional.mapEmbed} width="100%" height="200" className="rounded" loading="lazy" title="Map"></iframe> */}
        <div className="bg-gray-100 rounded p-4 text-center text-gray-400">[Map Placeholder]</div>
      </section>

      {/* Sticky Book Now (Mobile & Desktop) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow p-4 flex justify-center md:justify-end md:pr-16">
        <button className="w-full md:w-auto max-w-md bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded text-lg font-semibold transition shadow-lg">Book Now</button>
      </div>
    </div>
  );
} 
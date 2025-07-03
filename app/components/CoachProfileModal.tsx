import React, { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import EnquiryFormModal from '../../components/EnquiryFormModal';

export default function CoachProfileModal({ coach, onClose }: { coach: any, onClose: () => void }) {
  const [enquiryOpen, setEnquiryOpen] = React.useState(false);
  const [profile, setProfile] = useState<any>(coach);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      if (!coach?.id) return;
      setLoading(true);
      setError("");
      try {
        const docRef = doc(db, 'professionals', coach.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile({ id: docSnap.id, ...docSnap.data() });
        } else {
          setProfile(coach);
          setError('No detailed profile found. Showing summary.');
        }
      } catch (err) {
        setProfile(coach);
        setError('Error loading profile. Showing summary.');
      }
      setLoading(false);
    }
    fetchProfile();
    // eslint-disable-next-line
  }, [coach?.id]);

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 transition-colors">
          <XMarkIcon className="w-6 h-6" />
        </button>
        {loading ? (
          <div className="text-center text-gray-500 py-8">Loading profile...</div>
        ) : (
          <div className="flex flex-col items-center">
            {error && <div className="mb-2 text-yellow-600 text-sm">{error}</div>}
            {profile.image || profile.photoUrl ? (
              <img src={profile.image || profile.photoUrl} alt={profile.name} className="w-24 h-24 rounded-full object-cover border-4 border-blue-200 mb-4 shadow" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center text-3xl font-bold text-white mb-4">
                {profile.name?.split(' ').map((n: string) => n[0]).join('')}
              </div>
            )}
            <h2 className="text-2xl font-bold mb-1 text-center">{profile.name}</h2>
            <div className="text-blue-700 font-semibold mb-1 text-center">{profile.specialty || profile.title}</div>
            <div className="text-gray-600 mb-2 text-center">{profile.experience} experience</div>
            <div className="flex items-center justify-center mb-2">
              <span className="text-yellow-500 mr-1">★</span>
              <span className="font-semibold">{profile.rating}</span>
            </div>
            <div className="mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${profile.availability?.includes('Now') ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{profile.availability}</span>
            </div>
            {/* Add more details here if available (bio, reviews, etc.) */}
            {profile.bio && <div className="mb-2 text-gray-700 text-center text-sm">{profile.bio}</div>}
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded text-lg font-semibold transition shadow-lg mt-4" onClick={() => setEnquiryOpen(true)}>Submit Enquiry</button>
          </div>
        )}
        <EnquiryFormModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} coachId={profile.id} coachName={profile.name} />
      </div>
    </div>
  );
} 
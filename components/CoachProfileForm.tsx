import { useState, useEffect } from 'react';
import { db } from '../app/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import ImageUpload from './ImageUpload';
import GalleryUpload from './GalleryUpload';
import PlacesAutocomplete from 'react-places-autocomplete';
import { SPECIALTIES } from '../app/constants/specialties';

interface CoachProfileFormProps {
  coachId: string;
}

export default function CoachProfileForm({ coachId }: CoachProfileFormProps) {
  const [profile, setProfile] = useState<{
    name: string;
    bio: string;
    specialties: string[];
    experience: string;
    pricing: string;
    availability: string;
    imageUrl: string;
    email: string;
    social: string;
    gallery: string[];
    location: string;
  }>({
    name: '',
    bio: '',
    specialties: [],
    experience: '',
    pricing: '',
    availability: '',
    imageUrl: '',
    email: '',
    social: '',
    gallery: [],
    location: '',
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      try {
        const docRef = doc(db, 'coachProfiles', coachId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile({ ...profile, ...docSnap.data() });
        }
      } catch (err) {
        setError('Failed to load profile.');
      }
      setLoading(false);
    }
    if (coachId) fetchProfile();
    // eslint-disable-next-line
  }, [coachId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSpecialtyChange = (spec: string) => {
    setProfile(prev => ({
      ...prev,
      specialties: prev.specialties.includes(spec)
        ? prev.specialties.filter((s: string) => s !== spec)
        : [...prev.specialties, spec]
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess(false);
    try {
      await setDoc(doc(db, 'coachProfiles', coachId), profile, { merge: true });
      setSuccess(true);
    } catch (err) {
      setError('Failed to save profile.');
    }
    setSaving(false);
  };

  if (loading) return <div>Loading profile...</div>;

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* Basic Info */}
      <div>
        <h4 className="text-lg font-semibold mb-4 text-[#4AC1E0]">Basic Info</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input name="name" value={profile.name} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="e.g. Sarah Johnson" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Profile Image</label>
            {profile.imageUrl && (
              <img src={profile.imageUrl} alt="Profile" className="w-24 h-24 rounded-full object-cover mb-2 border" />
            )}
            <ImageUpload
              folder="profileImages"
              onUpload={url => setProfile(prev => ({ ...prev, imageUrl: url }))}
              label={profile.imageUrl ? 'Change Image' : 'Upload Image'}
            />
            <input name="imageUrl" value={profile.imageUrl} onChange={handleChange} className="w-full border rounded px-3 py-2 mt-2" placeholder="Paste image URL or upload above" />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Bio/About</label>
          <textarea name="bio" value={profile.bio} onChange={handleChange} className="w-full border rounded px-3 py-2 min-h-[80px]" placeholder="Tell us about yourself, your approach, and what makes you unique." />
        </div>
      </div>
      {/* Professional Details */}
      <div>
        <h4 className="text-lg font-semibold mb-4 text-[#4AC1E0]">Professional Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Specialties</label>
            {Object.entries(SPECIALTIES).map(([category, list]) => (
              <div key={category} className="mb-4">
                <div className="font-semibold mb-2 capitalize">{category} Specialties</div>
                <div className="flex flex-col gap-1">
                  {list.map((spec) => (
                    <label key={spec} className="flex items-center">
                      <input
                        type="checkbox"
                        name="specialties"
                        value={spec}
                        checked={profile.specialties.includes(spec)}
                        onChange={() => handleSpecialtyChange(spec)}
                        className="mr-2"
                      />
                      {spec}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Years of Experience</label>
            <input name="experience" value={profile.experience} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="e.g. 8" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Pricing <span className="text-gray-400">(per session)</span></label>
            <input name="pricing" value={profile.pricing} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="$75" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Availability</label>
            <input name="availability" value={profile.availability} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="e.g. Weekdays after 5pm, Sat mornings" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <PlacesAutocomplete
              value={profile.location || ''}
              onChange={address => setProfile(prev => ({ ...prev, location: address }))}
              onSelect={address => setProfile(prev => ({ ...prev, location: address }))}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: 'Enter your location',
                      className: 'w-full border rounded px-3 py-2',
                    })}
                  />
                  <div className="absolute z-10 bg-white border rounded shadow mt-1 w-full">
                    {loading && <div className="px-3 py-2 text-gray-400">Loading...</div>}
                    {suggestions.map(suggestion => {
                      const className = suggestion.active
                        ? 'px-3 py-2 cursor-pointer bg-blue-100'
                        : 'px-3 py-2 cursor-pointer';
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, { className })}
                          key={suggestion.placeId}
                        >
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </div>
        </div>
      </div>
      {/* Contact & Social */}
      <div>
        <h4 className="text-lg font-semibold mb-4 text-[#4AC1E0]">Contact & Social</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Contact Email</label>
            <input name="email" value={profile.email} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="your@email.com" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Social Links <span className="text-gray-400">(comma separated)</span></label>
            <input name="social" value={profile.social} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="Instagram, Facebook, LinkedIn URLs" />
          </div>
        </div>
      </div>
      {/* Gallery Images */}
      <div>
        <h4 className="text-lg font-semibold mb-4 text-[#4AC1E0]">Gallery Images</h4>
        <GalleryUpload
          folder="galleryImages"
          onUpload={urls => setProfile(prev => ({ ...prev, gallery: urls }))}
          initialUrls={profile.gallery}
        />
      </div>
      {/* Feedback & Save */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mt-4">
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">Profile saved!</div>}
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-8 rounded-lg md:ml-auto" disabled={saving}>{saving ? 'Saving...' : 'Save Profile'}</button>
      </div>
    </form>
  );
} 
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import BusinessMap from '../components/BusinessMap';
import AdBanner from '../components/AdBanner';
import TrendingProducts from '../components/TrendingProducts';
import AISearch from '../components/AISearch';
import BusinessInsights from '../components/BusinessInsights';
import SearchWrapper from '../components/SearchWrapper';
import DirectorySearchBar from './DirectorySearchBar';
import DirectoryFilters from './DirectoryFilters';
import DirectoryResultsList from './DirectoryResultsList';
import { db } from '../lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

interface Business {
  id: string;
  name: string;
  category: string;
  location: string;
  description: string;
  specialties: string[];
  image: string;
  connectionCount: number;
  rating: number;
  verified: boolean;
  relevanceScore?: number;
  similarityScore?: number;
  createdAt: string;
}

interface UserPreferences {
  recentSearches: string[];
  viewedBusinesses: string[];
  categoryAffinities: Record<string, number>;
  locationPreferences: string[];
}

interface SortOption {
  label: string;
  value: 'relevance' | 'rating' | 'newest' | 'connections';
}

const categories = [
  'All',
  'Personal Training',
  'Physical Therapy',
  'Nutrition',
  'Mental Health',
  'Sports Medicine',
  'Yoga & Pilates',
  'CrossFit & Functional',
  'Recovery & Wellness'
];

const locations = [
  'All Locations',
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Boston, MA',
  'Seattle, WA',
  'Austin, TX',
  'Miami, FL'
];

const businesses: Business[] = [
  {
    id: '1',
    name: 'Elite Performance Training',
    category: 'Personal Training',
    location: 'New York, NY',
    description: 'Personalized strength and conditioning programs for athletes and fitness enthusiasts.',
    specialties: ['Strength Training', 'Sports Performance', 'HIIT'],
    image: '/images/businesses/elite-performance.jpg',
    connectionCount: 1250,
    rating: 4.8,
    verified: true,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'PhysioFlex Rehabilitation',
    category: 'Physical Therapy',
    location: 'Los Angeles, CA',
    description: 'Expert physical therapy and rehabilitation services for injury recovery and prevention.',
    specialties: ['Sports Rehabilitation', 'Post-Surgery Recovery', 'Pain Management'],
    image: '/images/businesses/physioflex.jpg',
    connectionCount: 890,
    rating: 4.9,
    verified: true,
    createdAt: '2024-02-01'
  },
  {
    id: '3',
    name: 'Mindful Wellness Center',
    category: 'Mental Health',
    location: 'Chicago, IL',
    description: 'Comprehensive mental health services for athletes and active individuals.',
    specialties: ['Sports Psychology', 'Stress Management', 'Performance Anxiety'],
    image: 'https://placehold.co/600x400/333/FFF?text=Mindful+Wellness',
    connectionCount: 750,
    rating: 4.7,
    verified: true,
    createdAt: '2024-01-20'
  },
  {
    id: '4',
    name: 'NutriPeak Performance',
    category: 'Nutrition',
    location: 'Boston, MA',
    description: 'Science-based nutrition coaching for optimal athletic performance.',
    specialties: ['Sports Nutrition', 'Meal Planning', 'Weight Management'],
    image: 'https://placehold.co/600x400/333/FFF?text=NutriPeak',
    connectionCount: 980,
    rating: 4.6,
    verified: true,
    createdAt: '2024-02-10'
  },
  {
    id: '5',
    name: 'Core Power Yoga Studio',
    category: 'Yoga & Pilates',
    location: 'Seattle, WA',
    description: 'Dynamic yoga classes focused on strength, flexibility, and mindfulness.',
    specialties: ['Power Yoga', 'Athletic Recovery', 'Meditation'],
    image: 'https://placehold.co/600x400/333/FFF?text=Core+Power',
    connectionCount: 1100,
    rating: 4.8,
    verified: true,
    createdAt: '2024-01-25'
  },
  {
    id: '6',
    name: 'CrossFit Revolution',
    category: 'CrossFit & Functional',
    location: 'Austin, TX',
    description: 'High-intensity functional fitness training in a supportive community.',
    specialties: ['CrossFit', 'Olympic Lifting', 'Functional Training'],
    image: 'https://placehold.co/600x400/333/FFF?text=CrossFit+Revolution',
    connectionCount: 1500,
    rating: 4.9,
    verified: true,
    createdAt: '2024-02-05'
  },
  {
    id: '7',
    name: 'Recovery Zone',
    category: 'Recovery & Wellness',
    location: 'Miami, FL',
    description: 'Comprehensive recovery services for optimal performance and well-being.',
    specialties: ['Massage Therapy', 'Cryotherapy', 'Compression Therapy'],
    image: 'https://placehold.co/600x400/333/FFF?text=Recovery+Zone',
    connectionCount: 680,
    rating: 4.7,
    verified: true,
    createdAt: '2024-01-30'
  },
  {
    id: '8',
    name: 'Sports Medicine Excellence',
    category: 'Sports Medicine',
    location: 'New York, NY',
    description: 'Expert sports medicine care for injury treatment and prevention.',
    specialties: ['Injury Assessment', 'Treatment Planning', 'Return to Sport'],
    image: 'https://placehold.co/600x400/333/FFF?text=Sports+Medicine',
    connectionCount: 920,
    rating: 4.8,
    verified: true,
    createdAt: '2024-02-15'
  }
];

const sortOptions: SortOption[] = [
  { label: 'Most Relevant', value: 'relevance' },
  { label: 'Highest Rated', value: 'rating' },
  { label: 'Newest', value: 'newest' },
  { label: 'Most Connected', value: 'connections' }
];

export default function DirectoryPage() {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ specialty: '', modality: '' });

  useEffect(() => {
    async function fetchProfessionals() {
      setLoading(true);
      let q = collection(db, 'professionals');
      // Example: Add filtering logic here if needed
      // q = query(q, where('specialties', 'array-contains', filters.specialty));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProfessionals(data);
      setLoading(false);
    }
    fetchProfessionals();
  }, [filters]);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    setFilters({
      ...filters,
      specialty: form.specialty.value,
      // Add location or other filters as needed
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div>
        <DirectoryFilters filters={filters} setFilters={setFilters} />
      </div>
      <div className="flex-1">
        <DirectorySearchBar onSearch={handleSearch} />
        {loading ? (
          <div>Loading professionals...</div>
        ) : (
          <DirectoryResultsList professionals={professionals} />
        )}
      </div>
    </div>
  );
}

// Enhanced BusinessCard component
function BusinessCard({ 
  business, 
  view,
  isSelected,
  onSelect 
}: { 
  business: Business;
  view: 'grid' | 'list';
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer
        ${isSelected ? 'ring-2 ring-blue-500' : ''}
        ${view === 'list' ? 'flex' : ''}`}
      onClick={onSelect}
    >
      {/* Image Section */}
      <div className={`relative ${view === 'list' ? 'w-48' : 'h-48'}`}>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${business.image})`,
            backgroundColor: '#f3f4f6',
            backgroundSize: 'cover'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        {business.verified && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
            Verified
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{business.name}</h3>
          <div className="flex items-center">
            <span className="text-yellow-400 mr-1">★</span>
            <span className="text-sm">{business.rating}</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{business.description}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {business.specialties.slice(0, 3).map((specialty, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">{business.location}</span>
          <Link
            href={`/directory/${business.id}`}
            className="text-blue-600 hover:text-blue-700"
          >
            View Details →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

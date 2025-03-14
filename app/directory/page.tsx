'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import BusinessMap from '../components/BusinessMap';
import AdBanner from '../components/AdBanner';
import TrendingProducts from '../components/TrendingProducts';
import AISearch from '../components/AISearch';
import BusinessInsights from '../components/BusinessInsights';

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
    verified: true
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
    verified: true
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
    verified: true
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
    verified: true
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
    verified: true
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
    verified: true
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
    verified: true
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
    verified: true
  }
];

const sortOptions: SortOption[] = [
  { label: 'Most Relevant', value: 'relevance' },
  { label: 'Highest Rated', value: 'rating' },
  { label: 'Newest', value: 'newest' },
  { label: 'Most Connected', value: 'connections' }
];

export default function DirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | undefined>();
  const [showMap, setShowMap] = useState(true);
  const [view, setView] = useState<'grid' | 'list'>('list');
  const [sortBy, setSortBy] = useState<SortOption['value']>('relevance');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  // Filter businesses based on all criteria
  const filteredBusinesses = useMemo(() => {
    return businesses.filter(business => {
      const matchesSearch = !searchQuery || 
        business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || 
        business.category === selectedCategory;
      
      const matchesLocation = selectedLocation === 'All Locations' || 
        business.location === selectedLocation;
      
      const matchesFilters = activeFilters.length === 0 || 
        activeFilters.some(filter => business.specialties.includes(filter));

      return matchesSearch && matchesCategory && matchesLocation && matchesFilters;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'connections':
          return b.connectionCount - a.connectionCount;
        case 'newest':
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        default:
          return (b.relevanceScore || 0) - (a.relevanceScore || 0);
      }
    });
  }, [businesses, searchQuery, selectedCategory, selectedLocation, activeFilters, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Fit</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                {view === 'grid' ? 'List View' : 'Grid View'}
              </button>
              <button
                onClick={() => setShowMap(!showMap)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                {showMap ? 'Hide Map' : 'Show Map'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* AI Search Section */}
        <section className="mb-8">
          <AISearch />
        </section>

        {/* Enhanced Filters */}
        <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Search and Categories (existing) */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Sort By</h3>
              <div className="flex flex-wrap gap-2">
                {sortOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`px-3 py-1.5 rounded-full text-sm ${
                      sortBy === option.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Filters */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Active Filters</h3>
              <div className="flex flex-wrap gap-2">
                {activeFilters.map(filter => (
                  <span
                    key={filter}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-blue-100 text-blue-800"
                  >
                    {filter}
                    <button
                      onClick={() => setActiveFilters(filters => filters.filter(f => f !== filter))}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {activeFilters.length === 0 && (
                  <span className="text-sm text-gray-500">No active filters</span>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="col-span-2 grid grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">{filteredBusinesses.length}</div>
                <div className="text-sm text-gray-600">Matching Results</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">
                  {filteredBusinesses.filter(b => b.verified).length}
                </div>
                <div className="text-sm text-gray-600">Verified Businesses</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600">
                  {Array.from(new Set(filteredBusinesses.map(b => b.location))).length}
                </div>
                <div className="text-sm text-gray-600">Locations</div>
              </div>
            </div>
          </div>
        </section>

        {/* Map and Content Layout */}
        <div className="flex gap-8">
          {/* Left Column - Map and Ads */}
          {showMap && (
            <div className="w-1/2 sticky top-8 h-[calc(100vh-8rem)]">
              <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                <BusinessMap
                  businesses={businesses}
                  selectedBusinessId={selectedBusinessId}
                  onSelectBusiness={setSelectedBusinessId}
                />
              </div>
              <div className="space-y-4">
                <AdBanner
                  title="Premium Business Listing"
                  description="Stand out from the competition"
                  ctaText="Upgrade Now"
                  ctaLink="/upgrade"
                  imageSrc="/images/premium-banner.jpg"
                />
                <TrendingProducts />
                <BusinessInsights />
              </div>
            </div>
          )}

          {/* Right Column - Business Listings */}
          <div className={showMap ? 'w-1/2' : 'w-full'}>
            {/* Advanced Filters */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <select
                  className="form-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <select
                  className="form-select"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="All">All Locations</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Business Listings */}
            <div className={`grid gap-6 ${view === 'grid' ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {filteredBusinesses.map((business) => (
                <BusinessCard
                  key={business.id}
                  business={business}
                  view={view}
                  isSelected={business.id === selectedBusinessId}
                  onSelect={() => setSelectedBusinessId(business.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
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

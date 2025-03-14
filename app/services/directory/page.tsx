'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  MapPinIcon,
  StarIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';

interface ServiceProvider {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  verified: boolean;
  location: {
    city: string;
    state: string;
  };
  specialties: string[];
  pricing: {
    startingPrice: number;
    unit: string;
  };
  availability: string;
}

// Mock data for service providers
const serviceProviders: ServiceProvider[] = [
  {
    id: "1",
    name: "Elite Performance Training",
    category: "Personal Training",
    description: "Premier personal training and fitness coaching specializing in strength training and rehabilitation.",
    image: "/images/businesses/elite-performance-1.jpg",
    rating: 4.9,
    reviews: 128,
    verified: true,
    location: {
      city: "Sydney",
      state: "NSW"
    },
    specialties: ["Strength Training", "Rehabilitation", "Sports Performance"],
    pricing: {
      startingPrice: 90,
      unit: "session"
    },
    availability: "Available Now"
  },
  {
    id: "2",
    name: "Sydney Physiotherapy Clinic",
    category: "Physiotherapy",
    description: "Expert physiotherapy services with a focus on sports injuries and rehabilitation.",
    image: "/images/businesses/physio-clinic.jpg",
    rating: 4.8,
    reviews: 95,
    verified: true,
    location: {
      city: "Sydney",
      state: "NSW"
    },
    specialties: ["Sports Injuries", "Rehabilitation", "Pain Management"],
    pricing: {
      startingPrice: 120,
      unit: "session"
    },
    availability: "Book for Tomorrow"
  },
  {
    id: "3",
    name: "Wellness Massage Center",
    category: "Massage Therapy",
    description: "Professional massage therapy services for relaxation and recovery.",
    image: "/images/providers/massage-center.jpg",
    rating: 4.7,
    reviews: 156,
    verified: true,
    location: {
      city: "Sydney",
      state: "NSW"
    },
    specialties: ["Sports Massage", "Deep Tissue", "Relaxation"],
    pricing: {
      startingPrice: 85,
      unit: "hour"
    },
    availability: "Available Today"
  }
];

const categories = [
  "All Services",
  "Personal Training",
  "Physiotherapy",
  "Massage Therapy",
  "Chiropractic",
  "Nutrition",
  "Health Coaching"
];

const locations = ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"];

export default function ServicesDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Services');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort providers
  const filteredProviders = serviceProviders
    .filter(provider => {
      const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          provider.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All Services' || provider.category === selectedCategory;
      const matchesLocation = !selectedLocation || provider.location.city === selectedLocation;
      return matchesSearch && matchesCategory && matchesLocation;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price') return a.pricing.startingPrice - b.pricing.startingPrice;
      return b.reviews - a.reviews;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Search */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Find Health & Wellness Services</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            Connect with top-rated health professionals and service providers in your area.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl relative">
            <input
              type="text"
              placeholder="Search for services or providers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <MagnifyingGlassIcon className="absolute right-4 top-4 h-6 w-6 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Filters Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Available Services</h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full border rounded-md py-2 px-3"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full border rounded-md py-2 px-3"
                  >
                    <option value="">All Locations</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full border rounded-md py-2 px-3"
                  >
                    <option value="rating">Highest Rated</option>
                    <option value="reviews">Most Reviews</option>
                    <option value="price">Lowest Price</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Service Providers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src={provider.image}
                  alt={provider.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{provider.name}</h3>
                    <p className="text-yellow-600">{provider.category}</p>
                  </div>
                  {provider.verified && (
                    <CheckBadgeIcon className="h-6 w-6 text-green-500" />
                  )}
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{provider.description}</p>
                
                <div className="flex items-center mb-4">
                  <StarIcon className="h-5 w-5 text-yellow-400" />
                  <span className="ml-1 font-semibold">{provider.rating}</span>
                  <span className="ml-1 text-gray-500">({provider.reviews} reviews)</span>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                  <MapPinIcon className="h-5 w-5 mr-1" />
                  <span>{provider.location.city}, {provider.location.state}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">
                    From ${provider.pricing.startingPrice}/{provider.pricing.unit}
                  </span>
                  <Link
                    href={`/directory/${provider.id}`}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProviders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No service providers found matching your criteria. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 
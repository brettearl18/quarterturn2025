'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  UserGroupIcon, 
  AcademicCapIcon, 
  ClockIcon, 
  MapPinIcon,
  StarIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: any;
  providers: number;
}

const categories: ServiceCategory[] = [
  {
    id: 'personal-training',
    title: 'Personal Training',
    description: 'Expert personal trainers providing customized workout plans and one-on-one guidance.',
    icon: UserGroupIcon,
    providers: 150
  },
  {
    id: 'physiotherapy',
    title: 'Physiotherapy',
    description: 'Professional physiotherapists helping with injury recovery and movement improvement.',
    icon: AcademicCapIcon,
    providers: 85
  },
  {
    id: 'chiropractic',
    title: 'Chiropractic Care',
    description: 'Skilled chiropractors offering spinal adjustments and pain management solutions.',
    icon: UserGroupIcon,
    providers: 65
  },
  {
    id: 'health-coaching',
    title: 'Health Coaching',
    description: 'Certified health coaches providing guidance on nutrition, lifestyle, and wellness.',
    icon: AcademicCapIcon,
    providers: 95
  },
  {
    id: 'nutrition',
    title: 'Nutrition Consulting',
    description: 'Expert nutritionists offering personalized diet plans and nutritional advice.',
    icon: UserGroupIcon,
    providers: 70
  },
  {
    id: 'massage',
    title: 'Massage Therapy',
    description: 'Professional massage therapists specializing in various therapeutic techniques.',
    icon: UserGroupIcon,
    providers: 110
  }
];

interface FeaturedProvider {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  availability: string;
}

const featuredProviders: FeaturedProvider[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    category: 'Physiotherapy',
    image: '/images/providers/provider1.jpg',
    rating: 4.9,
    reviews: 128,
    location: 'Sydney CBD',
    availability: 'Mon-Fri: 8AM-6PM'
  },
  {
    id: '2',
    name: 'Mike Thompson',
    category: 'Personal Training',
    image: '/images/providers/provider2.jpg',
    rating: 4.8,
    reviews: 95,
    location: 'Bondi Beach',
    availability: 'Mon-Sat: 6AM-8PM'
  },
  {
    id: '3',
    name: 'Dr. Emily Chen',
    category: 'Chiropractic Care',
    image: '/images/providers/provider3.jpg',
    rating: 4.9,
    reviews: 156,
    location: 'North Sydney',
    availability: 'Mon-Fri: 9AM-5PM'
  }
];

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="relative z-20 container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Health & Medical Services</h1>
            <p className="text-xl mb-8">
              Connect with top health professionals in your area. From personal trainers to physiotherapists,
              find the perfect expert for your wellness journey.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl">
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
      </section>

      {/* Service Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Service Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <category.icon className="h-12 w-12 text-yellow-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{category.providers} Providers</span>
                  <Link 
                    href={`/directory?category=${category.id}`}
                    className="text-yellow-600 hover:text-yellow-700 font-semibold"
                  >
                    View All →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Health Professionals</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProviders.map((provider) => (
              <motion.div
                key={provider.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={provider.image}
                    alt={provider.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold">{provider.name}</h3>
                      <p className="text-yellow-600">{provider.category}</p>
                    </div>
                    <div className="flex items-center">
                      <StarIcon className="h-5 w-5 text-yellow-400" />
                      <span className="ml-1 font-semibold">{provider.rating}</span>
                      <span className="text-sm text-gray-500 ml-1">({provider.reviews})</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center">
                      <MapPinIcon className="h-5 w-5 mr-2" />
                      <span>{provider.location}</span>
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="h-5 w-5 mr-2" />
                      <span>{provider.availability}</span>
                    </div>
                  </div>
                  <Link
                    href={`/directory/${provider.id}`}
                    className="mt-4 block w-full text-center bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition-colors"
                  >
                    View Profile
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/directory"
              className="inline-block bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
              View All Health Professionals
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Our Platform</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="bg-yellow-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <UserGroupIcon className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Professionals</h3>
              <p className="text-gray-600">All our health service providers are thoroughly vetted and certified.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-yellow-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <ClockIcon className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-600">Book appointments with your preferred health professional instantly.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <div className="bg-yellow-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <StarIcon className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
              <p className="text-gray-600">Read verified reviews and ratings from real clients.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
} 
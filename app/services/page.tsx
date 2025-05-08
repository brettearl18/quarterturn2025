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
  MagnifyingGlassIcon,
  VideoCameraIcon,
  BuildingStorefrontIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: any;
  providers: number;
  features: string[];
}

const categories: ServiceCategory[] = [
  {
    id: 'personal-training',
    title: 'Personal Training',
    description: 'One-on-one training sessions with certified professionals',
    icon: UserGroupIcon,
    providers: 150,
    features: ['Custom workout plans', 'Nutrition guidance', 'Progress tracking']
  },
  {
    id: 'online-coaching',
    title: 'Online Coaching',
    description: 'Remote coaching and support for your fitness journey',
    icon: VideoCameraIcon,
    providers: 200,
    features: ['Video consultations', 'Mobile app support', '24/7 chat access']
  },
  {
    id: 'fitness-classes',
    title: 'Group Classes',
    description: 'Energetic group sessions for all fitness levels',
    icon: AcademicCapIcon,
    providers: 80,
    features: ['Various class types', 'Flexible scheduling', 'Community support']
  },
  {
    id: 'gym-partnerships',
    title: 'Gym Partnerships',
    description: 'Access to our network of premium fitness facilities',
    icon: BuildingStorefrontIcon,
    providers: 50,
    features: ['Multiple locations', 'Premium equipment', 'Exclusive rates']
  },
  {
    id: 'nutrition-planning',
    title: 'Nutrition Planning',
    description: 'Customized meal plans and dietary guidance',
    icon: ChartBarIcon,
    providers: 120,
    features: ['Meal planning', 'Supplement advice', 'Diet tracking']
  },
  {
    id: 'fitness-assessment',
    title: 'Fitness Assessment',
    description: 'Comprehensive evaluation of your fitness level',
    icon: ClockIcon,
    providers: 90,
    features: ['Body composition', 'Performance metrics', 'Goal setting']
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

  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Fitness Services
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Expert guidance and support to help you achieve your fitness goals
            </p>
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-full bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4AC1E0]"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCategories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 bg-[#4AC1E0] bg-opacity-10 rounded-lg flex items-center justify-center mb-6">
                  <category.icon className="w-8 h-8 text-[#4AC1E0]" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="space-y-3">
                  {category.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <span className="w-2 h-2 bg-[#4AC1E0] rounded-full mr-2"></span>
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm text-gray-500">{category.providers} Providers</span>
                  <button className="px-4 py-2 bg-[#4AC1E0] text-white rounded-lg hover:bg-[#4AC1E0]/90 transition-colors">
                    Learn More
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Connect with our fitness professionals and start your journey today
            </p>
            <button className="px-8 py-4 bg-[#4AC1E0] text-white rounded-full hover:bg-[#4AC1E0]/90 transition-colors text-lg font-semibold">
              Schedule a Consultation
            </button>
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
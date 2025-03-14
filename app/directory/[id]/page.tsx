'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  StarIcon, 
  MapPinIcon, 
  ClockIcon, 
  CheckBadgeIcon,
  ShoppingBagIcon,
  HandThumbUpIcon
} from '@heroicons/react/24/outline';

interface AffiliateProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  affiliateCommission: number;
  provider: {
    name: string;
    id: string;
  };
}

interface AffiliateService {
  id: string;
  name: string;
  description: string;
  provider: {
    name: string;
    id: string;
    image: string;
  };
  category: string;
  affiliateCommission: number;
}

interface BusinessProfile {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  reviews: number;
  verified: boolean;
  location: {
    address: string;
    city: string;
    state: string;
    postcode: string;
  };
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  hours: {
    day: string;
    hours: string;
  }[];
  services: {
    name: string;
    description: string;
    price: string;
  }[];
  affiliateProducts: AffiliateProduct[];
  affiliateServices: AffiliateService[];
  expertise: string[];
  certifications: string[];
  images: string[];
  yearEstablished: number;
  teamSize: string;
  serviceAreas: string[];
}

// Mock data for the business profile
const businessData: BusinessProfile = {
  id: "1",
  name: "Elite Performance Training",
  description: "Premier personal training and fitness coaching in Sydney CBD. Specializing in strength training, rehabilitation, and performance enhancement.",
  category: "Personal Training",
  rating: 4.9,
  reviews: 128,
  verified: true,
  location: {
    address: "123 Fitness Street",
    city: "Sydney",
    state: "NSW",
    postcode: "2000"
  },
  contact: {
    phone: "+61 2 9876 5432",
    email: "info@eliteperformance.com",
    website: "www.eliteperformance.com"
  },
  hours: [
    { day: "Monday - Friday", hours: "6:00 AM - 8:00 PM" },
    { day: "Saturday", hours: "7:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed" }
  ],
  services: [
    {
      name: "1-on-1 Personal Training",
      description: "Personalized training sessions tailored to your goals",
      price: "From $90/session"
    },
    {
      name: "Group Training",
      description: "Small group training sessions (max 4 people)",
      price: "From $45/session"
    }
  ],
  affiliateProducts: [
    {
      id: "p1",
      name: "Premium Training Mat",
      description: "High-quality exercise mat perfect for all workout types",
      price: 89.99,
      image: "/images/products/training-mat.jpg",
      category: "Equipment",
      affiliateCommission: 15,
      provider: {
        name: "FitGear Pro",
        id: "store1"
      }
    },
    {
      id: "p2",
      name: "Recovery Protein Bundle",
      description: "Premium protein powder with BCAA supplement",
      price: 129.99,
      image: "/images/products/protein-bundle.jpg",
      category: "Nutrition",
      affiliateCommission: 20,
      provider: {
        name: "NutriLife",
        id: "store2"
      }
    }
  ],
  affiliateServices: [
    {
      id: "s1",
      name: "Sports Massage Therapy",
      description: "Professional sports massage for recovery and performance",
      provider: {
        name: "Wellness Massage Center",
        id: "service1",
        image: "/images/providers/massage-center.jpg"
      },
      category: "Recovery",
      affiliateCommission: 10
    },
    {
      id: "s2",
      name: "Nutrition Consultation",
      description: "Personalized nutrition planning and guidance",
      provider: {
        name: "Sydney Nutrition Clinic",
        id: "service2",
        image: "/images/providers/nutrition-clinic.jpg"
      },
      category: "Nutrition",
      affiliateCommission: 15
    }
  ],
  expertise: [
    "Strength Training",
    "Weight Loss",
    "Sports Performance",
    "Rehabilitation"
  ],
  certifications: [
    "Certified Personal Trainer (CPT)",
    "Strength & Conditioning Specialist",
    "Exercise Rehabilitation Specialist"
  ],
  images: [
    "/images/businesses/elite-performance-1.jpg",
    "/images/businesses/elite-performance-2.jpg",
    "/images/businesses/elite-performance-3.jpg"
  ],
  yearEstablished: 2015,
  teamSize: "5-10 trainers",
  serviceAreas: ["Sydney CBD", "Inner West", "Eastern Suburbs"]
};

export default function BusinessProfile() {
  const [activeTab, setActiveTab] = useState('about');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[300px] bg-black">
        <Image
          src={businessData.images[0]}
          alt={businessData.name}
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{businessData.name}</h1>
              <p className="text-gray-300 text-lg max-w-2xl mb-4">{businessData.description}</p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <StarIcon className="h-6 w-6 text-yellow-400" />
                  <span className="ml-1 text-white font-semibold">{businessData.rating}</span>
                  <span className="ml-1 text-gray-300">({businessData.reviews} reviews)</span>
                </div>
                {businessData.verified && (
                  <div className="flex items-center text-green-400">
                    <CheckBadgeIcon className="h-6 w-6 mr-1" />
                    <span>Verified Business</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Navigation Tabs */}
            <div className="flex space-x-4 mb-8 border-b">
              <button
                className={`pb-4 px-4 ${activeTab === 'about' ? 'border-b-2 border-yellow-500 text-yellow-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('about')}
              >
                About
              </button>
              <button
                className={`pb-4 px-4 ${activeTab === 'services' ? 'border-b-2 border-yellow-500 text-yellow-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('services')}
              >
                Services
              </button>
              <button
                className={`pb-4 px-4 ${activeTab === 'recommendations' ? 'border-b-2 border-yellow-500 text-yellow-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('recommendations')}
              >
                Recommendations
              </button>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-lg shadow-md p-6">
              {activeTab === 'about' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">About Us</h2>
                    <p className="text-gray-600">{businessData.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Our Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {businessData.expertise.map((item) => (
                        <span key={item} className="bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Certifications</h3>
                    <ul className="list-disc list-inside text-gray-600">
                      {businessData.certifications.map((cert) => (
                        <li key={cert}>{cert}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Gallery</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {businessData.images.map((image) => (
                        <div
                          key={image}
                          className="relative h-32 cursor-pointer"
                          onClick={() => setSelectedImage(image)}
                        >
                          <Image
                            src={image}
                            alt="Business"
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'services' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold mb-4">Our Services</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {businessData.services.map((service) => (
                      <div key={service.name} className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                        <p className="text-gray-600 mb-4">{service.description}</p>
                        <p className="text-yellow-600 font-semibold">{service.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'recommendations' && (
                <div className="space-y-8">
                  {/* Recommended Products */}
                  <div>
                    <h2 className="text-2xl font-semibold mb-6">Recommended Products</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {businessData.affiliateProducts.map((product) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
                        >
                          <div className="relative h-48">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-lg font-semibold">{product.name}</h3>
                              <span className="text-yellow-600 font-bold">${product.price}</span>
                            </div>
                            <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">By {product.provider.name}</span>
                              <Link
                                href={`/products/${product.id}?ref=${businessData.id}`}
                                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors"
                              >
                                View Details
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Services */}
                  <div>
                    <h2 className="text-2xl font-semibold mb-6">Complementary Services</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {businessData.affiliateServices.map((service) => (
                        <motion.div
                          key={service.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
                        >
                          <div className="relative h-48">
                            <Image
                              src={service.provider.image}
                              alt={service.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                            <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">By {service.provider.name}</span>
                              <Link
                                href={`/directory/${service.provider.id}?ref=${businessData.id}`}
                                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors"
                              >
                                Learn More
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Affiliate Program Info */}
                  <div className="bg-gray-50 rounded-lg p-6 mt-8">
                    <div className="flex items-center mb-4">
                      <HandThumbUpIcon className="h-6 w-6 text-yellow-600 mr-2" />
                      <h3 className="text-lg font-semibold">Affiliate Partnership</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      These recommendations are part of our affiliate program. When you purchase through these links,
                      you support our business while getting access to trusted products and services we personally recommend.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPinIcon className="h-6 w-6 text-yellow-600 mr-2" />
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-gray-600">
                      {businessData.location.address}<br />
                      {businessData.location.city}, {businessData.location.state} {businessData.location.postcode}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-gray-600">{businessData.contact.phone}</p>
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-600">{businessData.contact.email}</p>
                </div>
                <div>
                  <p className="font-semibold">Website</p>
                  <a href={`https://${businessData.contact.website}`} className="text-yellow-600 hover:underline">
                    {businessData.contact.website}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Business Hours</h2>
              <div className="space-y-2">
                {businessData.hours.map((schedule) => (
                  <div key={schedule.day} className="flex justify-between">
                    <span className="text-gray-600">{schedule.day}</span>
                    <span className="font-semibold">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Service Areas</h2>
              <div className="flex flex-wrap gap-2">
                {businessData.serviceAreas.map((area) => (
                  <span key={area} className="bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-4xl h-[80vh]">
            <Image
              src={selectedImage}
              alt="Gallery"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
} 
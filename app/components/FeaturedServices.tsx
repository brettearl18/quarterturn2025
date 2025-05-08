'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Service {
  id: string;
  category: string;
  title: string;
  description: string;
  provider: string;
  rating: number;
}

const services: Service[] = [
  {
    id: '1',
    category: 'Personal',
    title: 'Personal Training Sessions',
    description: 'One-on-one training with certified professionals',
    provider: 'Elite Performance Training',
    rating: 4.9
  },
  {
    id: '2',
    category: 'Sports',
    title: 'Sports Rehabilitation',
    description: 'Expert rehabilitation services for athletes',
    provider: 'PhysioFlex Rehabilitation',
    rating: 4.8
  },
  {
    id: '3',
    category: 'Nutrition',
    title: 'Nutrition Consultation',
    description: 'Personalized nutrition planning and guidance',
    provider: 'NutriPeak Performance',
    rating: 4.7
  },
  {
    id: '4',
    category: 'Group',
    title: 'Group Fitness Classes',
    description: 'High-energy group workouts for all levels',
    provider: 'Core Power Studio',
    rating: 4.8
  }
];

export default function FeaturedServices() {
  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#76777A] mb-12">
          Featured Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="group rounded-2xl overflow-hidden bg-white shadow-lg flex flex-col h-full"
            >
              {/* Header with gradient background */}
              <div className="relative h-48">
                <div className="absolute inset-0 bg-gradient-to-br from-[#4AC1E0] via-[#E0DF00]/30 to-[#4AC1E0] overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-40 rounded-full bg-white/20 backdrop-blur-sm"></div>
                  </div>
                </div>
                <div className="relative p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {service.category}
                  </h3>
                  <p className="text-white text-lg">
                    {service.title}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {service.description}
                </p>
                
                {/* Provider & Rating */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#4AC1E0] font-medium">{service.provider}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#E0DF00] text-[#E0DF00]" />
                    <span className="text-gray-700">{service.rating}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-auto">
                  <button 
                    className={`w-full ${service.id === '2' ? 'bg-[#E0DF00]' : 'bg-[#4AC1E0]'} hover:bg-[#E0DF00] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200`}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Special Offer Banner */}
        <div className="mt-12 bg-[#4AC1E0] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <span className="text-[#E0DF00] text-4xl font-bold">20% OFF</span>
            <div>
              <h3 className="text-white text-xl font-bold">New Year Special Offer</h3>
              <p className="text-white/80">On all premium fitness equipment</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-white">
              <span className="text-white/80">Use code: </span>
              <span className="font-bold text-[#E0DF00]">FIT2024</span>
            </div>
            <button className="bg-white hover:bg-[#E0DF00] text-[#4AC1E0] hover:text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2">
              Shop Now
              <span className="text-xl">→</span>
            </button>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 bg-[#4AC1E0] rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-2">JOIN TO GET ALL THE LATEST FITNESS NEWS</h3>
          <p className="text-white/80 mb-6">Subscribe to our newsletter and stay updated</p>
          
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-2 border-transparent focus:border-[#E0DF00] outline-none"
            />
            <button className="bg-[#E0DF00] hover:bg-white text-black font-semibold px-8 py-3 rounded-lg transition-colors duration-200">
              SEND
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 
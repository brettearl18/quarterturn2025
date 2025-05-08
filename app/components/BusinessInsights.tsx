'use client';

import { motion } from 'framer-motion';
import { 
  UserGroupIcon, 
  ShoppingBagIcon, 
  BuildingStorefrontIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const stats = [
  {
    id: 1,
    name: 'Active Users',
    value: '50K+',
    icon: UserGroupIcon,
    description: 'Fitness enthusiasts trust our platform'
  },
  {
    id: 2,
    name: 'Products Sold',
    value: '100K+',
    icon: ShoppingBagIcon,
    description: 'Equipment and accessories delivered'
  },
  {
    id: 3,
    name: 'Partner Vendors',
    value: '500+',
    icon: BuildingStorefrontIcon,
    description: 'Quality vendors and service providers'
  },
  {
    id: 4,
    name: 'Customer Rating',
    value: '4.8/5',
    icon: StarIcon,
    description: 'Based on 10,000+ reviews'
  }
];

export default function BusinessInsights() {
  return (
    <section className="py-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4 text-[#76777A]">
          Trusted by the Fitness Community
        </h2>
        <p className="text-[#B1B1B1] max-w-2xl mx-auto">
          Join thousands of fitness enthusiasts and professionals who trust Quarter Turn for their fitness journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
          >
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#4AC1E0] rounded-full opacity-5 -mr-16 -mt-16 group-hover:opacity-10 transition-opacity" />
            
            {/* Icon */}
            <div className="relative mb-4">
              <div className="w-14 h-14 bg-[#4AC1E0] bg-opacity-10 rounded-lg flex items-center justify-center group-hover:bg-opacity-20 transition-all">
                <stat.icon className="w-7 h-7 text-[#4AC1E0]" />
              </div>
            </div>

            {/* Content */}
            <h3 className="text-3xl font-bold mb-2 text-[#4AC1E0]">
              {stat.value}
            </h3>
            <h4 className="text-lg font-semibold mb-2 text-[#76777A]">
              {stat.name}
            </h4>
            <p className="text-[#B1B1B1]">
              {stat.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 
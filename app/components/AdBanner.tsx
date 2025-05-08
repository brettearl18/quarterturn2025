'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function AdBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between px-4 py-6"
        >
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <span className="text-yellow-400 text-4xl font-bold">20%</span>
              <span className="text-white text-lg ml-2">OFF</span>
            </div>
            <div className="text-white">
              <h3 className="text-xl font-semibold">New Year Special Offer</h3>
              <p className="text-white/80">On all premium fitness equipment</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-white text-right">
              <p className="text-sm text-white/80">Limited time offer</p>
              <p className="font-semibold">Use code: <span className="text-yellow-400">FIT2024</span></p>
            </div>
            <Link 
              href="/products"
              className="flex items-center gap-2 bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-yellow-400 hover:text-black transition-all"
            >
              Shop Now
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 
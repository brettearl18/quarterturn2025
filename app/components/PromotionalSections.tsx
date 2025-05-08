'use client';

import { motion } from 'framer-motion';

export default function PromotionalSections() {
  return (
    <div className="space-y-8 px-4 md:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#4AC1E0] rounded-2xl p-8 md:p-12"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              JOIN TO GET ALL THE LATEST FITNESS NEWS
            </h3>
            <p className="text-white/80 mb-8">
              Subscribe to our newsletter and stay updated
            </p>
            
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl border-2 border-transparent focus:border-[#E0DF00] outline-none text-[#76777A] placeholder-[#B1B1B1] bg-white/95"
              />
              <button className="bg-[#E0DF00] hover:bg-white text-[#76777A] font-semibold px-12 py-4 rounded-xl transition-colors duration-200 whitespace-nowrap">
                SEND
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 
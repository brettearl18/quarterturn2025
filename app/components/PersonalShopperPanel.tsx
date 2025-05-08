'use client';

import { UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function PersonalShopperPanel() {
  return (
    <Link href="/personal-shopper">
      <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#4AC1E0] rounded-full opacity-5 -mr-16 -mt-16 group-hover:opacity-10 transition-opacity" />
        
        {/* Icon */}
        <div className="relative mb-4">
          <div className="w-14 h-14 bg-[#4AC1E0] bg-opacity-10 rounded-lg flex items-center justify-center group-hover:bg-opacity-20 transition-all">
            <UserIcon className="w-7 h-7 text-[#4AC1E0]" />
          </div>
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold mb-2 text-[#76777A] group-hover:text-[#4AC1E0] transition-colors">
          PERSONAL SHOPPER
        </h3>
        <p className="text-[#B1B1B1]">
          Get personalized product recommendations based on your needs and preferences
        </p>

        {/* Features */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-[#B1B1B1]">
            <span className="w-2 h-2 bg-[#4AC1E0] rounded-full mr-2"></span>
            Smart recommendations
          </div>
          <div className="flex items-center text-sm text-[#B1B1B1]">
            <span className="w-2 h-2 bg-[#4AC1E0] rounded-full mr-2"></span>
            Tailored to your goals
          </div>
          <div className="flex items-center text-sm text-[#B1B1B1]">
            <span className="w-2 h-2 bg-[#4AC1E0] rounded-full mr-2"></span>
            Expert guidance
          </div>
        </div>
      </div>
    </Link>
  );
} 
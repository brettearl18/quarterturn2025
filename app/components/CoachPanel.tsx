'use client';

import { ChatBubbleLeftRightIcon, ClockIcon, AcademicCapIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function CoachPanel() {
  return (
    <Link href="/coach">
      <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#4AC1E0] rounded-full opacity-5 -mr-16 -mt-16 group-hover:opacity-10 transition-opacity" />
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4 flex items-center bg-green-100 px-2 py-1 rounded-full">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
          <span className="text-xs text-green-700">Coaches Online</span>
        </div>

        {/* Icon */}
        <div className="relative mb-4">
          <div className="w-14 h-14 bg-[#4AC1E0] bg-opacity-10 rounded-lg flex items-center justify-center group-hover:bg-opacity-20 transition-all">
            <ChatBubbleLeftRightIcon className="w-7 h-7 text-[#4AC1E0]" />
          </div>
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold mb-2 text-[#76777A] group-hover:text-[#4AC1E0] transition-colors">
          TALK TO A COACH
        </h3>
        <p className="text-[#B1B1B1]">
          Get instant expert advice from certified fitness professionals
        </p>

        {/* Features */}
        <div className="mt-4 space-y-3">
          <div className="flex items-center text-sm text-[#B1B1B1]">
            <ClockIcon className="w-4 h-4 text-[#4AC1E0] mr-2" />
            24/7 availability
          </div>
          <div className="flex items-center text-sm text-[#B1B1B1]">
            <AcademicCapIcon className="w-4 h-4 text-[#4AC1E0] mr-2" />
            Certified experts
          </div>
          <div className="flex items-center text-sm text-[#B1B1B1]">
            <ChartBarIcon className="w-4 h-4 text-[#4AC1E0] mr-2" />
            Personalized guidance
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-2 gap-2">
          <div className="text-center p-2 bg-[#4AC1E0]/5 rounded-lg">
            <div className="text-sm font-semibold text-[#4AC1E0]">5 min</div>
            <div className="text-xs text-[#B1B1B1]">Avg. Response</div>
          </div>
          <div className="text-center p-2 bg-[#4AC1E0]/5 rounded-lg">
            <div className="text-sm font-semibold text-[#4AC1E0]">1000+</div>
            <div className="text-xs text-[#B1B1B1]">Active Coaches</div>
          </div>
        </div>
      </div>
    </Link>
  );
} 
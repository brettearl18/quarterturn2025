'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import OnlineCoaches from './OnlineCoaches';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex justify-between items-center">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/quarter-turn-logo.png"
              alt="Quarter Turn"
              width={1535}
              height={241}
              className="h-10 w-auto object-contain"
              priority
              unoptimized
            />
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/equipment" className="text-[#76777A] hover:text-[#4AC1E0] transition-colors">
              Equipment
            </Link>
            <Link href="/apparel" className="text-[#76777A] hover:text-[#4AC1E0] transition-colors">
              Apparel
            </Link>
            <Link href="/supplements" className="text-[#76777A] hover:text-[#4AC1E0] transition-colors">
              Supplements
            </Link>
            <Link href="/accessories" className="text-[#76777A] hover:text-[#4AC1E0] transition-colors">
              Accessories
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <OnlineCoaches />
            <button 
              onClick={() => window.location.href = '/personal-shopper'}
              className="text-[#4AC1E0] hover:text-[#E0DF00] transition-colors px-4 py-2 border border-[#4AC1E0] hover:border-[#E0DF00] rounded-lg flex items-center space-x-2"
            >
              <ChatBubbleLeftIcon className="h-5 w-5" />
              <span>Personal Shopper</span>
            </button>
            <button className="text-[#76777A] hover:text-[#4AC1E0] transition-colors">
              <ShoppingBagIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
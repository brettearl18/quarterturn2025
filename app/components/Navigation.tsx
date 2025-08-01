'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HiMagnifyingGlass, HiShoppingCart, HiUser, HiBars3, HiXMark } from 'react-icons/hi2';
import ConnectWithCoach from './ConnectWithCoach';
import { UserIcon } from 'lucide-react';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCoachModalOpen, setIsCoachModalOpen] = useState(false);

  const handleCoachConnect = (data: any) => {
    console.log('Coach connection data:', data);
    setIsCoachModalOpen(false);
    // Handle the coach connection - you can add your logic here
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="Quarter Turn"
                width={150}
                height={40}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Logo is already the Home link */}
              <Link href="/products" className="text-gray-300 hover:text-yellow-400 transition-colors">
                Products
              </Link>
              <Link href="/services" className="text-gray-300 hover:text-yellow-400 transition-colors">
                Services
              </Link>
              <Link
                href="/find-a-coach"
                className="bg-yellow-400 text-black px-5 py-2 rounded-lg font-bold shadow hover:bg-yellow-300 transition-colors border-2 border-yellow-500 animate-pulse text-lg"
              >
                Find a Coach
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              {/* Personal AI Shopper Button */}
              <Link
                href="/personal-shopper"
                className="bg-gradient-to-r from-[#4AC1E0] to-blue-400 text-white px-5 py-2 rounded-xl font-semibold shadow-lg hover:from-blue-400 hover:to-[#4AC1E0] transition-colors flex items-center space-x-2 text-base border-2 border-[#4AC1E0]"
              >
                <HiMagnifyingGlass className="h-5 w-5" />
                <span>Personal AI Shopper</span>
              </Link>

              {/* Connect with Coach Button */}
              <button
                onClick={() => setIsCoachModalOpen(true)}
                className="bg-gradient-to-r from-[#4AC1E0] to-blue-400 text-white px-5 py-2 rounded-xl font-semibold shadow-lg hover:from-blue-400 hover:to-[#4AC1E0] transition-colors flex items-center space-x-2 text-base border-2 border-[#4AC1E0]"
              >
                <UserIcon className="h-5 w-5" />
                <span>Connect with Coach</span>
              </button>

              {/* Right side icons */}
              <button className="text-gray-300 hover:text-[#4AC1E0] transition-colors">
                <HiShoppingCart className="h-5 w-5" />
              </button>
              <button className="text-gray-300 hover:text-[#4AC1E0] transition-colors">
                <HiUser className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-yellow-400 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <HiXMark className="h-6 w-6" />
                ) : (
                  <HiBars3 className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-black/95"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {/* Logo is already the Home link */}
              <Link
                href="/products"
                className="block px-3 py-2 text-gray-300 hover:text-yellow-400 transition-colors"
              >
                Products
              </Link>
              <Link
                href="/services"
                className="block px-3 py-2 text-gray-300 hover:text-yellow-400 transition-colors"
              >
                Services
              </Link>
              <Link
                href="/find-a-coach"
                className="block w-full px-3 py-2 mt-2 text-center bg-yellow-400 text-black rounded-lg font-bold shadow hover:bg-yellow-300 transition-colors border-2 border-yellow-500 animate-pulse text-lg"
              >
                Find a Coach
              </Link>
              {/* Personal AI Shopper Button in mobile menu */}
              <Link
                href="/personal-shopper"
                className="block w-full px-3 py-2 mt-2 text-center bg-gradient-to-r from-[#4AC1E0] to-blue-400 text-white rounded-xl font-semibold shadow-lg hover:from-blue-400 hover:to-[#4AC1E0] transition-colors flex items-center justify-center gap-2 text-base border-2 border-[#4AC1E0]"
              >
                <HiMagnifyingGlass className="h-5 w-5" />
                <span>Personal AI Shopper</span>
              </Link>
              {/* Connect with Coach Button in mobile menu */}
              <button
                onClick={() => setIsCoachModalOpen(true)}
                className="block w-full px-3 py-2 mt-2 text-center bg-gradient-to-r from-[#4AC1E0] to-blue-400 text-white rounded-xl font-semibold shadow-lg hover:from-blue-400 hover:to-[#4AC1E0] transition-colors flex items-center justify-center gap-2 text-base border-2 border-[#4AC1E0]"
              >
                <UserIcon className="h-5 w-5" />
                <span>Connect with Coach</span>
              </button>
            </div>
          </motion.div>
        )}
      </nav>
      {/* Coach Connection Modal (rendered outside nav for proper overlay) */}
      {isCoachModalOpen && (
        <ConnectWithCoach
          onSubmit={handleCoachConnect}
          onClose={() => setIsCoachModalOpen(false)}
        />
      )}
    </>
  );
} 
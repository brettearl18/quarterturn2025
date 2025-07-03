'use client';

import { SparklesIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div 
        className="relative h-[600px] w-full bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/hero-bg.jpg)',
          backgroundPosition: 'center 30%'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        <div className="relative max-w-7xl mx-auto h-full px-4 md:px-8">
          <div className="h-full flex items-center">
            {/* Left Side - Hero Text */}
            <div className="max-w-lg text-white">
              <h1 className="text-6xl font-bold mb-6">
                YOUR PLACE TO
                <br />
                <span className="text-primary">
                  SHOP
                </span>
              </h1>
              <p className="text-xl mb-10 text-gray-100">
                Premium fitness equipment, expert guidance, and
                everything you need to build your strength journey.
              </p>
              <div className="flex gap-6 flex-wrap">
                <Link 
                  href="/products"
                  className="bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-dark transition-colors"
                >
                  Explore Equipment
                </Link>
                <Link 
                  href="/services"
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-primary hover:text-white transition-colors"
                >
                  View Services
                </Link>
                <Link
                  href="/find-a-coach"
                  className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold shadow hover:bg-yellow-300 transition-colors border-2 border-yellow-500 animate-pulse"
                >
                  Online Directory
                </Link>
                <Link
                  href="/find-a-gym"
                  className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold shadow hover:bg-yellow-300 transition-colors border-2 border-yellow-500"
                >
                  Find a Gym
                </Link>
                <Link
                  href="https://www.figma.com/file/coach-profile-v2-quarter-turn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-colors border border-white/20"
                >
                  View Wireframe
                </Link>
              </div>
            </div>

            {/* Right Side - AI Search */}
            <div className="absolute left-1/2 w-[500px] bg-black/30 backdrop-blur-sm rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <SparklesIcon className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold text-white">Find Anything - Just Ask</h2>
              </div>
              <div className="relative">
                <textarea
                  placeholder="Try asking: • What equipment do I need for a home gym? • Show me cardio equipment under $1000 • Find strength training gear for beginners"
                  className="w-full h-[180px] px-4 py-4 bg-white/10 rounded-xl border border-white/20 placeholder-gray-400 text-white resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button className="w-full mt-4 bg-primary text-white py-4 rounded-xl font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2">
                  <SparklesIcon className="h-5 w-5" />
                  Search with QTM.AI
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Banner: Sign up as a Coach */}
      <div className="w-full bg-gradient-to-r from-yellow-400 to-yellow-300 py-8 flex justify-center items-center shadow-lg">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="text-2xl md:text-3xl font-bold text-gray-900 text-center md:text-left">
            Are you a health or fitness professional?
          </div>
          <a
            href="/auth/signup/coach"
            className="flex items-center gap-2 bg-black text-yellow-300 px-8 py-4 rounded-full font-bold text-lg shadow hover:bg-gray-900 transition-colors border-2 border-yellow-500 mt-4 md:mt-0"
          >
            Sign up as a Coach
            <ArrowRightIcon className="h-6 w-6" />
          </a>
        </div>
      </div>
    </div>
  );
} 
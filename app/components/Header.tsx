'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuthContext } from './AuthProvider';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuthContext();

  return (
    <header className="bg-black text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            QUARTER TURN
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/categories" className="hover:text-yellow-400 transition-colors">Categories</Link>
            <Link href="/products" className="hover:text-yellow-400 transition-colors">Products</Link>
            <Link href="/directory" className="hover:text-yellow-400 transition-colors">Directory</Link>
            <Link href="/services" className="hover:text-yellow-400 transition-colors">Services</Link>
            <Link href="/about" className="hover:text-yellow-400 transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-yellow-400 transition-colors">Contact</Link>
            
            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {user ? (
                <button className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors">
                  Profile
                </button>
              ) : (
                <>
                  <button className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors">
                    Sign In
                  </button>
                  <button className="bg-transparent border border-yellow-400 text-yellow-400 px-4 py-2 rounded-md hover:bg-yellow-400 hover:text-black transition-colors">
                    Register
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link href="/categories" className="block hover:text-yellow-400 transition-colors">Categories</Link>
            <Link href="/products" className="block hover:text-yellow-400 transition-colors">Products</Link>
            <Link href="/directory" className="block hover:text-yellow-400 transition-colors">Directory</Link>
            <Link href="/services" className="block hover:text-yellow-400 transition-colors">Services</Link>
            <Link href="/about" className="block hover:text-yellow-400 transition-colors">About Us</Link>
            <Link href="/contact" className="block hover:text-yellow-400 transition-colors">Contact</Link>
            
            <div className="flex flex-col space-y-2 pt-4">
              {user ? (
                <button className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors">
                  Profile
                </button>
              ) : (
                <>
                  <button className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors">
                    Sign In
                  </button>
                  <button className="bg-transparent border border-yellow-400 text-yellow-400 px-4 py-2 rounded-md hover:bg-yellow-400 hover:text-black transition-colors">
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
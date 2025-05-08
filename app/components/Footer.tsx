'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* About Us */}
          <div>
            <h3 className="font-bold text-lg mb-4">ABOUT US</h3>
            <ul className="space-y-3">
              <li><Link href="/our-story" className="text-gray-300 hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="/team" className="text-gray-300 hover:text-white transition-colors">Team</Link></li>
              <li><Link href="/careers" className="text-gray-300 hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/press" className="text-gray-300 hover:text-white transition-colors">Press</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-lg mb-4">CUSTOMER SERVICE</h3>
            <ul className="space-y-3">
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="text-gray-300 hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns" className="text-gray-300 hover:text-white transition-colors">Returns</Link></li>
              <li><Link href="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Vendors */}
          <div>
            <h3 className="font-bold text-lg mb-4">VENDORS</h3>
            <ul className="space-y-3">
              <li><Link href="/become-vendor" className="text-gray-300 hover:text-white transition-colors">Become a Vendor</Link></li>
              <li><Link href="/vendor-login" className="text-gray-300 hover:text-white transition-colors">Vendor Login</Link></li>
              <li><Link href="/vendor/dashboard" className="text-gray-300 hover:text-white transition-colors">Stock Management</Link></li>
              <li><Link href="/terms" className="text-gray-300 hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/vendor-support" className="text-gray-300 hover:text-white transition-colors">Vendor Support</Link></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="font-bold text-lg mb-4">FOLLOW US</h3>
            <div className="flex gap-4">
              <Link 
                href="https://facebook.com" 
                target="_blank"
                className="text-gray-300 hover:text-[#4AC1E0] transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </Link>
              <Link 
                href="https://instagram.com" 
                target="_blank"
                className="text-gray-300 hover:text-[#4AC1E0] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </Link>
              <Link 
                href="https://twitter.com" 
                target="_blank"
                className="text-gray-300 hover:text-[#4AC1E0] transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm">
          © 2025 Quarter Turn Marketplace. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  StarIcon
} from '@heroicons/react/24/outline';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  featured: boolean;
  image: string;
  tags: string[];
}

const products: Product[] = [
  {
    id: 'adjustable-dumbbell-set',
    name: 'Adjustable Dumbbell Set',
    description: 'Space-saving adjustable dumbbells with quick weight change mechanism',
    price: 299.99,
    originalPrice: 399.99,
    category: 'Gym Equipment',
    rating: 4.8,
    reviews: 256,
    inStock: true,
    featured: true,
    image: '/images/products/dumbbells.jpg',
    tags: ['strength', 'home gym', 'adjustable']
  },
  {
    id: 'premium-yoga-mat',
    name: 'Premium Yoga Mat',
    description: 'Extra thick, non-slip yoga mat with alignment markings',
    price: 89.99,
    originalPrice: 119.99,
    category: 'Accessories',
    rating: 4.7,
    reviews: 189,
    inStock: true,
    featured: false,
    image: '/images/products/yoga-mat.jpg',
    tags: ['yoga', 'exercise mat', 'non-slip']
  },
  {
    id: 'resistance-bands-set',
    name: 'Resistance Bands Set',
    description: 'Complete set of resistance bands with different strength levels',
    price: 34.99,
    originalPrice: 49.99,
    category: 'Accessories',
    rating: 4.6,
    reviews: 312,
    inStock: true,
    featured: true,
    image: '/images/products/resistance-bands.jpg',
    tags: ['strength', 'home gym', 'portable']
  }
  // Add more products as needed
];

const categories = ['All', 'Gym Equipment', 'Accessories', 'Apparel', 'Supplements'];
const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Best Rating', 'Most Reviews'];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'Price: Low to High':
          return a.price - b.price;
        case 'Price: High to Low':
          return b.price - a.price;
        case 'Best Rating':
          return b.rating - a.rating;
        case 'Most Reviews':
          return b.reviews - a.reviews;
        default:
          return b.featured ? 1 : -1;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Shop Premium Fitness Equipment
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              High-quality gear to support your fitness journey
            </p>
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-full bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4AC1E0]"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters and Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4AC1E0]"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4AC1E0]"
              >
                {sortOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-[#4AC1E0] text-white rounded-lg hover:bg-[#4AC1E0]/90 transition-colors"
            >
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                >
                  <div className="aspect-square relative bg-gradient-to-br from-[#4AC1E0] via-[#E0DF00]/30 to-[#4AC1E0] overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm"></div>
                    </div>
                    {product.featured && (
                      <div className="absolute top-4 left-4 bg-[#4AC1E0] text-white px-3 py-1 rounded-full text-sm">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-1 mb-2">
                      <StarIcon className="w-5 h-5 text-yellow-400" />
                      <span className="text-gray-600">{product.rating}</span>
                      <span className="text-gray-400">({product.reviews})</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-bold text-[#4AC1E0]">${product.price}</span>
                        {product.originalPrice && (
                          <span className="ml-2 text-sm text-gray-400 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      <button className="px-4 py-2 bg-[#4AC1E0] text-white rounded-lg hover:bg-[#4AC1E0]/90 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 
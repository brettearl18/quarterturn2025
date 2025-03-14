'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Premium Barbell Set',
    category: 'Weight Training',
    price: 299.99,
    description: 'Professional grade Olympic barbell with weight plates'
  },
  {
    id: '2',
    name: 'Adjustable Dumbbell Set',
    category: 'Weight Training',
    price: 199.99,
    description: 'Space-saving adjustable dumbbells from 5-50 lbs'
  },
  {
    id: '3',
    name: 'Competition Kettlebell',
    category: 'Functional Training',
    price: 89.99,
    description: 'Professional grade kettlebell for dynamic workouts'
  },
  {
    id: '4',
    name: 'Power Rack',
    category: 'Weight Training',
    price: 599.99,
    description: 'Heavy-duty power rack for safe weight training'
  },
  {
    id: '5',
    name: 'Resistance Band Set',
    category: 'Accessories',
    price: 29.99,
    description: 'Complete set of resistance bands for versatile training'
  },
  {
    id: '6',
    name: 'Foam Roller',
    category: 'Recovery',
    price: 34.99,
    description: 'High-density foam roller for muscle recovery'
  }
];

export default function ProductGallery() {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Shop Equipment</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Discover premium fitness equipment designed for your strength journey. Every piece is carefully selected for quality and performance.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button className="px-4 py-2 border rounded-full hover:bg-gray-50 text-sm font-medium">
                Filter
              </button>
              <div className="relative flex-grow md:flex-grow-0">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <select className="px-4 py-2 border rounded-full bg-white text-sm font-medium cursor-pointer">
                <option value="">Category</option>
                <option value="weight-training">Weight Training</option>
                <option value="functional-training">Functional Training</option>
                <option value="accessories">Accessories</option>
                <option value="recovery">Recovery</option>
              </select>
              <select className="px-4 py-2 border rounded-full bg-white text-sm font-medium cursor-pointer">
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2/3 h-2/3 bg-gray-200 rounded-lg transition-transform group-hover:scale-110" />
                </div>
                {hoveredProduct === product.id && (
                  <div className="absolute inset-x-0 bottom-4 flex justify-center">
                    <button className="bg-white text-gray-900 px-6 py-2 rounded-full text-sm font-medium shadow-lg hover:bg-gray-50 transition-colors">
                      Quick View
                    </button>
                  </div>
                )}
              </div>
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-base font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                  <span className="text-base font-medium text-gray-900">
                    ${product.price}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <Link
                    href={`/products/${product.id}`}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View Details
                  </Link>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
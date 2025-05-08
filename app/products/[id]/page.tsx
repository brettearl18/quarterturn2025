'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  StarIcon,
  HeartIcon,
  ShareIcon,
  ShoppingCartIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface ProductDetails {
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
  features: string[];
  specifications: Record<string, string>;
  relatedProducts: string[];
}

// This would typically come from an API or database
const product: ProductDetails = {
  id: 'adjustable-dumbbell-set',
  name: 'Adjustable Dumbbell Set',
  description: 'Space-saving adjustable dumbbells with quick weight change mechanism. Perfect for home gyms and versatile workouts. Features a durable construction and easy-to-use weight selection system.',
  price: 299.99,
  originalPrice: 399.99,
  category: 'Gym Equipment',
  rating: 4.8,
  reviews: 256,
  inStock: true,
  featured: true,
  image: '/images/products/dumbbells.jpg',
  tags: ['strength', 'home gym', 'adjustable'],
  features: [
    'Quick-change weight selection system',
    'Space-saving design',
    'Durable construction',
    'Weight range: 5-52.5 lbs per dumbbell',
    'Ergonomic handle design'
  ],
  specifications: {
    'Weight Range': '5-52.5 lbs per dumbbell',
    'Increment': '2.5 lbs',
    'Material': 'Steel with rubber coating',
    'Handle': 'Knurled steel',
    'Dimensions': '16.9" x 8.3" x 9.5"',
    'Weight': '52.5 lbs each'
  },
  relatedProducts: ['premium-yoga-mat', 'resistance-bands-set']
};

export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [showReviews, setShowReviews] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');

  const handleAddToCart = () => {
    // Implement cart functionality
    console.log('Adding to cart:', {
      product: product.id,
      quantity: selectedQuantity
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="text-sm">
          <Link href="/products" className="text-gray-500 hover:text-[#4AC1E0]">
            Products
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-[#4AC1E0]">{product.name}</span>
        </nav>
      </div>

      {/* Product Details */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-square relative bg-gradient-to-br from-[#4AC1E0] via-[#E0DF00]/30 to-[#4AC1E0] rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 rounded-full bg-white/20 backdrop-blur-sm"></div>
            </div>
            {product.featured && (
              <div className="absolute top-4 left-4 bg-[#4AC1E0] text-white px-3 py-1 rounded-full text-sm">
                Featured
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                <StarIcon className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-600">{product.rating}</span>
                <span className="text-gray-400">({product.reviews} reviews)</span>
              </div>
              <button
                onClick={() => setShowReviews(!showReviews)}
                className="text-[#4AC1E0] hover:underline"
              >
                Read Reviews
              </button>
            </div>

            <p className="text-gray-600 mb-8">{product.description}</p>

            <div className="mb-8">
              <span className="text-3xl font-bold text-[#4AC1E0]">${product.price}</span>
              {product.originalPrice && (
                <span className="ml-3 text-lg text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <div className="flex gap-4 mb-8">
              <select
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4AC1E0]"
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-[#4AC1E0] text-white px-6 py-2 rounded-lg hover:bg-[#4AC1E0]/90 transition-colors"
              >
                <ShoppingCartIcon className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="p-2 rounded-lg border border-gray-200 hover:border-[#4AC1E0] transition-colors">
                <HeartIcon className="w-6 h-6 text-gray-600" />
              </button>
              <button className="p-2 rounded-lg border border-gray-200 hover:border-[#4AC1E0] transition-colors">
                <ShareIcon className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-white shadow-sm">
                <TruckIcon className="w-6 h-6 text-[#4AC1E0]" />
                <div>
                  <h4 className="font-semibold">Free Shipping</h4>
                  <p className="text-sm text-gray-500">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-white shadow-sm">
                <ShieldCheckIcon className="w-6 h-6 text-[#4AC1E0]" />
                <div>
                  <h4 className="font-semibold">2 Year Warranty</h4>
                  <p className="text-sm text-gray-500">Full coverage</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-white shadow-sm">
                <ArrowPathIcon className="w-6 h-6 text-[#4AC1E0]" />
                <div>
                  <h4 className="font-semibold">30 Day Returns</h4>
                  <p className="text-sm text-gray-500">Money back guarantee</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features and Specifications */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Features */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Features</h2>
            <ul className="space-y-4">
              {product.features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-[#4AC1E0]" />
                  <span className="text-gray-600">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Specifications */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Specifications</h2>
            <div className="space-y-4">
              {Object.entries(product.specifications).map(([key, value], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between py-2 border-b border-gray-200"
                >
                  <span className="text-gray-600">{key}</span>
                  <span className="font-medium text-gray-800">{value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <div className="border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8 border-b mb-8">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-4 font-medium ${
                activeTab === 'description'
                  ? 'border-b-2 border-[#4AC1E0] text-gray-900'
                  : 'text-gray-500'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-4 font-medium ${
                activeTab === 'specs'
                  ? 'border-b-2 border-[#4AC1E0] text-gray-900'
                  : 'text-gray-500'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 font-medium ${
                activeTab === 'reviews'
                  ? 'border-b-2 border-[#4AC1E0] text-gray-900'
                  : 'text-gray-500'
              }`}
            >
              Reviews ({product.reviews})
            </button>
          </div>

          {/* Tab Content */}
          <div className="max-w-3xl">
            {activeTab === 'description' && (
              <div className="prose text-gray-600">
                <p>{product.description}</p>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="border-b pb-4">
                    <div className="text-sm text-gray-500 mb-1">{key}</div>
                    <div className="font-medium text-gray-800">{value}</div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="text-center py-8">
                <p className="text-gray-600">Reviews coming soon!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.relatedProducts.map((relatedProductId) => (
              <Link key={relatedProductId} href={`/products/${relatedProductId}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="aspect-square relative bg-gradient-to-br from-[#4AC1E0] via-[#E0DF00]/30 to-[#4AC1E0] overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm"></div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-2">{relatedProductId.split('-').join(' ').toUpperCase()}</h3>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#4AC1E0]">View Details</span>
                      <div className="flex items-center">
                        <StarIconSolid className="h-5 w-5 text-yellow-400" />
                        <span className="ml-1">4.8</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
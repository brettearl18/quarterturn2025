'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  features: string[];
  specs: { [key: string]: string };
  stock: number;
  images: string[];
  rating: number;
  reviews: Review[];
}

interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

const product: Product = {
  id: '1',
  name: 'Premium Barbell Set',
  category: 'Weight Training',
  price: 299.99,
  description: 'Professional grade Olympic barbell with weight plates. Perfect for serious lifters and commercial gyms. Features precision knurling, smooth spin, and high weight capacity.',
  features: [
    'Olympic standard 20kg barbell',
    'Precision knurling for optimal grip',
    'High-grade steel construction',
    'Smooth bearing rotation',
    'Chrome finish for durability',
    'Includes spring collars'
  ],
  specs: {
    'Weight': '20kg (bar only)',
    'Length': '2.2m',
    'Shaft Diameter': '28mm',
    'Weight Capacity': '680kg',
    'Finish': 'Chrome',
    'Warranty': '5 years'
  },
  stock: 15,
  images: [
    '/images/products/barbell-1.jpg',
    '/images/products/barbell-2.jpg',
    '/images/products/barbell-3.jpg',
    '/images/products/barbell-4.jpg'
  ],
  rating: 4.8,
  reviews: [
    {
      id: '1',
      userName: 'John D.',
      rating: 5,
      date: '2024-02-15',
      comment: 'Excellent quality barbell. The knurling is perfect and the spin is smooth.',
      verified: true
    },
    {
      id: '2',
      userName: 'Sarah M.',
      rating: 4,
      date: '2024-02-10',
      comment: 'Great product, but a bit pricey. The quality is worth it though.',
      verified: true
    }
  ]
};

const recommendedProducts = [
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
  }
];

export default function ProductPage() {
  const [selectedTab, setSelectedTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
    // Here you would typically call your cart management function
  };

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-2 text-sm text-gray-600">({product.reviews.length} reviews)</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/products" className="text-gray-600 hover:text-gray-900">Products</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <motion.div 
                className="h-full flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`w-full h-full relative ${
                  selectedImage === 0 ? 'bg-blue-100' :
                  selectedImage === 1 ? 'bg-green-100' :
                  selectedImage === 2 ? 'bg-yellow-100' :
                  'bg-red-100'
                }`}>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                    <div className={`w-32 h-32 rounded-full mb-4 ${
                      selectedImage === 0 ? 'bg-blue-500' :
                      selectedImage === 1 ? 'bg-green-500' :
                      selectedImage === 2 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}></div>
                    <span className="text-gray-600 font-medium">Premium Barbell Set</span>
                    <span className="text-sm text-gray-500 mt-2">View {selectedImage + 1}</span>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[0, 1, 2, 3].map((index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-md overflow-hidden transition-all ${
                    selectedImage === index ? 'ring-2 ring-blue-500 scale-95' : 'hover:scale-105'
                  }`}
                >
                  <div className={`h-full w-full ${
                    index === 0 ? 'bg-blue-100' :
                    index === 1 ? 'bg-green-100' :
                    index === 2 ? 'bg-yellow-100' :
                    'bg-red-100'
                  } flex items-center justify-center`}>
                    <div className={`w-8 h-8 rounded-full ${
                      index === 0 ? 'bg-blue-500' :
                      index === 1 ? 'bg-green-500' :
                      index === 2 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}></div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <StarRating rating={product.rating} />
            <div className="flex items-center space-x-4 mt-4 mb-6">
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              <span className={`px-3 py-1 rounded-full text-sm ${
                product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {product.stock > 0 ? `In stock (${product.stock} available)` : 'Out of stock'}
              </span>
            </div>
            
            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 mb-6">
              <label className="text-gray-700">Quantity:</label>
              <div className="flex items-center border rounded-lg">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 border-r hover:bg-gray-50 transition-colors"
                >
                  -
                </button>
                <span className="px-6 py-2">{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 py-2 border-l hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-full font-medium transition-colors mb-8 ${
                isAddedToCart
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
              whileTap={{ scale: 0.95 }}
            >
              {isAddedToCart ? 'Added to Cart!' : 'Add to Cart'}
            </motion.button>

            {/* Tabs */}
            <div className="border-b mb-6">
              <div className="flex space-x-8">
                {['description', 'specs', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab as typeof selectedTab)}
                    className={`pb-4 font-medium capitalize ${
                      selectedTab === tab
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {selectedTab === 'description' && (
                <div>
                  <p className="text-gray-600 mb-6">{product.description}</p>
                  <h3 className="font-medium text-gray-900 mb-4">Key Features</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedTab === 'specs' && (
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="border-b pb-4">
                      <dt className="font-medium text-gray-900">{key}</dt>
                      <dd className="text-gray-600 mt-1">{value}</dd>
                    </div>
                  ))}
                </div>
              )}

              {selectedTab === 'reviews' && (
                <div className="space-y-8">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="font-medium text-gray-900">{review.userName}</span>
                          {review.verified && (
                            <span className="ml-2 text-xs text-green-600">Verified Purchase</span>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <StarRating rating={review.rating} />
                      <p className="mt-2 text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Recommended Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recommendedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-square bg-gray-100 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2/3 h-2/3 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                  <span className="font-medium text-gray-900">${product.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
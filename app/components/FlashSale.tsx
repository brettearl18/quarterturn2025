'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  stock?: number;
}

const products: Product[] = [
  {
    id: '1',
    title: 'Premium Adjustable Dumbbell Set',
    price: 299.99,
    originalPrice: 499.99,
    discount: 40,
    image: '/images/products/dumbbell-set.jpg',
    stock: 8
  },
  {
    id: '2',
    title: 'Smart Fitness Tracker Pro',
    price: 149.99,
    originalPrice: 249.99,
    discount: 40,
    image: '/images/products/fitness-tracker.jpg',
    stock: 4
  },
  {
    id: '3',
    title: 'Performance Training Set',
    price: 89.99,
    originalPrice: 159.99,
    discount: 44,
    image: '/images/products/training-set.jpg'
  },
  {
    id: '4',
    title: 'Premium Whey Protein',
    price: 54.99,
    originalPrice: 79.99,
    discount: 31,
    image: '/images/products/whey-protein.jpg',
    stock: 3
  }
];

export default function FlashSale() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#4AC1E0 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-4 md:px-8">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-center mb-12"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
              Flash Sale
              <span className="text-[#4AC1E0]">.</span>
            </h2>
            <p className="text-gray-600 text-lg">Get our special discount before it's gone!</p>
          </div>

          {/* Timer */}
          <div className="flex gap-4 mt-6 md:mt-0">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-4 text-center min-w-[90px] shadow-lg border border-gray-100"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-[#4AC1E0] to-[#E0DF00] bg-clip-text text-transparent">
                {timeLeft.hours.toString().padStart(2, '0')}
              </div>
              <div className="text-sm font-medium text-gray-500">Hours</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-4 text-center min-w-[90px] shadow-lg border border-gray-100"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-[#4AC1E0] to-[#E0DF00] bg-clip-text text-transparent">
                {timeLeft.minutes.toString().padStart(2, '0')}
              </div>
              <div className="text-sm font-medium text-gray-500">Minutes</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-4 text-center min-w-[90px] shadow-lg border border-gray-100"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-[#4AC1E0] to-[#E0DF00] bg-clip-text text-transparent">
                {timeLeft.seconds.toString().padStart(2, '0')}
              </div>
              <div className="text-sm font-medium text-gray-500">Seconds</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-[#4AC1E0] via-[#E0DF00]/50 to-[#4AC1E0] overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm"></div>
                  </div>
                </div>
                <div className="absolute top-4 left-4 z-10">
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-[#E0DF00] text-gray-800 font-bold px-3 py-1 rounded-full text-sm shadow-md"
                  >
                    FLASH SALE
                  </motion.span>
                </div>
                <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-2">
                  {product.stock && product.stock <= 5 && (
                    <motion.span 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-[#4AC1E0] text-white px-3 py-1 rounded-full text-sm shadow-md"
                    >
                      Only {product.stock} left!
                    </motion.span>
                  )}
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-[#E0DF00] text-gray-800 px-3 py-1 rounded-full text-sm font-bold shadow-md"
                  >
                    {product.discount}% OFF
                  </motion.span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[#4AC1E0] mb-2">
                  {product.title}
                </h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-gray-800">${product.price}</span>
                  <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#4AC1E0] hover:bg-[#E0DF00] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl"
                >
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 
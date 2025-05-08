'use client';

import Link from 'next/link';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const products = [
  {
    id: 1,
    title: 'Smart Watch',
    price: 300.98,
    originalPrice: 350.99,
    rating: 4,
    soldCount: '4.3m'
  },
  {
    id: 2,
    title: 'Full Set iPad Devices',
    price: 899.43,
    rating: 3,
    soldCount: '5.4m'
  },
  {
    id: 3,
    title: 'AirPods',
    price: 544.05,
    originalPrice: 650.98,
    rating: 5,
    soldCount: '5.5m'
  },
  {
    id: 4,
    title: 'Smartphone',
    price: 76.87,
    rating: 4,
    soldCount: '6.2m'
  }
];

export default function TopSelectedProducts() {
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <StarIcon
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-[#FF5722]' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">
              Top 10 Selected Products On
              <br />
              the Week
            </h2>
          </div>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
              <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
            </button>
            <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
              <ChevronRightIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link 
              key={product.id}
              href={`/products/${product.id}`}
              className="bg-white rounded-lg p-4 group hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square relative mb-4 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="w-3/4 h-3/4 bg-[#FF5722] rounded-full opacity-20 group-hover:opacity-30 transition-opacity" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  {product.soldCount} sold
                </p>
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-[#FF5722] font-semibold">
                    ${product.price}
                  </p>
                  {product.originalPrice && (
                    <p className="text-gray-500 line-through text-sm">
                      ${product.originalPrice}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 
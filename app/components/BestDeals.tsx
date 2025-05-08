'use client';

import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/solid';

const deals = [
  {
    id: 1,
    title: 'Fitness and activity Tracker',
    price: 33.30,
    rating: 4,
    reviews: 12
  },
  {
    id: 2,
    title: 'Xbox White Joystick',
    price: 98.40,
    rating: 4,
    reviews: 12
  },
  {
    id: 3,
    title: 'Super Boost Headphones',
    price: 33.30,
    rating: 4,
    reviews: 12
  },
  {
    id: 4,
    title: 'Ice White Airpods',
    price: 521.30,
    rating: 4,
    reviews: 12
  },
  {
    id: 5,
    title: 'Hazor Mouse Gaming',
    price: 21.30,
    rating: 4,
    reviews: 12
  }
];

export default function BestDeals() {
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
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Best Deals</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {deals.map((deal) => (
            <Link 
              key={deal.id}
              href={`/products/${deal.id}`}
              className="group"
            >
              <div className="bg-gray-100 rounded-lg p-4 aspect-square mb-4 relative">
                <div className="w-full h-full bg-[#FF5722] rounded-full opacity-20 group-hover:opacity-30 transition-opacity" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                  {deal.title}
                </h3>
                <div className="flex items-center gap-1 mb-2">
                  {renderStars(deal.rating)}
                  <span className="text-sm text-gray-500">({deal.reviews})</span>
                </div>
                <p className="text-[#FF5722] font-semibold">
                  ${deal.price.toFixed(1)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 
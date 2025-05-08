'use client';

import { TagIcon } from '@heroicons/react/24/outline';

const deals = [
  "🏋️ 30% OFF on all Olympic Weight Sets this week!",
  "🎯 Buy any Bench, get a Resistance Band Set FREE",
  "💪 New Members: Get $50 off your first purchase over $300",
  "🔥 Flash Sale: Kettlebells starting at $29.99",
  "⚡ Limited Time: Free Shipping on orders over $150"
];

export default function NewsTicker() {
  return (
    <div className="bg-black bg-opacity-70 py-2 backdrop-blur-sm">
      <div className="container mx-auto px-8">
        <div className="flex items-center">
          <div className="flex items-center gap-2 text-yellow-400 pr-4 border-r border-white/20">
            <TagIcon className="h-5 w-5" />
            <span className="font-semibold whitespace-nowrap">DEALS</span>
          </div>
          
          <div className="overflow-hidden pl-4 flex-1">
            <div className="animate-ticker inline-flex gap-8 whitespace-nowrap">
              {/* Double the deals for seamless loop */}
              {[...deals, ...deals].map((deal, index) => (
                <span
                  key={index}
                  className="text-white inline-block"
                >
                  {deal}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SparklesIcon } from '@heroicons/react/24/outline';

const news = [
  {
    id: 1,
    text: '🎉 New Year Sale: Up to 50% off on all fitness equipment!',
    link: '/sale'
  },
  {
    id: 2,
    text: '💪 Join our fitness challenge and win amazing prizes',
    link: '/challenge'
  },
  {
    id: 3,
    text: '🌟 Free shipping on orders over $100',
    link: '/shipping'
  },
  {
    id: 4,
    text: '🎯 Personal training sessions: Book 3, get 1 free!',
    link: '/training'
  }
];

export default function NewsTickerBanner() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const scrollWidth = scrollElement.scrollWidth;
    const animate = () => {
      if (!scrollElement) return;
      if (scrollElement.scrollLeft >= scrollWidth / 2) {
        scrollElement.scrollLeft = 0;
      } else {
        scrollElement.scrollLeft += 1;
      }
    };

    const animation = setInterval(animate, 30);
    return () => clearInterval(animation);
  }, []);

  return (
    <div className="bg-[#4AC1E0] text-white py-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center">
          <div className="flex-shrink-0 flex items-center gap-2 pr-6 border-r border-white/20">
            <SparklesIcon className="h-5 w-5" />
            <span className="font-semibold">Latest Updates</span>
          </div>
          <div className="flex-1 overflow-hidden ml-6" ref={scrollRef}>
            <div className="flex gap-12 whitespace-nowrap" style={{ width: '200%' }}>
              {[...news, ...news].map((item, index) => (
                <a
                  key={`${item.id}-${index}`}
                  href={item.link}
                  className="text-white hover:text-yellow-200 transition-colors"
                >
                  {item.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
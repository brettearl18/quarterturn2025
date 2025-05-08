'use client';

import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  isHot?: boolean;
  reviewCount?: number;
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  rating,
  image,
  isHot = false,
  reviewCount = 0,
}: ProductCardProps) {
  return (
    <div className="group relative bg-white rounded-lg p-4 transition-shadow hover:shadow-lg">
      {isHot && (
        <div className="absolute top-3 right-3 bg-secondary text-white text-sm font-medium px-2 py-1 rounded-full">
          HOT
        </div>
      )}
      
      <Link href={`/products/${id}`}>
        <div className="relative aspect-square mb-4 bg-background-light rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-text-primary font-medium line-clamp-2 min-h-[2.5rem]">
            {name}
          </h3>
          
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-4 w-4 ${
                  i < rating ? 'text-rating' : 'text-gray-200'
                }`}
              />
            ))}
            {reviewCount > 0 && (
              <span className="text-text-secondary text-sm ml-1">
                ({reviewCount})
              </span>
            )}
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-secondary font-semibold">
              ${price.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="text-text-secondary text-sm line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>

      <button className="w-full mt-4 bg-primary text-white py-2 rounded-full font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Add to Cart
      </button>
    </div>
  );
} 
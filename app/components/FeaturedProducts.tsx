'use client';

import Link from 'next/link';

const featuredProducts = [
  {
    id: 1,
    title: 'Boxing Gloves Pro',
    category: 'Boxing Equipment',
    price: 49.99,
    originalPrice: 79.99,
    description: 'Professional grade boxing gloves with superior padding and wrist support',
    badge: 'SALE',
    saveAmount: 30.00
  },
  {
    id: 2,
    title: 'Training Shoes X1',
    category: 'Footwear',
    price: 89.99,
    description: 'Versatile training shoes perfect for any workout routine',
    badge: 'NEW'
  },
  {
    id: 3,
    title: 'Kettlebell Set',
    category: 'Strength Training',
    price: 129.99,
    originalPrice: 159.99,
    description: 'Complete kettlebell set for strength and conditioning',
    badge: 'SALE',
    saveAmount: 30.00
  },
  {
    id: 4,
    title: 'Performance Runners',
    category: 'Running Gear',
    price: 119.99,
    description: 'Lightweight running shoes designed for maximum comfort and performance'
  }
];

export default function FeaturedProducts() {
  return (
    <section className="py-12 bg-[#D8D8D6] bg-opacity-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-[#76777A]">Featured Products</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm group hover:shadow-lg transition-shadow flex flex-col h-full">
              {/* Product Image Placeholder */}
              <div className="aspect-[4/3] relative bg-gradient-to-br from-[#4AC1E0] via-[#E0DF00]/50 to-[#4AC1E0] overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm"></div>
                </div>
                {product.badge && (
                  <div className="absolute top-4 right-4 bg-[#E0DF00] text-[#76777A] px-3 py-1 text-sm font-bold rounded-full">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-[#76777A]">{product.title}</h3>
                  <p className="text-[#B1B1B1] text-sm mt-1 line-clamp-2">{product.description}</p>
                </div>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-xl font-bold text-[#4AC1E0]">${product.price}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-sm text-[#B1B1B1] line-through">${product.originalPrice}</span>
                      <span className="text-sm text-[#E0DF00]">Save ${product.saveAmount}</span>
                    </>
                  )}
                </div>

                <div className="mt-auto">
                  <Link 
                    href={`/products/${product.id}`}
                    className="block w-full bg-[#4AC1E0] text-white text-center py-3 rounded-lg hover:bg-[#E0DF00] transition-colors font-semibold"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 
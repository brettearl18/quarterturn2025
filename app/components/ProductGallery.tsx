'use client';

import Link from 'next/link';

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
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Product Gallery</h1>
          <div className="flex gap-4">
            <select className="px-4 py-2 border rounded-lg bg-white">
              <option value="">All Categories</option>
              <option value="weight-training">Weight Training</option>
              <option value="functional-training">Functional Training</option>
              <option value="accessories">Accessories</option>
              <option value="recovery">Recovery</option>
            </select>
            <select className="px-4 py-2 border rounded-lg bg-white">
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="aspect-square bg-gradient-to-br from-[#4AC1E0] via-[#E0DF00]/50 to-[#4AC1E0] rounded-lg overflow-hidden mb-4 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm"></div>
                </div>
                {hoveredProduct === product.id && (
                  <div className="absolute inset-x-0 bottom-4 flex justify-center">
                    <button className="bg-white text-gray-900 px-6 py-2 rounded-full text-sm font-medium shadow-lg hover:bg-gray-50 transition-colors">
                      Quick View
                    </button>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <span className="text-lg font-bold text-blue-600">
                    ${product.price}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <Link
                    href={`/products/${product.id}`}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    View Details
                  </Link>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors">
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
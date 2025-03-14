import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  badge?: string;
}

const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Boxing Gloves Pro',
    price: 49.99,
    compareAtPrice: 79.99,
    image: '/images/products/boxing-gloves.jpg',
    badge: 'SALE'
  },
  {
    id: '2',
    name: 'Training Shoes X1',
    price: 89.99,
    image: '/images/products/training-shoes.jpg',
    badge: 'NEW'
  },
  {
    id: '3',
    name: 'Kettlebell Set',
    price: 129.99,
    compareAtPrice: 159.99,
    image: '/images/products/kettlebell.jpg',
    badge: 'SALE'
  },
  {
    id: '4',
    name: 'Performance Runners',
    price: 119.99,
    image: '/images/products/runners.jpg'
  }
];

export default function FeaturedProducts() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">TRENDING PRODUCTS</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <Link 
              key={product.id}
              href={`/products/${product.id}`}
              className="group"
            >
              <div className="relative aspect-square mb-4 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {product.badge && (
                  <span className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 text-sm font-bold">
                    {product.badge}
                  </span>
                )}
              </div>
              
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold">${product.price}</span>
                {product.compareAtPrice && (
                  <span className="text-gray-500 line-through">
                    ${product.compareAtPrice}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 
import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  business: string;
  price: string;
  image: string;
}

const trendingProducts: Product[] = [
  {
    id: '1',
    name: 'Pro Boxing Gloves',
    business: 'Elite Performance Training',
    price: '$89.99',
    image: 'data:image/svg+xml,%3Csvg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M100 0L200 200H0L100 0Z" fill="%234CAF50"/%3E%3C/svg%3E'
  },
  {
    id: '2',
    name: 'Recovery Foam Roller',
    business: 'Recovery Zone',
    price: '$34.99',
    image: 'data:image/svg+xml,%3Csvg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M100 0L200 200H0L100 0Z" fill="%234CAF50"/%3E%3C/svg%3E'
  },
  {
    id: '3',
    name: 'Premium Yoga Mat',
    business: 'Core Power Yoga Studio',
    price: '$75.00',
    image: 'data:image/svg+xml,%3Csvg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M100 0L200 200H0L100 0Z" fill="%234CAF50"/%3E%3C/svg%3E'
  },
  {
    id: '4',
    name: 'Kettlebell Set',
    business: 'CrossFit Revolution',
    price: '$199.99',
    image: 'data:image/svg+xml,%3Csvg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M100 0L200 200H0L100 0Z" fill="%234CAF50"/%3E%3C/svg%3E'
  },
  {
    id: '5',
    name: 'Resistance Bands',
    business: 'PhysioFlex Rehabilitation',
    price: '$29.99',
    image: 'data:image/svg+xml,%3Csvg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M100 0L200 200H0L100 0Z" fill="%234CAF50"/%3E%3C/svg%3E'
  }
];

export default function TrendingProducts() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mt-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Trending Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {trendingProducts.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-[200px] h-[200px] relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {product.name}
              </h3>
              <p className="text-xs text-gray-600 truncate mt-1">
                {product.business}
              </p>
              <p className="text-sm font-semibold text-blue-600 mt-2">
                {product.price}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 
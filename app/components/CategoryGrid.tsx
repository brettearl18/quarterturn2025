import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    id: 1,
    title: 'CONTENT CREATION',
    image: '/images/categories/content-creation.jpg',
    link: '/categories/content-creation'
  },
  {
    id: 2,
    title: 'FEMALE APPAREL',
    image: '/images/categories/female-apparel.jpg',
    link: '/categories/female-apparel'
  },
  {
    id: 3,
    title: 'FIT-TECH',
    image: '/images/categories/fit-tech.jpg',
    link: '/categories/fit-tech'
  },
  {
    id: 4,
    title: 'GYMS & STUDIOS',
    image: '/images/categories/gyms-studios.jpg',
    link: '/categories/gyms-studios'
  },
  {
    id: 5,
    title: 'HEALTH PROFESSIONALS',
    image: '/images/categories/health-professionals.jpg',
    link: '/categories/health-professionals'
  },
  {
    id: 6,
    title: 'MALE APPAREL',
    image: '/images/categories/male-apparel.jpg',
    link: '/categories/male-apparel'
  },
  {
    id: 7,
    title: 'MEAL PREPARATION',
    image: '/images/categories/meal-preparation.jpg',
    link: '/categories/meal-preparation'
  },
  {
    id: 8,
    title: 'PERSONAL TRAINERS',
    image: '/images/categories/personal-trainers.jpg',
    link: '/categories/personal-trainers'
  },
  {
    id: 9,
    title: 'SUPPLEMENTS',
    image: '/images/categories/supplements.jpg',
    link: '/categories/supplements'
  }
];

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {categories.map((category) => (
        <Link 
          key={category.id} 
          href={category.link}
          className="relative h-64 group overflow-hidden rounded-lg shadow-lg"
        >
          <Image
            src={category.image}
            alt={category.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-white text-2xl font-bold text-center px-4">
              {category.title}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
} 
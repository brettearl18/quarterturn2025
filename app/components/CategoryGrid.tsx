import Link from 'next/link';
import { 
  PhotoIcon, 
  ShoppingBagIcon,
  ComputerDesktopIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  CakeIcon,
  UserIcon,
  BeakerIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import PersonalShopperPanel from './PersonalShopperPanel';
import CoachPanel from './CoachPanel';

const categories = [
  {
    id: 1,
    title: 'CONTENT CREATION',
    icon: PhotoIcon,
    description: 'Equipment and tools for fitness content creators',
    link: '/categories/content-creation'
  },
  {
    id: 2,
    title: 'FEMALE APPAREL',
    icon: ShoppingBagIcon,
    description: 'High-performance workout gear for women',
    link: '/categories/female-apparel'
  },
  {
    id: 3,
    title: 'FIT-TECH',
    icon: ComputerDesktopIcon,
    description: 'Smart fitness equipment and wearables',
    link: '/categories/fit-tech'
  },
  {
    id: 4,
    title: 'GYMS & STUDIOS',
    icon: BuildingOfficeIcon,
    description: 'Equipment for commercial fitness facilities',
    link: '/categories/gyms-studios'
  },
  {
    id: 5,
    title: 'HEALTH PROFESSIONALS',
    icon: UserGroupIcon,
    description: 'Tools and resources for fitness experts',
    link: '/categories/health-professionals'
  },
  {
    id: 6,
    title: 'MALE APPAREL',
    icon: ShoppingBagIcon,
    description: 'Performance workout wear for men',
    link: '/categories/male-apparel'
  },
  {
    id: 7,
    title: 'MEAL PREPARATION',
    icon: CakeIcon,
    description: 'Nutrition and meal prep essentials',
    link: '/categories/meal-preparation'
  },
  {
    id: 8,
    title: 'PERSONAL TRAINERS',
    icon: UserIcon,
    description: 'Equipment for personal training sessions',
    link: '/categories/personal-trainers'
  },
  {
    id: 9,
    title: 'SUPPLEMENTS',
    icon: BeakerIcon,
    description: 'Performance and recovery supplements',
    link: '/categories/supplements'
  }
];

export default function CategoryGrid() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-[#76777A]">Browse Categories</h2>
          <p className="text-[#B1B1B1] max-w-2xl mx-auto">
            Discover our comprehensive range of fitness equipment and services tailored to your needs
          </p>
        </div>

        {/* Featured Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <PersonalShopperPanel />
          <CoachPanel />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={category.link}
              className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#4AC1E0] rounded-full opacity-5 -mr-16 -mt-16 group-hover:opacity-10 transition-opacity" />
              
              {/* Icon */}
              <div className="relative mb-4">
                <div className="w-14 h-14 bg-[#4AC1E0] bg-opacity-10 rounded-lg flex items-center justify-center group-hover:bg-opacity-20 transition-all">
                  <category.icon className="w-7 h-7 text-[#4AC1E0]" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold mb-2 text-[#76777A] group-hover:text-[#4AC1E0] transition-colors">
                {category.title}
              </h3>
              <p className="text-[#B1B1B1]">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 
'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MagnifyingGlassIcon, 
  AdjustmentsHorizontalIcon,
  ChartBarIcon,
  HeartIcon,
  ShareIcon,
  StarIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';
import AISearch from '../components/AISearch';
import AIFeatures from '../components/AIFeatures';

interface Subcategory {
  id: string;
  name: string;
  productCount: number;
}

interface FeaturedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviewCount: number;
}

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  featured: boolean;
  subcategories: Subcategory[];
  featuredProducts: FeaturedProduct[];
  stats: {
    averageRating: number;
    totalReviews: number;
    priceRange: {
      min: number;
      max: number;
    };
    popularityScore: number;
  };
  relatedCategories: string[];
}

const categories: Category[] = [
  {
    id: 'strength-equipment',
    name: 'Strength Equipment',
    description: 'Professional grade strength training equipment for your fitness journey',
    image: 'https://via.placeholder.com/600x400?text=Strength+Equipment',
    productCount: 150,
    featured: true,
    subcategories: [
      { id: 'free-weights', name: 'Free Weights', productCount: 45 },
      { id: 'machines', name: 'Weight Machines', productCount: 35 },
      { id: 'racks', name: 'Power Racks & Cages', productCount: 20 },
      { id: 'benches', name: 'Weight Benches', productCount: 25 },
      { id: 'bars', name: 'Barbells & Attachments', productCount: 25 }
    ],
    featuredProducts: [
      {
        id: 'olympic-barbell',
        name: 'Professional Olympic Barbell',
        price: 299.99,
        image: 'https://via.placeholder.com/600x400?text=Olympic+Barbell',
        rating: 4.8,
        reviewCount: 128
      },
      {
        id: 'power-rack',
        name: 'Commercial Power Rack',
        price: 899.99,
        image: 'https://via.placeholder.com/600x400?text=Power+Rack',
        rating: 4.9,
        reviewCount: 89
      }
    ],
    stats: {
      averageRating: 4.7,
      totalReviews: 1250,
      priceRange: { min: 29.99, max: 2999.99 },
      popularityScore: 95
    },
    relatedCategories: ['cardio-equipment', 'accessories']
  },
  {
    id: 'cardio-equipment',
    name: 'Cardio Equipment',
    description: 'High-performance cardio machines for effective workouts',
    image: 'https://via.placeholder.com/600x400?text=Cardio+Equipment',
    productCount: 80,
    featured: true,
    subcategories: [
      { id: 'treadmills', name: 'Treadmills', productCount: 25 },
      { id: 'bikes', name: 'Exercise Bikes', productCount: 20 },
      { id: 'ellipticals', name: 'Ellipticals', productCount: 15 },
      { id: 'rowers', name: 'Rowing Machines', productCount: 10 },
      { id: 'steppers', name: 'Steppers & Climbers', productCount: 10 }
    ],
    featuredProducts: [
      {
        id: 'pro-treadmill',
        name: 'Commercial Grade Treadmill',
        price: 1999.99,
        image: 'https://via.placeholder.com/600x400?text=Treadmill',
        rating: 4.7,
        reviewCount: 156
      },
      {
        id: 'spin-bike',
        name: 'Professional Spin Bike',
        price: 799.99,
        image: 'https://via.placeholder.com/600x400?text=Spin+Bike',
        rating: 4.8,
        reviewCount: 112
      }
    ],
    stats: {
      averageRating: 4.6,
      totalReviews: 980,
      priceRange: { min: 299.99, max: 3999.99 },
      popularityScore: 90
    },
    relatedCategories: ['strength-equipment', 'wearables']
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Essential accessories to complement your workout routine',
    image: 'https://via.placeholder.com/600x400?text=Accessories',
    productCount: 200,
    featured: false,
    subcategories: [],
    featuredProducts: [],
    stats: {
      averageRating: 0,
      totalReviews: 0,
      priceRange: { min: 0, max: 0 },
      popularityScore: 0
    },
    relatedCategories: []
  },
  {
    id: 'recovery',
    name: 'Recovery & Wellness',
    description: 'Recovery tools and wellness products for optimal performance',
    image: 'https://via.placeholder.com/600x400?text=Recovery+and+Wellness',
    productCount: 120,
    featured: true,
    subcategories: [],
    featuredProducts: [],
    stats: {
      averageRating: 0,
      totalReviews: 0,
      priceRange: { min: 0, max: 0 },
      popularityScore: 0
    },
    relatedCategories: []
  },
  {
    id: 'supplements',
    name: 'Supplements',
    description: 'Premium supplements to support your fitness goals',
    image: 'https://via.placeholder.com/600x400?text=Supplements',
    productCount: 300,
    featured: false,
    subcategories: [],
    featuredProducts: [],
    stats: {
      averageRating: 0,
      totalReviews: 0,
      priceRange: { min: 0, max: 0 },
      popularityScore: 0
    },
    relatedCategories: []
  },
  {
    id: 'wearables',
    name: 'Wearables',
    description: 'Smart fitness technology and workout gear',
    image: 'https://via.placeholder.com/600x400?text=Wearables',
    productCount: 90,
    featured: false,
    subcategories: [],
    featuredProducts: [],
    stats: {
      averageRating: 0,
      totalReviews: 0,
      priceRange: { min: 0, max: 0 },
      popularityScore: 0
    },
    relatedCategories: []
  }
];

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'products' | 'rating' | 'popularity'>('name');
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [aiEnabled, setAiEnabled] = useState(true);

  // Mock user preferences - in a real app, this would come from a user context or API
  const userPreferences = {
    recentViews: ['strength-equipment', 'cardio-equipment'],
    favorites: ['treadmills', 'power-racks'],
    purchaseHistory: ['olympic-barbell', 'spin-bike']
  };

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleSuggestionSelect = useCallback((suggestion: any) => {
    if (suggestion.type === 'category') {
      const categoryId = suggestion.text.toLowerCase().replace(/\s+/g, '-');
      setSelectedSubcategories([categoryId]);
    } else if (suggestion.type === 'query') {
      setSearchQuery(suggestion.text);
    } else if (suggestion.type === 'feature') {
      // Handle feature-based filtering
      const featureKeywords = suggestion.text.toLowerCase().split(' ');
      setSearchQuery(featureKeywords.join(' '));
    }
  }, []);

  const handleInsightClick = useCallback((insight: any) => {
    switch (insight.type) {
      case 'trend':
        setSortBy('popularity');
        break;
      case 'recommendation':
        setShowFeaturedOnly(true);
        break;
      case 'insight':
        // Update relevant filters based on the insight
        break;
    }
  }, []);

  const filteredCategories = categories
    .filter(category => {
      const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          category.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFeatured = showFeaturedOnly ? category.featured : true;
      const matchesSubcategories = selectedSubcategories.length === 0 || 
                                  category.subcategories.some(sub => selectedSubcategories.includes(sub.id));
      const matchesPriceRange = category.stats.priceRange.min >= priceRange[0] && 
                               category.stats.priceRange.max <= priceRange[1];
      return matchesSearch && matchesFeatured && matchesSubcategories && matchesPriceRange;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'products':
          return b.productCount - a.productCount;
        case 'rating':
          return b.stats.averageRating - a.stats.averageRating;
        case 'popularity':
          return b.stats.popularityScore - a.stats.popularityScore;
        default:
          return 0;
      }
    });

  const allSubcategories = Array.from(
    new Set(categories.flatMap(cat => cat.subcategories.map(sub => sub.id)))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Browse Categories
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mb-8">
              Discover our extensive range of fitness equipment and accessories, carefully curated for your fitness journey.
            </p>

            {/* AI Search */}
            <div className="max-w-4xl mx-auto mb-8">
              <AISearch 
                onSearch={handleSearch}
                onSuggestionSelect={handleSuggestionSelect}
              />
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-400">{categories.length}</div>
                <div className="text-sm text-gray-300">Categories</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-400">
                  {categories.reduce((sum, cat) => sum + cat.productCount, 0)}
                </div>
                <div className="text-sm text-gray-300">Total Products</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-400">
                  {categories.reduce((sum, cat) => sum + cat.stats.totalReviews, 0)}
                </div>
                <div className="text-sm text-gray-300">Customer Reviews</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-3xl font-bold text-yellow-400">
                  {categories.filter(cat => cat.featured).length}
                </div>
                <div className="text-sm text-gray-300">Featured Categories</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Features Toggle */}
      <div className="container mx-auto px-4 py-4">
        <button
          onClick={() => setAiEnabled(!aiEnabled)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            aiEnabled ? 'bg-yellow-400 text-black' : 'bg-gray-200 text-gray-600'
          }`}
        >
          <BeakerIcon className="h-5 w-5" />
          {aiEnabled ? 'AI Assistant Enabled' : 'Enable AI Assistant'}
        </button>
      </div>

      {/* AI Features Section */}
      {aiEnabled && (
        <div className="container mx-auto px-4">
          <AIFeatures
            searchQuery={searchQuery}
            selectedCategories={selectedSubcategories}
            userPreferences={userPreferences}
            onSuggestionSelect={handleSuggestionSelect}
            onInsightClick={handleInsightClick}
          />
        </div>
      )}

      {/* Advanced Filters and Search */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="space-y-6">
            {/* Search and View Toggle */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  className="p-2 rounded-md hover:bg-gray-100"
                >
                  {viewMode === 'grid' ? 'List View' : 'Grid View'}
                </button>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="name">Sort by Name</option>
                  <option value="products">Sort by Products</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="popularity">Sort by Popularity</option>
                </select>
              </div>
            </div>

            {/* Advanced Filters */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Featured Filter */}
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={showFeaturedOnly}
                    onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-yellow-400 rounded focus:ring-yellow-400"
                  />
                  <span>Featured Categories Only</span>
                </label>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full"
                  />
                  <span className="text-sm text-gray-500">
                    ${priceRange[0]} - ${priceRange[1]}
                  </span>
                </div>
              </div>

              {/* Subcategory Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subcategories
                </label>
                <select
                  multiple
                  value={selectedSubcategories}
                  onChange={(e) => setSelectedSubcategories(
                    Array.from(e.target.selectedOptions, option => option.value)
                  )}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  {allSubcategories.map(subId => (
                    <option key={subId} value={subId}>
                      {subId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Display */}
        <div className={viewMode === 'grid' ? 
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : 
          "space-y-6"
        }>
          {filteredCategories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={viewMode === 'list' ? "w-full" : ""}
            >
              <Link href={`/categories/${category.id}`}>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className={viewMode === 'grid' ? 
                    "relative h-48" : 
                    "flex items-center"
                  }>
                    <div className={viewMode === 'grid' ? 
                      "w-full h-full" : 
                      "w-48 h-48 relative flex-shrink-0"
                    }>
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {category.featured && (
                      <span className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </span>
                    )}
                    
                    <div className="p-6 flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                          <p className="text-gray-600 mb-4">{category.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 rounded-full hover:bg-gray-100">
                            <HeartIcon className="h-5 w-5 text-gray-400" />
                          </button>
                          <button className="p-2 rounded-full hover:bg-gray-100">
                            <ShareIcon className="h-5 w-5 text-gray-400" />
                          </button>
                        </div>
                      </div>

                      {/* Category Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-lg font-semibold text-yellow-400">
                            {category.productCount}
                          </div>
                          <div className="text-sm text-gray-500">Products</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-yellow-400">
                            {category.stats.averageRating}
                          </div>
                          <div className="text-sm text-gray-500">Avg Rating</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-yellow-400">
                            {category.stats.totalReviews}
                          </div>
                          <div className="text-sm text-gray-500">Reviews</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-yellow-400">
                            ${category.stats.priceRange.min.toFixed(2)}+
                          </div>
                          <div className="text-sm text-gray-500">Starting At</div>
                        </div>
                      </div>

                      {/* Subcategories */}
                      <div className="mb-4">
                        <div className="text-sm text-gray-500 mb-2">Popular Subcategories:</div>
                        <div className="flex flex-wrap gap-2">
                          {category.subcategories.slice(0, 3).map(sub => (
                            <span
                              key={sub.id}
                              className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                            >
                              {sub.name}
                            </span>
                          ))}
                          {category.subcategories.length > 3 && (
                            <span className="text-sm text-gray-500">
                              +{category.subcategories.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Featured Products Preview */}
                      {category.featuredProducts.length > 0 && (
                        <div>
                          <div className="text-sm text-gray-500 mb-2">Featured Products:</div>
                          <div className="flex gap-4 overflow-x-auto pb-2">
                            {category.featuredProducts.map(product => (
                              <div key={product.id} className="flex-shrink-0 w-48">
                                <div className="relative h-32 mb-2 rounded-lg overflow-hidden">
                                  <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="text-sm font-medium">{product.name}</div>
                                <div className="flex items-center justify-between">
                                  <div className="text-yellow-400 font-semibold">
                                    ${product.price}
                                  </div>
                                  <div className="flex items-center text-sm text-gray-500">
                                    <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                                    {product.rating}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <ChartBarIcon className="h-5 w-5 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            Popularity Score: {category.stats.popularityScore}
                          </span>
                        </div>
                        <span className="text-yellow-400 font-semibold">View Category →</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No categories found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
} 
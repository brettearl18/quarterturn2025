'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, BoltIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import PersonalShopperQuestionnaire from '../components/PersonalShopperQuestionnaire';
import Image from 'next/image';

interface Category {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface QuickPreference {
  id: string;
  question: string;
  options: { id: string; text: string; icon?: string }[];
}

const categories: Category[] = [
  {
    id: 'gym-equipment',
    title: 'Gym Equipment',
    description: 'Find the perfect equipment for your home or commercial gym',
    image: '/images/categories/gyms-studios.jpg'
  },
  {
    id: 'workout-apparel',
    title: 'Workout Apparel',
    description: 'Discover comfortable and stylish workout clothing',
    image: '/images/categories/male-apparel.jpg'
  },
  {
    id: 'supplements',
    title: 'Supplements',
    description: 'Enhance your performance with premium supplements',
    image: '/images/categories/supplements.jpg'
  },
  {
    id: 'accessories',
    title: 'Accessories',
    description: 'Complete your fitness journey with essential accessories',
    image: '/images/categories/fit-tech.jpg'
  }
];

const quickPreferences: QuickPreference[] = [
  {
    id: 'style',
    question: 'What\'s your workout style?',
    options: [
      { id: 'intense', text: 'High Intensity' },
      { id: 'balanced', text: 'Balanced Mix' },
      { id: 'mindful', text: 'Mindful & Focused' },
      { id: 'strength', text: 'Pure Strength' }
    ]
  },
  {
    id: 'frequency',
    question: 'How often do you work out?',
    options: [
      { id: 'daily', text: '5-7 times/week' },
      { id: 'regular', text: '3-4 times/week' },
      { id: 'casual', text: '1-2 times/week' },
      { id: 'starting', text: 'Just starting out' }
    ]
  },
  {
    id: 'budget',
    question: 'What\'s your typical budget for fitness gear?',
    options: [
      { id: 'premium', text: 'Premium Quality' },
      { id: 'midrange', text: 'Mid-range' },
      { id: 'value', text: 'Value-focused' },
      { id: 'mix', text: 'Mix of ranges' }
    ]
  }
];

export default function PersonalShopperPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [showQuickPrefs, setShowQuickPrefs] = useState(true);
  const [currentPrefIndex, setCurrentPrefIndex] = useState(0);
  const [preferences, setPreferences] = useState<Record<string, string>>({});
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleQuickPreference = (prefId: string, optionId: string) => {
    setPreferences(prev => ({ ...prev, [prefId]: optionId }));
    
    if (currentPrefIndex < quickPreferences.length - 1) {
      setCurrentPrefIndex(prev => prev + 1);
    } else {
      setShowQuickPrefs(false);
      // Here you could make an API call to save guest preferences in session
      setShowLoginPrompt(true);
      setTimeout(() => setShowLoginPrompt(false), 5000); // Hide login prompt after 5 seconds
    }
  };

  const handleQuestionnaireComplete = (answers: Record<string, string>) => {
    // Combine quick preferences with detailed answers
    const allPreferences = { ...preferences, ...answers };
    setShowQuestionnaire(false);
    // Mock recommendations - replace with actual API call using allPreferences
    setRecommendations([
      {
        id: 1,
        name: 'Premium Product',
        description: 'Based on your preferences',
        price: '$199.99'
      },
      {
        id: 2,
        name: 'Recommended Item',
        description: 'Matches your requirements',
        price: '$149.99'
      },
      {
        id: 3,
        name: 'Perfect Choice',
        description: 'Ideal for your needs',
        price: '$299.99'
      }
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Quick Preferences Modal */}
        <AnimatePresence>
          {showQuickPrefs && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-xl max-w-xl w-full"
              >
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center space-x-2">
                    <BoltIcon className="w-6 h-6 text-yellow-400" />
                    <h2 className="text-2xl font-bold text-gray-800">Quick Style Quiz</h2>
                  </div>
                  <p className="mt-2 text-gray-600">Help us understand your preferences in 30 seconds</p>
                </div>
                <div className="p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPrefIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Question {currentPrefIndex + 1} of {quickPreferences.length}</span>
                        <button 
                          onClick={() => setShowQuickPrefs(false)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          Skip Quiz
                        </button>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {quickPreferences[currentPrefIndex].question}
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {quickPreferences[currentPrefIndex].options.map((option) => (
                          <button
                            key={option.id}
                            onClick={() => handleQuickPreference(quickPreferences[currentPrefIndex].id, option.id)}
                            className="p-4 text-left bg-gray-50 border-2 border-gray-200 rounded-xl hover:border-[#4AC1E0] hover:bg-[#4AC1E0]/5 transition-colors"
                          >
                            <span className="font-medium text-gray-800">{option.text}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Login Prompt */}
        <AnimatePresence>
          {showLoginPrompt && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 right-8 bg-white rounded-lg shadow-lg p-4 max-w-md z-50 border-l-4 border-yellow-400"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <UserCircleIcon className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Save Your Preferences?</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Log in or create an account to save your preferences and get better recommendations over time.
                  </p>
                  <div className="mt-3 flex space-x-3">
                    <button className="text-sm font-medium text-[#4AC1E0] hover:text-[#4AC1E0]/80 transition-colors">
                      Log In
                    </button>
                    <button className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
                      Continue as Guest
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => setShowLoginPrompt(false)}
                  className="flex-shrink-0 text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Personal Shopper
            <span className="text-[#4AC1E0]">.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Let us help you find the perfect fitness products
          </p>
          
          {/* New AI Description Section */}
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-lg mb-16">
            <div className="flex flex-col items-center space-y-6">
              <div className="w-16 h-16 bg-[#4AC1E0] bg-opacity-10 rounded-full flex items-center justify-center">
                <BoltIcon className="w-8 h-8 text-[#4AC1E0]" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Meet Your AI Shopping Assistant</h2>
              <p className="text-gray-600 text-center text-lg leading-relaxed">
                Our intelligent AI is here to revolutionize your shopping experience. By learning your preferences, 
                goals, and style, we'll curate the perfect selection of fitness products just for you. No more 
                endless browsing – let us guide you to equipment and gear that matches your unique needs.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-4">
                <div className="text-center">
                  <div className="font-semibold text-[#4AC1E0] mb-2">Personalized</div>
                  <p className="text-gray-600">Recommendations tailored to your fitness journey</p>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-[#4AC1E0] mb-2">Smart</div>
                  <p className="text-gray-600">AI-powered insights that learn your preferences</p>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-[#4AC1E0] mb-2">Effortless</div>
                  <p className="text-gray-600">Quick and easy way to find perfect products</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:shadow-2xl"
              onClick={() => {
                setSelectedCategory(category.id);
                setShowQuestionnaire(true);
                setRecommendations([]);
              }}
            >
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/20 hover:bg-black/30 transition-colors" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{category.title}</h3>
                <p className="text-gray-600 text-lg">{category.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Your Personalized Recommendations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendations.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg"
                >
                  <div className="aspect-video relative bg-gray-100 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BoltIcon className="w-12 h-12 text-gray-300" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-[#4AC1E0]">{product.price}</span>
                      <button className="px-4 py-2 bg-[#4AC1E0] text-white rounded-lg hover:bg-[#4AC1E0]/90 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Questionnaire Modal */}
        <AnimatePresence>
          {showQuestionnaire && selectedCategory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              >
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">Let's Find Your Perfect Match</h2>
                    <button
                      onClick={() => setShowQuestionnaire(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <XMarkIcon className="w-6 h-6" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <PersonalShopperQuestionnaire
                    category={selectedCategory}
                    onComplete={handleQuestionnaireComplete}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 
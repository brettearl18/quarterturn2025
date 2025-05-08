'use client';

import { useState } from 'react';
import { ChatBubbleLeftIcon, XMarkIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface Question {
  id: number;
  text: string;
  options: string[];
}

interface Product {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  description: string;
  match: string;
  image: string;
  features: string[];
  category: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: "What are you looking to shop for today?",
    options: ['Gym Equipment', 'Workout Apparel', 'Supplements', 'Accessories']
  },
  {
    id: 2,
    text: "What's your primary fitness goal?",
    options: ['Strength Training', 'Cardio', 'Weight Loss', 'Muscle Gain', 'General Fitness']
  },
  {
    id: 3,
    text: "What's your preferred workout environment?",
    options: ['Home Gym', 'Commercial Gym', 'Outdoors', 'Studio Classes']
  },
  {
    id: 4,
    text: "What's your experience level?",
    options: ['Beginner', 'Intermediate', 'Advanced', 'Professional']
  },
  {
    id: 5,
    text: "What's your budget range?",
    options: ['$0-$500', '$501-$2000', '$2001-$5000', '$5000+']
  },
  {
    id: 6,
    text: "What's your preferred style?",
    options: ['Classic/Traditional', 'Modern/Sleek', 'Bold/Colorful', 'Minimalist']
  },
  {
    id: 7,
    text: "What's your size preference?",
    options: ['Small', 'Medium', 'Large', 'X-Large', 'XX-Large']
  }
];

export default function PersonalShopper() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({ ...prev, [questions[currentQuestion].id]: answer }));
    
    // Skip irrelevant questions based on initial choice
    if (currentQuestion === 0) {
      if (answer === 'Workout Apparel') {
        // Skip equipment-specific questions for apparel
        setCurrentQuestion(1); // Go to fitness goal
      } else if (answer === 'Supplements') {
        // Skip equipment and apparel questions for supplements
        setCurrentQuestion(1); // Go to fitness goal
      } else if (answer === 'Accessories') {
        // Skip equipment-specific questions for accessories
        setCurrentQuestion(1); // Go to fitness goal
      }
    }
    
    if (currentQuestion < questions.length - 1) {
      // Skip size question if not shopping for apparel
      if (answers[1] !== 'Workout Apparel' && currentQuestion === 5) {
        setShowRecommendations(true);
      } else {
        setCurrentQuestion(prev => prev + 1);
      }
    } else {
      setShowRecommendations(true);
    }
  };

  const resetQuestions = () => {
    setCurrentQuestion(-1);
    setAnswers({});
    setShowRecommendations(false);
    setSelectedProduct(null);
  };

  const getRecommendations = (): Product[] => {
    // This would typically call an API to get personalized recommendations
    const recommendations = [
      {
        id: "1",
        title: "Premium Home Gym Bundle",
        price: "$2,499",
        originalPrice: "$2,999",
        description: "Complete home gym solution with power rack, bench, and weights",
        match: "98% match",
        image: "/placeholder-red.png",
        category: "Gym Equipment",
        features: [
          "Commercial-grade steel construction",
          "Includes Olympic barbell and weight plates",
          "Adjustable bench with multiple positions",
          "Safety spotters and J-cups included",
          "Cable attachment system"
        ]
      },
      {
        id: "2",
        title: "Performance Training Set",
        price: "$129",
        description: "Moisture-wicking workout set for maximum comfort",
        match: "96% match",
        image: "/placeholder-red.png",
        category: "Workout Apparel",
        features: [
          "4-way stretch fabric",
          "Anti-odor technology",
          "Breathable mesh panels",
          "Reflective details",
          "Available in multiple colors"
        ]
      },
      {
        id: "3",
        title: "Premium Whey Protein",
        price: "$59",
        originalPrice: "$69",
        description: "High-quality protein supplement for muscle recovery",
        match: "94% match",
        image: "/placeholder-red.png",
        category: "Supplements",
        features: [
          "25g protein per serving",
          "Low in sugar",
          "Easy to mix",
          "Natural ingredients",
          "Great taste"
        ]
      }
    ];

    // Filter based on category and other answers
    return recommendations.filter(product => {
      // Filter by selected category
      if (answers[1] && product.category !== answers[1]) return false;
      
      // Filter by budget for equipment
      if (answers[4] && answers[4] !== '$5000+' && product.category === 'Gym Equipment') {
        const price = parseInt(product.price.replace(/[$,]/g, ''));
        const [min, max] = answers[4].replace(/[$,]/g, '').split('-').map(Number);
        if (price < min || price > max) return false;
      }
      
      return true;
    });
  };

  const renderContent = () => {
    if (selectedProduct) {
      return (
        <div className="space-y-6">
          <button
            onClick={() => setSelectedProduct(null)}
            className="text-[#4AC1E0] hover:text-[#E0DF00] flex items-center space-x-2"
          >
            <span>← Back to recommendations</span>
          </button>
          <div className="space-y-4">
            <div className="aspect-video relative bg-gradient-to-br from-[#4AC1E0] via-[#E0DF00]/50 to-[#4AC1E0] rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm"></div>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-xl text-[#76777A]">{selectedProduct.title}</h3>
                <p className="text-[#B1B1B1]">{selectedProduct.category}</p>
              </div>
              <div className="text-right">
                <div className="font-bold text-xl text-[#4AC1E0]">{selectedProduct.price}</div>
                {selectedProduct.originalPrice && (
                  <div className="text-sm text-[#B1B1B1] line-through">{selectedProduct.originalPrice}</div>
                )}
              </div>
            </div>
            <p className="text-[#76777A]">{selectedProduct.description}</p>
            <div>
              <h4 className="font-medium mb-2 text-[#76777A]">Key Features:</h4>
              <ul className="space-y-2">
                {selectedProduct.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-[#4AC1E0] rounded-full" />
                    <span className="text-[#76777A]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button className="w-full bg-[#4AC1E0] text-white py-3 rounded-lg hover:bg-[#E0DF00] transition-colors flex items-center justify-center space-x-2">
              <ShoppingBagIcon className="h-5 w-5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      );
    }

    if (currentQuestion === -1) {
      return (
        <div className="space-y-6 text-center">
          <div className="w-16 h-16 bg-[#D8D8D6] rounded-full flex items-center justify-center mx-auto">
            <ShoppingBagIcon className="h-8 w-8 text-[#4AC1E0]" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-[#76777A]">Welcome to Your Personal AI Shopper</h3>
            <p className="text-[#B1B1B1]">
              I'll help you find the perfect fitness equipment based on your needs and preferences.
              Let me ask you a few questions to get started.
            </p>
          </div>
          <button
            onClick={() => setCurrentQuestion(0)}
            className="w-full bg-[#4AC1E0] text-white py-3 rounded-lg hover:bg-[#E0DF00] transition-colors"
          >
            Get Started
          </button>
        </div>
      );
    }

    if (!showRecommendations) {
      return (
        <div className="space-y-6">
          <div className="flex space-x-2">
            <span className="text-[#76777A]">Question {currentQuestion + 1} of {questions.length}</span>
            <div className="flex-1 h-1 bg-[#D8D8D6] rounded-full self-center">
              <div 
                className="h-full bg-[#4AC1E0] rounded-full"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
          <h3 className="text-lg font-medium text-[#76777A]">{questions[currentQuestion].text}</h3>
          <div className="grid grid-cols-1 gap-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="text-left px-4 py-3 border border-[#D8D8D6] rounded-lg hover:border-[#4AC1E0] hover:bg-[#4AC1E0] hover:bg-opacity-5 transition-colors"
              >
                <span className="text-[#76777A]">{option}</span>
              </button>
            ))}
          </div>
          <button
            onClick={resetQuestions}
            className="text-[#B1B1B1] hover:text-[#76777A] transition-colors"
          >
            Start Over
          </button>
        </div>
      );
    }

    const recommendations = getRecommendations();
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-[#76777A]">Your Personalized Recommendations</h3>
          <p className="text-[#B1B1B1]">Based on your preferences, here are some items you might love:</p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {recommendations.map(product => (
            <button
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="bg-white p-4 rounded-lg border border-[#D8D8D6] hover:border-[#4AC1E0] transition-colors text-left"
            >
              <div className="flex items-start space-x-4">
                <div className="w-24 h-24 bg-[#D8D8D6] rounded-lg flex-shrink-0 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#4AC1E0] opacity-20 rounded-full m-2" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-[#76777A] truncate">{product.title}</h4>
                      <p className="text-sm text-[#B1B1B1]">{product.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#4AC1E0]">{product.price}</div>
                      {product.originalPrice && (
                        <div className="text-sm text-[#B1B1B1] line-through">{product.originalPrice}</div>
                      )}
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-[#76777A] line-clamp-2">{product.description}</p>
                  <div className="mt-2 inline-flex items-center space-x-1">
                    <span className="px-2 py-1 text-xs bg-[#4AC1E0] bg-opacity-10 text-[#4AC1E0] rounded">
                      {product.match}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
        <button
          onClick={resetQuestions}
          className="w-full border border-[#4AC1E0] text-[#4AC1E0] py-3 rounded-lg hover:bg-[#4AC1E0] hover:text-white transition-colors"
        >
          Start Over
        </button>
      </div>
    );
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#4AC1E0] text-white rounded-full p-3 shadow-lg hover:bg-[#E0DF00] transition-colors"
        >
          <ChatBubbleLeftIcon className="h-6 w-6" />
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-96 max-h-[600px] overflow-y-auto">
          <div className="p-4 border-b flex justify-between items-center bg-[#4AC1E0] text-white">
            <h3 className="font-semibold">Personal AI Shopper</h3>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-[#E0DF00]">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      )}
    </div>
  );
} 
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
  dependsOn?: {
    questionId: string;
    answerId: string;
  };
}

interface QuestionnaireProps {
  category: string;
  onComplete: (answers: Record<string, string>) => void;
}

const questions: Record<string, Question[]> = {
  'gym-equipment': [
    {
      id: 'space',
      text: 'How much space do you have available?',
      options: [
        { id: 'small', text: 'Small space (e.g., apartment)' },
        { id: 'medium', text: 'Medium space (e.g., garage)' },
        { id: 'large', text: 'Large space (e.g., dedicated gym room)' }
      ]
    },
    {
      id: 'budget',
      text: 'What is your budget range?',
      options: [
        { id: 'budget', text: '$100 - $500' },
        { id: 'mid', text: '$500 - $2000' },
        { id: 'premium', text: '$2000+' }
      ]
    },
    {
      id: 'goals',
      text: 'What are your primary fitness goals?',
      options: [
        { id: 'strength', text: 'Build strength' },
        { id: 'cardio', text: 'Improve cardio' },
        { id: 'both', text: 'Both strength and cardio' }
      ]
    }
  ],
  'workout-apparel': [
    {
      id: 'activity',
      text: 'What type of activities will you be doing?',
      options: [
        { id: 'gym', text: 'Gym workouts' },
        { id: 'running', text: 'Running/Cardio' },
        { id: 'yoga', text: 'Yoga/Pilates' },
        { id: 'multiple', text: 'Multiple activities' }
      ]
    },
    {
      id: 'fit',
      text: 'What type of fit do you prefer?',
      options: [
        { id: 'loose', text: 'Loose and comfortable' },
        { id: 'fitted', text: 'Fitted but not tight' },
        { id: 'compression', text: 'Compression/Second skin' }
      ]
    },
    {
      id: 'climate',
      text: 'What climate will you be training in?',
      options: [
        { id: 'indoor', text: 'Indoor/Climate controlled' },
        { id: 'hot', text: 'Hot/Humid outdoors' },
        { id: 'cold', text: 'Cold weather' }
      ]
    }
  ],
  'supplements': [
    {
      id: 'goal',
      text: 'What is your primary supplementation goal?',
      options: [
        { id: 'muscle', text: 'Build muscle' },
        { id: 'recovery', text: 'Improve recovery' },
        { id: 'energy', text: 'Boost energy' },
        { id: 'health', text: 'General health' }
      ]
    },
    {
      id: 'diet',
      text: 'Do you have any dietary restrictions?',
      options: [
        { id: 'none', text: 'No restrictions' },
        { id: 'vegan', text: 'Vegan' },
        { id: 'lactose', text: 'Lactose intolerant' },
        { id: 'gluten', text: 'Gluten free' }
      ]
    },
    {
      id: 'experience',
      text: 'What is your experience with supplements?',
      options: [
        { id: 'beginner', text: 'Beginner (never used)' },
        { id: 'intermediate', text: 'Intermediate (some experience)' },
        { id: 'advanced', text: 'Advanced (regular user)' }
      ]
    }
  ],
  'accessories': [
    {
      id: 'type',
      text: 'What type of accessories are you looking for?',
      options: [
        { id: 'recovery', text: 'Recovery tools' },
        { id: 'training', text: 'Training accessories' },
        { id: 'tracking', text: 'Fitness tracking' },
        { id: 'general', text: 'General gym accessories' }
      ]
    },
    {
      id: 'portability',
      text: 'How important is portability?',
      options: [
        { id: 'very', text: 'Very important (travel often)' },
        { id: 'somewhat', text: 'Somewhat important' },
        { id: 'not', text: 'Not important' }
      ]
    },
    {
      id: 'tech',
      text: 'Are you interested in smart/connected accessories?',
      options: [
        { id: 'yes', text: 'Yes, I want smart features' },
        { id: 'maybe', text: 'Maybe, if useful' },
        { id: 'no', text: 'Prefer simple items' }
      ]
    }
  ]
};

export default function PersonalShopperQuestionnaire({ category, onComplete }: QuestionnaireProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const categoryQuestions = questions[category] || [];

  const handleAnswer = (questionId: string, answerId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerId }));
    
    if (currentQuestionIndex < categoryQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      onComplete({ ...answers, [questionId]: answerId });
    }
  };

  const currentQuestion = categoryQuestions[currentQuestionIndex];

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {currentQuestion && (
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {currentQuestion.text}
            </h3>
            <div className="grid gap-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(currentQuestion.id, option.id)}
                  className="w-full p-4 text-left bg-white border-2 border-gray-200 rounded-xl hover:border-[#4AC1E0] hover:bg-[#4AC1E0]/5 transition-colors"
                >
                  {option.text}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex justify-between items-center mt-8">
        <div className="text-sm text-gray-500">
          Question {currentQuestionIndex + 1} of {categoryQuestions.length}
        </div>
        <div className="flex gap-2">
          {Array.from({ length: categoryQuestions.length }).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentQuestionIndex
                  ? 'bg-[#4AC1E0]'
                  : index < currentQuestionIndex
                  ? 'bg-[#4AC1E0]/50'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 
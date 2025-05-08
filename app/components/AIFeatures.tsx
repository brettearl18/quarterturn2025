'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  SparklesIcon, 
  LightBulbIcon,
  ChatBubbleBottomCenterTextIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

interface AIInsight {
  type: 'trend' | 'recommendation' | 'insight';
  message: string;
  confidence: number;
}

interface AIFeaturesProps {
  searchQuery: string;
  selectedCategories: string[];
  userPreferences?: {
    recentViews: string[];
    favorites: string[];
    purchaseHistory: string[];
  };
  onSuggestionSelect: (suggestion: string) => void;
  onInsightClick: (insight: AIInsight) => void;
}

export default function AIFeatures({ 
  searchQuery, 
  selectedCategories,
  userPreferences,
  onSuggestionSelect,
  onInsightClick
}: AIFeaturesProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [aiResponse, setAiResponse] = useState('');

  // Simulate AI processing
  useEffect(() => {
    if (searchQuery) {
      setIsProcessing(true);
      // Simulated AI processing delay
      const timer = setTimeout(() => {
        generateSmartSuggestions();
        setIsProcessing(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  // Generate smart suggestions based on user input and preferences
  const generateSmartSuggestions = () => {
    // This would typically call an AI API endpoint
    const mockSuggestions = [
      "Looking for cardio equipment? Try our treadmills with AI-powered workout tracking",
      "Based on your interests, you might like our smart strength training equipment",
      "Popular in your area: Recovery tools with biometric feedback",
    ];
    setSuggestions(mockSuggestions);

    const mockInsights: AIInsight[] = [
      {
        type: 'trend',
        message: 'Smart fitness equipment is trending in your region',
        confidence: 0.89
      },
      {
        type: 'recommendation',
        message: 'Based on your profile, you might enjoy our advanced weight training gear',
        confidence: 0.95
      },
      {
        type: 'insight',
        message: 'Users similar to you often combine cardio equipment with recovery tools',
        confidence: 0.82
      }
    ];
    setInsights(mockInsights);

    // Simulate AI-generated response
    setAiResponse(
      "I notice you're interested in fitness equipment. Based on your search patterns and preferences, " +
      "I recommend exploring our smart fitness technology category. These products offer features like " +
      "real-time performance tracking and AI-powered workout optimization."
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <SparklesIcon className="h-6 w-6 text-yellow-400" />
        <h2 className="text-xl font-semibold">AI-Powered Insights</h2>
      </div>

      {/* AI Processing Indicator */}
      {isProcessing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-gray-500 mb-4"
        >
          <BoltIcon className="h-5 w-5 animate-pulse text-yellow-400" />
          <span>Processing your request...</span>
        </motion.div>
      )}

      {/* AI Response */}
      {aiResponse && (
        <div className="bg-yellow-50 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
            <p className="text-gray-700">{aiResponse}</p>
          </div>
        </div>
      )}

      {/* Smart Suggestions */}
      {suggestions.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Smart Suggestions
          </h3>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-600 flex items-center gap-2"
                onClick={() => onSuggestionSelect(suggestion)}
              >
                <LightBulbIcon className="h-5 w-5 text-yellow-400" />
                {suggestion}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* AI Insights */}
      {insights.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Personalized Insights
          </h3>
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => onInsightClick(insight)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">
                    {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {(insight.confidence * 100).toFixed(0)}% confidence
                  </span>
                </div>
                <p className="text-gray-600">{insight.message}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 
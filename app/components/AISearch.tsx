'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MagnifyingGlassIcon,
  MicrophoneIcon,
  SparklesIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface SearchResult {
  id: string;
  name: string;
  description: string;
  category: string;
  match_score: number;
  image: string;
  price: number;
  features: string[];
}

interface RecommendedProduct {
  id: string;
  name: string;
  category: string;
  confidence: number;
  reason: string;
  image: string;
}

interface SearchSuggestion {
  text: string;
  type: 'category' | 'product' | 'feature' | 'query';
  confidence: number;
}

interface AISearchProps {
  onSearch: (query: string) => void;
  onSuggestionSelect: (suggestion: SearchSuggestion) => void;
}

export default function AISearch({ onSearch, onSuggestionSelect }: AISearchProps) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendedProduct[]>([]);
  const [searchMode, setSearchMode] = useState<'text' | 'voice'>('text');
  const [isListening, setIsListening] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Mock categories for demo
  const categories = [
    'Weight Training',
    'Cardio Equipment',
    'Recovery Tools',
    'Accessories',
    'Nutrition',
  ];

  // Mock function to simulate AI search
  const handleSearch = async () => {
    setIsSearching(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock results
    const mockResults: SearchResult[] = [
      {
        id: '1',
        name: 'Premium Adjustable Dumbbell Set',
        description: 'Space-saving adjustable dumbbells with quick weight change mechanism',
        category: 'Weight Training',
        match_score: 0.95,
        image: '/images/products/dumbbells.jpg',
        price: 299.99,
        features: ['5-50 lbs per dumbbell', 'Quick-change weight system', 'Compact design']
      },
      {
        id: '2',
        name: 'Smart Resistance Bands',
        description: 'Connected resistance bands with real-time feedback and tracking',
        category: 'Accessories',
        match_score: 0.88,
        image: '/images/products/bands.jpg',
        price: 79.99,
        features: ['Bluetooth connectivity', 'Exercise tracking', 'App integration']
      }
    ];

    setResults(mockResults);
    setIsSearching(false);
  };

  // Mock function to get personalized recommendations
  const getRecommendations = async () => {
    // Mock recommendations based on user history and preferences
    const mockRecommendations: RecommendedProduct[] = [
      {
        id: '1',
        name: 'Recovery Foam Roller',
        category: 'Recovery Tools',
        confidence: 0.92,
        reason: 'Based on your interest in post-workout recovery equipment',
        image: '/images/products/foam-roller.jpg'
      },
      {
        id: '2',
        name: 'Smart Water Bottle',
        category: 'Accessories',
        confidence: 0.85,
        reason: 'Complements your recent workout equipment purchases',
        image: '/images/products/water-bottle.jpg'
      }
    ];
    setRecommendations(mockRecommendations);
  };

  useEffect(() => {
    getRecommendations();
  }, []);

  // Voice search simulation
  const toggleVoiceSearch = () => {
    if (searchMode === 'voice') {
      setSearchMode('text');
      setIsListening(false);
    } else {
      setSearchMode('voice');
      setIsListening(true);
      // Simulate voice recognition
      setTimeout(() => {
        setQuery('Show me premium dumbbells with good grip');
        setIsListening(false);
        setSearchMode('text');
        handleSearch();
      }, 2000);
    }
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Process natural language query
  const processQuery = async (inputQuery: string) => {
    setIsProcessing(true);
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // This would typically call an AI endpoint for NLP
    const mockSuggestions: SearchSuggestion[] = [
      {
        text: "Show me strength equipment for beginners",
        type: "query",
        confidence: 0.95
      },
      {
        text: "Power Racks under $1000",
        type: "category",
        confidence: 0.88
      },
      {
        text: "Equipment with AI tracking features",
        type: "feature",
        confidence: 0.85
      }
    ];

    setSuggestions(mockSuggestions);
    setShowSuggestions(true);
    setIsProcessing(false);
  };

  // Handle voice input
  const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        processQuery(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Voice search is not supported in your browser.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery.length > 2) {
      processQuery(newQuery);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    setShowSuggestions(false);
  };

  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search with natural language... (e.g., 'show me cardio equipment for beginners')"
            className="w-full pl-12 pr-32 py-4 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          />
          <MagnifyingGlassIcon className="absolute left-4 h-6 w-6 text-gray-400" />
          
          <div className="absolute right-4 flex items-center gap-2">
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <XMarkIcon className="h-5 w-5 text-gray-400" />
              </button>
            )}
            <button
              type="button"
              onClick={startVoiceInput}
              className={`p-2 rounded-full transition-colors ${
                isListening ? 'bg-red-50 text-red-500' : 'hover:bg-gray-100'
              }`}
            >
              <MicrophoneIcon className="h-5 w-5" />
            </button>
            <SparklesIcon className="h-5 w-5 text-yellow-400" />
          </div>
        </div>
      </form>

      {/* Processing Indicator */}
      {isProcessing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-full left-0 right-0 mt-2 p-4 bg-white rounded-lg shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-yellow-400 border-t-transparent" />
            <span className="text-gray-600">Processing your query...</span>
          </div>
        </motion.div>
      )}

      {/* Search Suggestions */}
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-50"
          >
            <div className="p-2">
              {suggestions.map((suggestion, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    onSuggestionSelect(suggestion);
                    setShowSuggestions(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <SparklesIcon className="h-5 w-5 text-yellow-400" />
                      <span className="text-gray-700">{suggestion.text}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">
                        {suggestion.type}
                      </span>
                      <span className="text-xs font-medium text-yellow-600">
                        {(suggestion.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 
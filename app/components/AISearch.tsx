import { useState } from 'react';
import { motion } from 'framer-motion';

interface SearchResult {
  id: string;
  name: string;
  description: string;
  category: string;
  match_score: number;
}

export default function AISearch() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = async () => {
    setIsSearching(true);
    try {
      // TODO: Replace with actual AI search API call
      const mockResults = [
        {
          id: '1',
          name: 'Pro Boxing Gloves',
          description: 'Professional grade boxing gloves for serious athletes',
          category: 'Equipment',
          match_score: 0.95
        },
        {
          id: '2',
          name: 'Training Program',
          description: 'Personalized training program for boxing beginners',
          category: 'Services',
          match_score: 0.85
        }
      ];
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResults(mockResults);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex flex-col items-center gap-4">
        <div className="w-full relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe what you're looking for... (e.g., 'beginner-friendly boxing equipment for cardio')"
            className="w-full p-4 pr-12 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            disabled={isSearching || !query.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isSearching ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Search'
            )}
          </button>
        </div>

        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full space-y-4"
          >
            <h2 className="text-xl font-semibold">AI-Powered Results</h2>
            <div className="space-y-4">
              {results.map((result) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{result.name}</h3>
                      <p className="text-gray-600">{result.description}</p>
                      <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-sm rounded-full">
                        {result.category}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-500">Match Score</span>
                      <div className="text-lg font-semibold text-blue-600">
                        {(result.match_score * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 
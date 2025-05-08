'use client';

import { motion } from 'framer-motion';
import GamificationSystem from '../components/GamificationSystem';

export default function GamificationPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-center mb-8">Your Fitness Journey</h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Track your achievements, earn rewards, and level up your fitness experience. Every interaction brings you closer to exclusive benefits and recognition.
          </p>
          
          <GamificationSystem />
        </motion.div>
      </div>
    </div>
  );
} 
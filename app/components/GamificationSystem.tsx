'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthContext } from './AuthProvider';

interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: string;
  isUnlocked: boolean;
  progress: number;
  maxProgress: number;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  isAvailable: boolean;
}

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Equipment Explorer',
    description: 'View 10 different pieces of equipment',
    points: 100,
    icon: '🔍',
    isUnlocked: false,
    progress: 3,
    maxProgress: 10
  },
  {
    id: '2',
    title: 'Review Master',
    description: 'Write 5 detailed product reviews',
    points: 200,
    icon: '⭐',
    isUnlocked: false,
    progress: 2,
    maxProgress: 5
  },
  {
    id: '3',
    title: 'Fitness Pioneer',
    description: 'Purchase equipment from 3 different categories',
    points: 300,
    icon: '🏆',
    isUnlocked: false,
    progress: 1,
    maxProgress: 3
  }
];

const mockRewards: Reward[] = [
  {
    id: '1',
    title: 'Free Shipping',
    description: 'Get free shipping on your next order',
    pointsCost: 500,
    isAvailable: true
  },
  {
    id: '2',
    title: 'VIP Equipment Preview',
    description: 'Early access to new equipment releases',
    pointsCost: 1000,
    isAvailable: false
  },
  {
    id: '3',
    title: 'Personal Training Session',
    description: 'One free virtual training session',
    pointsCost: 1500,
    isAvailable: false
  }
];

export function useGamification() {
  // Initialize with 400 points for testing
  const [points, setPoints] = useState(400);
  const [achievements, setAchievements] = useState(mockAchievements);
  const [rewards, setRewards] = useState(mockRewards);

  // Comment out the useEffect for testing
  /*useEffect(() => {
    // Calculate total points from unlocked achievements
    const totalPoints = achievements
      .filter(a => a.isUnlocked)
      .reduce((sum, a) => sum + a.points, 0);
    setPoints(totalPoints);
  }, [achievements]);*/

  const unlockAchievement = (achievementId: string) => {
    setAchievements(prev => prev.map(a => 
      a.id === achievementId ? { ...a, isUnlocked: true } : a
    ));
  };

  const updateProgress = (achievementId: string, progress: number) => {
    setAchievements(prev => prev.map(a => 
      a.id === achievementId ? { ...a, progress: Math.min(progress, a.maxProgress) } : a
    ));
  };

  return {
    points,
    achievements,
    rewards,
    unlockAchievement,
    updateProgress
  };
}

export default function GamificationSystem() {
  const { user } = useAuthContext();
  const { points, achievements, rewards } = useGamification();
  const [selectedTab, setSelectedTab] = useState<'achievements' | 'rewards'>('achievements');

  const progressBarVariants = {
    initial: { width: 0 },
    animate: { width: '100%' }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Fitness Journey</h2>
          <p className="text-gray-600">Level up your equipment mastery</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Your Points</p>
          <p className="text-3xl font-bold text-yellow-400">{points}</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setSelectedTab('achievements')}
          className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
            selectedTab === 'achievements'
              ? 'bg-yellow-400 text-black'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Achievements
        </button>
        <button
          onClick={() => setSelectedTab('rewards')}
          className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
            selectedTab === 'rewards'
              ? 'bg-yellow-400 text-black'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Rewards
        </button>
      </div>

      {selectedTab === 'achievements' && (
        <div className="space-y-4">
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 rounded-lg p-4"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{achievement.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {achievement.title}
                    </h3>
                    <span className="text-yellow-400 font-bold">+{achievement.points}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{achievement.description}</p>
                  <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-yellow-400"
                      style={{
                        width: `${(achievement.progress / achievement.maxProgress) * 100}%`
                      }}
                      variants={progressBarVariants}
                      initial="initial"
                      animate="animate"
                      transition={{ duration: 1 }}
                    />
                  </div>
                  <p className="text-right text-sm text-gray-500 mt-1">
                    {achievement.progress} / {achievement.maxProgress}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {selectedTab === 'rewards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewards.map((reward) => (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-gray-50 rounded-lg p-4 border-2 ${
                reward.isAvailable ? 'border-yellow-400' : 'border-gray-200'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{reward.title}</h3>
                <span className="text-sm font-medium text-gray-600">
                  {reward.pointsCost} points
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{reward.description}</p>
              <button
                className={`w-full py-2 px-4 rounded-md transition-colors ${
                  points >= reward.pointsCost
                    ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                disabled={points < reward.pointsCost}
              >
                {points >= reward.pointsCost ? 'Claim Reward' : 'Not Enough Points'}
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
} 
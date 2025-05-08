'use client';

import { useState } from 'react';

interface WorkoutOptions {
  duration: string;
  equipment: string;
  focus: string;
  level: string;
}

export default function AIWorkoutGenerator() {
  const [selectedOptions, setSelectedOptions] = useState<WorkoutOptions>({
    duration: '30 minutes',
    equipment: 'Minimal (Dumbbells, Resistance Bands)',
    focus: 'Full Body',
    level: 'Intermediate'
  });

  return (
    <section className="bg-[#4AC1E0] py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center mb-4">
          <svg 
            className="w-8 h-8 text-white mr-2" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            AI Workout Generator
          </h2>
        </div>
        <p className="text-white/90 mb-12">
          Get a personalized workout routine based on your preferences and goals
        </p>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Workout Duration */}
            <div className="space-y-2">
              <label className="block text-white text-left text-sm font-medium mb-2">
                Workout Duration
              </label>
              <select 
                value={selectedOptions.duration}
                onChange={(e) => setSelectedOptions(prev => ({ ...prev, duration: e.target.value }))}
                className="w-full bg-white/5 text-white border border-white/20 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#E0DF00]"
              >
                <option value="30 minutes">30 minutes</option>
                <option value="45 minutes">45 minutes</option>
                <option value="60 minutes">60 minutes</option>
                <option value="90 minutes">90 minutes</option>
              </select>
            </div>

            {/* Equipment Available */}
            <div className="space-y-2">
              <label className="block text-white text-left text-sm font-medium mb-2">
                Equipment Available
              </label>
              <select 
                value={selectedOptions.equipment}
                onChange={(e) => setSelectedOptions(prev => ({ ...prev, equipment: e.target.value }))}
                className="w-full bg-white/5 text-white border border-white/20 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#E0DF00]"
              >
                <option value="Minimal (Dumbbells, Resistance Bands)">Minimal (Dumbbells, Resistance Bands)</option>
                <option value="Full Gym">Full Gym</option>
                <option value="Bodyweight Only">Bodyweight Only</option>
                <option value="Home Gym">Home Gym</option>
              </select>
            </div>

            {/* Workout Focus */}
            <div className="space-y-2">
              <label className="block text-white text-left text-sm font-medium mb-2">
                Workout Focus
              </label>
              <select 
                value={selectedOptions.focus}
                onChange={(e) => setSelectedOptions(prev => ({ ...prev, focus: e.target.value }))}
                className="w-full bg-white/5 text-white border border-white/20 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#E0DF00]"
              >
                <option value="Full Body">Full Body</option>
                <option value="Upper Body">Upper Body</option>
                <option value="Lower Body">Lower Body</option>
                <option value="Core">Core</option>
                <option value="Cardio">Cardio</option>
              </select>
            </div>

            {/* Fitness Level */}
            <div className="space-y-2">
              <label className="block text-white text-left text-sm font-medium mb-2">
                Fitness Level
              </label>
              <select 
                value={selectedOptions.level}
                onChange={(e) => setSelectedOptions(prev => ({ ...prev, level: e.target.value }))}
                className="w-full bg-white/5 text-white border border-white/20 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#E0DF00]"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <button 
            className="mt-8 bg-[#E0DF00] hover:bg-white text-[#76777A] font-semibold px-8 py-3 rounded-lg transition-colors duration-200 w-full md:w-auto"
          >
            Generate Workout
          </button>
        </div>
      </div>
    </section>
  );
} 
'use client';

import { useState } from 'react';
import { SparklesIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface WorkoutPreferences {
  duration: number;
  equipment: string;
  focus: string;
  level: string;
}

export default function WorkoutGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [workout, setWorkout] = useState<string[]>([]);
  const [preferences, setPreferences] = useState<WorkoutPreferences>({
    duration: 30,
    equipment: 'minimal',
    focus: 'full-body',
    level: 'intermediate'
  });

  const generateWorkout = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setWorkout([
        "3 x 12 Push-ups with proper form",
        "4 x 15 Bodyweight squats",
        "3 x 30s Plank hold",
        "3 x 12 Dumbbell rows (each side)",
        "4 x 20s Mountain climbers",
        "3 x 10 Burpees"
      ]);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-[#FF5722] to-orange-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <SparklesIcon className="w-6 h-6" />
              <h2 className="text-3xl font-bold">AI Workout Generator</h2>
            </div>
            <p className="text-white/80">
              Get a personalized workout routine based on your preferences and goals
            </p>
          </div>

          {/* Preferences Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Workout Duration</label>
                <select 
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                  value={preferences.duration}
                  onChange={(e) => setPreferences({...preferences, duration: Number(e.target.value)})}
                >
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={45}>45 minutes</option>
                  <option value={60}>60 minutes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Equipment Available</label>
                <select 
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                  value={preferences.equipment}
                  onChange={(e) => setPreferences({...preferences, equipment: e.target.value})}
                >
                  <option value="none">No Equipment</option>
                  <option value="minimal">Minimal (Dumbbells, Resistance Bands)</option>
                  <option value="full">Full Gym Access</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Workout Focus</label>
                <select 
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                  value={preferences.focus}
                  onChange={(e) => setPreferences({...preferences, focus: e.target.value})}
                >
                  <option value="full-body">Full Body</option>
                  <option value="upper">Upper Body</option>
                  <option value="lower">Lower Body</option>
                  <option value="core">Core</option>
                  <option value="cardio">Cardio</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Fitness Level</label>
                <select 
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
                  value={preferences.level}
                  onChange={(e) => setPreferences({...preferences, level: e.target.value})}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            <button
              onClick={generateWorkout}
              disabled={isGenerating}
              className="w-full mt-6 bg-white text-[#FF5722] py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <ArrowPathIcon className="w-5 h-5 animate-spin" />
                  Generating Workout...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5" />
                  Generate Workout
                </>
              )}
            </button>
          </div>

          {/* Generated Workout */}
          {workout.length > 0 && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4">Your Personalized Workout</h3>
              <ul className="space-y-3">
                {workout.map((exercise, index) => (
                  <li 
                    key={index}
                    className="flex items-center gap-3 bg-white/5 rounded-lg p-3"
                  >
                    <span className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      {index + 1}
                    </span>
                    {exercise}
                  </li>
                ))}
              </ul>
              <div className="mt-6 text-center text-white/80 text-sm">
                Pro tip: Remember to warm up properly and maintain good form throughout your workout!
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 
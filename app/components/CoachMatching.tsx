'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Question {
  id: string;
  text: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 'goal',
    text: 'What is your primary fitness goal?',
    options: ['Lose weight', 'Build muscle', 'Improve endurance', 'General fitness']
  },
  {
    id: 'level',
    text: 'How would you describe your current fitness level?',
    options: [
      'Beginner - New to fitness',
      'Intermediate - Some experience',
      'Advanced - Regular training',
      'Getting back after a break'
    ]
  },
  {
    id: 'preference',
    text: 'Do you have any specific preferences for your coach?',
    options: [
      'Experience in specific training methods',
      'Language preferences',
      'Availability for early/late sessions',
      'No specific preferences'
    ]
  }
];

export default function CoachMatching() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }));

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const containerStyle = {
    backgroundImage: 'url(/images/backgrounds/hero-bg.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  if (isComplete) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50" style={containerStyle}>
        <div className="absolute inset-0 bg-black opacity-30" />
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative z-10">
          <h2 className="text-2xl font-bold text-[#76777A] mb-6">Perfect Match!</h2>
          <p className="text-[#B1B1B1] mb-6">
            Based on your preferences, we're matching you with the perfect coach.
          </p>
          <div className="animate-pulse flex justify-center items-center mb-6">
            <div className="w-16 h-16 bg-[#4AC1E0] rounded-full"></div>
          </div>
          <button
            className="w-full bg-[#4AC1E0] hover:bg-[#E0DF00] text-white font-bold py-3 px-6 rounded-lg transition-colors"
            onClick={() => {
              // Handle matching completion
              console.log('Matching complete:', answers);
            }}
          >
            View Matched Coaches
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={containerStyle}>
      <div className="absolute inset-0 bg-black opacity-30" />
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative z-10">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-[#76777A]">Coach Matching</h2>
            <span className="text-[#B1B1B1]">
              {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>
          <div className="w-full bg-[#D8D8D6] h-2 rounded-full">
            <div
              className="bg-[#4AC1E0] h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentQuestionIndex}
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
          >
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#76777A] mb-4">
                {questions[currentQuestionIndex].text}
              </h3>
              <div className="space-y-3">
                {questions[currentQuestionIndex].options.map((option) => (
                  <button
                    key={option}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200
                      ${
                        answers[questions[currentQuestionIndex].id] === option
                          ? 'border-[#4AC1E0] bg-[#4AC1E0] bg-opacity-10 text-[#4AC1E0]'
                          : 'border-[#D8D8D6] hover:border-[#4AC1E0] text-[#76777A] hover:bg-[#4AC1E0] hover:bg-opacity-5'
                      }
                    `}
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
} 
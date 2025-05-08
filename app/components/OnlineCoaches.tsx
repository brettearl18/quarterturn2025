'use client';

import { useState } from 'react';
import Image from 'next/image';
import { UserIcon, ChatBubbleLeftRightIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Coach {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  image: string;
  availability: string;
  price: number;
  expertise: string[];
  languages: string[];
  description: string;
}

interface Message {
  type: 'ai' | 'user';
  content: string;
  options?: string[];
}

const coaches: Coach[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    specialty: "Strength & Conditioning",
    rating: 4.9,
    reviews: 128,
    image: "https://placehold.co/400x400/4AC1E0/FFFFFF.png?text=Sarah+J",
    availability: "Available Now",
    price: 75,
    expertise: ["Weight Training", "HIIT", "Sports Performance"],
    languages: ["English", "Spanish"],
    description: "Certified strength coach with 8+ years of experience helping clients achieve their fitness goals."
  },
  {
    id: 2,
    name: "Mike Thompson",
    specialty: "CrossFit & HIIT",
    rating: 4.8,
    reviews: 95,
    image: "https://placehold.co/400x400/4AC1E0/FFFFFF.png?text=Mike+T",
    availability: "Available in 1 hour",
    price: 65,
    expertise: ["CrossFit", "Functional Training", "Olympic Lifting"],
    languages: ["English"],
    description: "CrossFit Level 2 trainer specializing in high-intensity workouts and functional movement."
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    specialty: "Nutrition & Weight Loss",
    rating: 5.0,
    reviews: 156,
    image: "https://placehold.co/400x400/4AC1E0/FFFFFF.png?text=Elena+R",
    availability: "Available Now",
    price: 80,
    expertise: ["Nutrition Planning", "Weight Management", "Meal Prep"],
    languages: ["English", "Spanish"],
    description: "Registered dietitian and certified trainer focused on sustainable weight loss through nutrition and exercise."
  },
  {
    id: 4,
    name: "David Kim",
    specialty: "Mobility & Recovery",
    rating: 4.7,
    reviews: 82,
    image: "https://placehold.co/400x400/4AC1E0/FFFFFF.png?text=David+K",
    availability: "Available in 2 hours",
    price: 70,
    expertise: ["Mobility Work", "Injury Prevention", "Yoga"],
    languages: ["English", "Korean"],
    description: "Physical therapist and mobility specialist helping clients move better and prevent injuries."
  }
];

const initialQuestions = [
  {
    content: "Hi! I'm your fitness assistant. I'll help match you with the perfect coach. What's your primary fitness goal?",
    options: [
      "Build muscle & strength",
      "Lose weight",
      "Improve fitness & endurance",
      "Recovery & mobility",
      "Sports performance"
    ]
  },
  {
    content: "How would you describe your current fitness level?",
    options: [
      "Beginner - New to fitness",
      "Intermediate - Some experience",
      "Advanced - Regular training",
      "Getting back after a break"
    ]
  },
  {
    content: "Do you have any specific preferences for your coach?",
    options: [
      "Experience in specific training methods",
      "Language preferences",
      "Availability for early/late sessions",
      "No specific preferences"
    ]
  }
];

export default function OnlineCoaches() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showCoaches, setShowCoaches] = useState(false);
  const [matchedCoaches, setMatchedCoaches] = useState<Coach[]>([]);
  const [userResponses, setUserResponses] = useState<string[]>([]);

  const handleStart = () => {
    setMessages([{
      type: 'ai',
      content: initialQuestions[0].content,
      options: initialQuestions[0].options
    }]);
  };

  const handleAnswer = (answer: string) => {
    // Add user's response
    setMessages(prev => [...prev, { type: 'user', content: answer }]);
    setUserResponses(prev => [...prev, answer]);

    // If we have more questions, ask the next one
    if (currentQuestion < initialQuestions.length - 1) {
      const nextQuestion = initialQuestions[currentQuestion + 1];
      setTimeout(() => {
        setMessages(prev => [...prev, {
          type: 'ai',
          content: nextQuestion.content,
          options: nextQuestion.options
        }]);
        setCurrentQuestion(prev => prev + 1);
      }, 500);
    } else {
      // Match coaches based on responses
      setTimeout(() => {
        const matched = matchCoaches(userResponses);
        setMatchedCoaches(matched);
        setMessages(prev => [...prev, {
          type: 'ai',
          content: "Based on your preferences, I've found some great coaches that would be perfect for you:"
        }]);
        setShowCoaches(true);
      }, 500);
    }
  };

  const matchCoaches = (responses: string[]): Coach[] => {
    // Simple matching logic - can be made more sophisticated
    let matched = [...coaches];
    
    if (responses[0].includes("strength")) {
      matched = matched.filter(coach => 
        coach.expertise.some(exp => exp.toLowerCase().includes("strength") || exp.toLowerCase().includes("weight"))
      );
    } else if (responses[0].includes("weight")) {
      matched = matched.filter(coach => 
        coach.expertise.some(exp => exp.toLowerCase().includes("weight") || exp.toLowerCase().includes("nutrition"))
      );
    } else if (responses[0].includes("mobility")) {
      matched = matched.filter(coach => 
        coach.expertise.some(exp => exp.toLowerCase().includes("mobility") || exp.toLowerCase().includes("recovery"))
      );
    }

    // Return top 3 matches
    return matched.slice(0, 3);
  };

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
          handleStart();
        }}
        className="flex items-center gap-2 bg-[#4AC1E0] text-white px-4 py-2 rounded-lg hover:bg-[#E0DF00] hover:text-[#76777A] transition-colors"
      >
        <ChatBubbleLeftRightIcon className="h-5 w-5" />
        <span>Speak to a Coach</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#76777A]">Coach Matching</h2>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setMessages([]);
                  setCurrentQuestion(0);
                  setShowCoaches(false);
                  setMatchedCoaches([]);
                  setUserResponses([]);
                }}
                className="text-[#B1B1B1] hover:text-[#76777A]"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-lg p-4 ${
                      message.type === 'user' 
                        ? 'bg-[#4AC1E0] text-white' 
                        : 'bg-[#D8D8D6] bg-opacity-20 text-[#76777A]'
                    }`}>
                      <p>{message.content}</p>
                      {message.options && (
                        <div className="mt-4 space-y-2">
                          {message.options.map((option, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleAnswer(option)}
                              className="w-full text-left px-4 py-2 rounded-lg bg-white hover:bg-[#E0DF00] hover:text-[#76777A] transition-colors"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {showCoaches && (
                <div className="mt-8 space-y-6">
                  {matchedCoaches.map((coach) => (
                    <div key={coach.id} className="bg-[#D8D8D6] bg-opacity-20 rounded-lg p-4 flex gap-4">
                      <Image
                        src={coach.image}
                        alt={coach.name}
                        width={100}
                        height={100}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#76777A]">{coach.name}</h3>
                        <p className="text-[#B1B1B1] text-sm">{coach.specialty}</p>
                        <p className="text-[#76777A] text-sm mt-2">{coach.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[#E0DF00]">★</span>
                          <span className="text-[#76777A]">{coach.rating}</span>
                          <span className="text-[#B1B1B1] text-sm">({coach.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-[#4AC1E0] font-semibold">${coach.price}/hour</span>
                          <span className={`text-sm ${coach.availability.includes('Now') ? 'text-green-500' : 'text-[#E0DF00]'}`}>
                            {coach.availability}
                          </span>
                        </div>
                        <button className="w-full mt-2 bg-[#4AC1E0] text-white py-2 rounded-lg font-semibold hover:bg-[#E0DF00] hover:text-[#76777A] transition-colors">
                          Start Chat
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
} 
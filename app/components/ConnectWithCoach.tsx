import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaCheck } from 'react-icons/fa';
import { BsChatDotsFill } from 'react-icons/bs';
import Image from 'next/image';
import { XMarkIcon } from '@heroicons/react/24/outline';
import CoachProfileModal from './CoachProfileModal';

interface Coach {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  availability: string;
  image: string;
  whatsapp: string;
}

const coaches: Coach[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    specialty: 'Weight Loss & HIIT',
    experience: '8 years',
    rating: 4.9,
    availability: 'Available Now',
    image: 'https://placehold.co/400x400/4AC1E0/FFFFFF.png?text=SJ',
    whatsapp: '61400442513'
  },
  {
    id: '2',
    name: 'Mike Thompson',
    specialty: 'Strength & Conditioning',
    experience: '10 years',
    rating: 4.8,
    availability: 'Available in 1 hour',
    image: 'https://placehold.co/400x400/4AC1E0/FFFFFF.png?text=MT',
    whatsapp: '61400442513'
  },
  {
    id: '3',
    name: 'Emma Davis',
    specialty: 'Yoga & Flexibility',
    experience: '6 years',
    rating: 4.7,
    availability: 'Available Now',
    image: 'https://placehold.co/400x400/4AC1E0/FFFFFF.png?text=ED',
    whatsapp: '61400442513'
  }
];

interface ConnectWithCoachProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
}

export default function ConnectWithCoach({ onSubmit, onClose }: ConnectWithCoachProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    goal: '',
    preferredTime: '',
    currentActivity: '',
    healthConcerns: '',
    motivation: '',
    selectedCoach: null as Coach | null,
  });
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [submittedCoachIds, setSubmittedCoachIds] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      onSubmit(formData);
    }
  };

  const connectViaWhatsApp = (coach: Coach) => {
    const message = encodeURIComponent(
      `Hi ${coach.name}, I'm ${formData.name} and I'm interested in coaching for ${formData.goal}. Would love to discuss further!`
    );
    window.open(`https://wa.me/${coach.whatsapp}?text=${message}`, '_blank');
  };

  const startLiveChat = (coach: Coach) => {
    console.log('Starting live chat with', coach.name);
    alert(`Live chat with ${coach.name} will be available soon!`);
  };

  const submitEnquiry = (coach: Coach) => {
    setSubmittedCoachIds((prev) => [...prev, coach.id]);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-gray-900 rounded-xl shadow-2xl w-full max-w-2xl mx-4 my-8 overflow-hidden border border-[#4AC1E0]/20"
      >
        <div className="relative bg-[#4AC1E0] px-8 py-6">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
              {step === 1 ? "Let's Get Started!" :
               step === 2 ? "Tell Us More About You" :
               "Choose Your Perfect Coach"}
            </h2>
            <p className="text-white/90 text-lg">
              {step === 1 ? "Tell us about your fitness journey and goals" :
               step === 2 ? "Help us understand your health and lifestyle better" :
               "Find your ideal fitness match"}
            </p>
            <div className="flex items-center justify-center mt-4 space-x-2">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors ${
                step > 1 ? 'bg-green-500 text-white' : 
                step === 1 ? 'bg-white text-[#4AC1E0]' : 
                'bg-white/30 text-white/30'
              }`}>
                {step > 1 ? <FaCheck className="w-4 h-4" /> : '1'}
              </div>
              <div className={`h-0.5 w-8 transition-colors ${
                step > 1 ? 'bg-green-500' : 'bg-white/30'
              }`} />
              <div className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors ${
                step > 2 ? 'bg-green-500 text-white' : 
                step === 2 ? 'bg-white text-[#4AC1E0]' : 
                'bg-white/30 text-white/30'
              }`}>
                {step > 2 ? <FaCheck className="w-4 h-4" /> : '2'}
              </div>
              <div className={`h-0.5 w-8 transition-colors ${
                step > 2 ? 'bg-green-500' : 'bg-white/30'
              }`} />
              <div className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors ${
                step === 3 ? 'bg-white text-[#4AC1E0]' : 
                'bg-white/30 text-white/30'
              }`}>
                3
              </div>
            </div>
          </div>
        </div>
        
        {step === 1 ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#4AC1E0] mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#4AC1E0] focus:ring-1 focus:ring-[#4AC1E0]"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#4AC1E0] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#4AC1E0] focus:ring-1 focus:ring-[#4AC1E0]"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#4AC1E0] mb-1">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#4AC1E0] focus:ring-1 focus:ring-[#4AC1E0]"
                  placeholder="+1 (234) 567-8900"
                  required
                />
              </div>

              <div>
                <label htmlFor="goal" className="block text-sm font-medium text-[#4AC1E0] mb-1">
                  Fitness Goal
                </label>
                <select
                  id="goal"
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#4AC1E0] focus:ring-1 focus:ring-[#4AC1E0]"
                  required
                >
                  <option value="">Select your goal</option>
                  <option value="weight-loss">Weight Loss</option>
                  <option value="muscle-gain">Muscle Gain</option>
                  <option value="strength">Strength Training</option>
                  <option value="endurance">Endurance</option>
                  <option value="flexibility">Flexibility</option>
                  <option value="general">General Fitness</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="preferredTime" className="block text-sm font-medium text-[#4AC1E0] mb-1">
                When would you like to be contacted?
              </label>
              <select
                id="preferredTime"
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#4AC1E0] focus:ring-1 focus:ring-[#4AC1E0]"
                required
              >
                <option value="">Choose a time</option>
                <option value="morning">Morning (9AM - 12PM)</option>
                <option value="afternoon">Afternoon (12PM - 5PM)</option>
                <option value="evening">Evening (5PM - 8PM)</option>
              </select>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#4AC1E0] text-white rounded-lg font-medium hover:bg-[#4AC1E0]/90 transition-colors"
              >
                Next: Tell Us More About You
              </button>
            </div>
          </form>
        ) : step === 2 ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-4">
              <div>
                <label htmlFor="currentActivity" className="block text-sm font-medium text-[#4AC1E0] mb-1">
                  What's your current activity level?
                </label>
                <select
                  id="currentActivity"
                  value={formData.currentActivity}
                  onChange={(e) => setFormData({ ...formData, currentActivity: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#4AC1E0] focus:ring-1 focus:ring-[#4AC1E0]"
                  required
                >
                  <option value="">Select your activity level</option>
                  <option value="sedentary">Sedentary (Little to no exercise)</option>
                  <option value="light">Light (1-2 days/week)</option>
                  <option value="moderate">Moderate (3-4 days/week)</option>
                  <option value="active">Active (5+ days/week)</option>
                  <option value="very-active">Very Active (Professional/Athlete)</option>
                </select>
              </div>

              <div>
                <label htmlFor="healthConcerns" className="block text-sm font-medium text-[#4AC1E0] mb-1">
                  Do you have any health concerns or limitations?
                </label>
                <textarea
                  id="healthConcerns"
                  value={formData.healthConcerns}
                  onChange={(e) => setFormData({ ...formData, healthConcerns: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#4AC1E0] focus:ring-1 focus:ring-[#4AC1E0] min-h-[80px]"
                  placeholder="Please share any injuries, medical conditions, or limitations we should know about..."
                  required
                />
              </div>

              <div>
                <label htmlFor="motivation" className="block text-sm font-medium text-[#4AC1E0] mb-1">
                  What motivates you to make a change now?
                </label>
                <textarea
                  id="motivation"
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#4AC1E0] focus:ring-1 focus:ring-[#4AC1E0] min-h-[80px]"
                  placeholder="Tell us what inspired you to start your fitness journey..."
                  required
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#4AC1E0] text-white rounded-lg font-medium hover:bg-[#4AC1E0]/90 transition-colors"
              >
                Next: Choose Your Coach
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6 space-y-4">
            <div className="mb-4 text-center text-lg text-white/80 font-semibold">Select a coach to view more details or connect:</div>
            <div className="space-y-4">
              {coaches.map((coach) => (
                <div
                  key={coach.id}
                  className="bg-[#232B34] rounded-lg p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#2A3542] transition"
                  onClick={() => setSelectedCoach(coach)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#4AC1E0] flex items-center justify-center text-xl font-bold text-white overflow-hidden">
                      {coach.image ? (
                        <img src={coach.image} alt={coach.name} className="w-12 h-12 object-cover rounded-full" />
                      ) : (
                        coach.name.split(' ').map((n) => n[0]).join('')
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-white text-lg">{coach.name}</div>
                      <div className="text-[#4AC1E0] text-sm">{coach.specialty}</div>
                      <div className="text-gray-400 text-xs">{coach.experience} experience</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-white text-sm">{coach.rating}</span>
                        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${coach.availability.includes('Now') ? 'bg-green-400/10 text-green-400' : 'bg-yellow-400/10 text-yellow-400'}`}>{coach.availability}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {submittedCoachIds.includes(coach.id) ? (
                      <span className="text-green-400 font-semibold">Enquiry sent!</span>
                    ) : (
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold text-sm transition"
                        onClick={e => { e.stopPropagation(); submitEnquiry(coach); }}
                      >
                        Submit Enquiry
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
            {selectedCoach && (
              <CoachProfileModal coach={selectedCoach} onClose={() => setSelectedCoach(null)} />
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
} 
export const mockCoachData = {
  account: {
    email: 'test.coach@example.com',
    password: 'Test123!@#',
    confirmPassword: 'Test123!@#'
  },
  profile: {
    name: 'Sarah Johnson',
    bio: 'Certified life coach with 8 years of experience helping clients achieve their personal and professional goals. Specializing in career transitions, work-life balance, and personal development.',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    location: 'San Francisco, CA',
    phone: '+1 (555) 123-4567'
  },
  professional: {
    specialties: [
      'Career Coaching',
      'Life Coaching',
      'Executive Coaching',
      'Personal Development'
    ],
    experience: '8',
    certifications: [
      'International Coach Federation (ICF) Certified',
      'Professional Certified Coach (PCC)',
      'Master of Science in Psychology'
    ],
    education: 'Master of Science in Psychology, Stanford University\nBachelor of Arts in Counseling, UC Berkeley',
    credentials: [
      'https://example.com/cert1.pdf',
      'https://example.com/cert2.pdf'
    ]
  },
  services: {
    services: [
      {
        id: '1',
        name: 'Initial Consultation',
        description: 'A 60-minute session to understand your goals and create a personalized coaching plan.',
        duration: '60 minutes',
        price: '$150',
        type: 'one-time'
      },
      {
        id: '2',
        name: 'Career Transition Package',
        description: 'A comprehensive 3-month program to help you navigate career changes and find your ideal role.',
        duration: '3 months',
        price: '$1,200',
        type: 'package'
      },
      {
        id: '3',
        name: 'Executive Coaching',
        description: 'Tailored coaching for executives and leaders to enhance leadership skills and organizational impact.',
        duration: '90 minutes',
        price: '$250',
        type: 'one-time'
      }
    ]
  },
  availability: {
    timeSlots: [
      {
        day: 'Monday',
        startTime: '09:00',
        endTime: '17:00'
      },
      {
        day: 'Tuesday',
        startTime: '09:00',
        endTime: '17:00'
      },
      {
        day: 'Wednesday',
        startTime: '09:00',
        endTime: '17:00'
      },
      {
        day: 'Thursday',
        startTime: '09:00',
        endTime: '17:00'
      },
      {
        day: 'Friday',
        startTime: '09:00',
        endTime: '15:00'
      }
    ]
  },
  verification: {
    verificationDocuments: [
      'https://example.com/icf-cert.pdf',
      'https://example.com/psychology-degree.pdf'
    ],
    agreeToVerification: true,
    agreeToBackgroundCheck: true
  }
};

// Mock image URLs for testing
export const mockImages = {
  profile: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
  credentials: [
    'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  ],
  verification: [
    'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  ]
};

// Mock validation errors for testing
export const mockValidationErrors = {
  account: {
    email: 'Please enter a valid email address',
    password: 'Password must be at least 8 characters long'
  },
  profile: {
    name: 'Name is required',
    bio: 'Bio must be at least 50 characters long'
  },
  professional: {
    specialties: 'Please select at least one specialty',
    experience: 'Years of experience is required'
  },
  services: {
    services: 'Please add at least one service'
  },
  availability: {
    timeSlots: 'Please add at least one time slot'
  },
  verification: {
    verificationDocuments: 'Please upload at least one verification document'
  }
}; 
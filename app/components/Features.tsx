'use client';

import { 
  TruckIcon, 
  StarIcon, 
  ArrowPathIcon, 
  ChatBubbleBottomCenterTextIcon, 
  CreditCardIcon 
} from '@heroicons/react/24/outline';

const features = [
  {
    icon: TruckIcon,
    title: 'Free Delivery',
    subtitle: 'from $40'
  },
  {
    icon: StarIcon,
    title: 'Best Quality',
    subtitle: 'Brand'
  },
  {
    icon: ArrowPathIcon,
    title: '1 Year',
    subtitle: 'for free Return'
  },
  {
    icon: ChatBubbleBottomCenterTextIcon,
    title: 'Feedback',
    subtitle: '99% Real Data'
  },
  {
    icon: CreditCardIcon,
    title: 'Payment',
    subtitle: 'Secure'
  }
];

export default function Features() {
  return (
    <section className="py-12 border-t border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 mb-4 rounded-full bg-[#4AC1E0] bg-opacity-10 flex items-center justify-center group-hover:bg-opacity-20 transition-all">
                <feature.icon className="w-8 h-8 text-[#4AC1E0]" />
              </div>
              <h3 className="font-semibold text-[#76777A] mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-[#B1B1B1]">
                {feature.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 
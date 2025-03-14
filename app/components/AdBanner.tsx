'use client';

import { motion } from 'framer-motion';

interface AdBannerProps {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  imageSrc: string;
}

export default function AdBanner({ title, description, ctaText, ctaLink, imageSrc }: AdBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg overflow-hidden shadow-lg"
    >
      <div className="flex flex-col md:flex-row items-center p-6 md:p-8">
        <div className="flex-1 text-white mb-6 md:mb-0 md:mr-8">
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-white/90 mb-4">{description}</p>
          <a
            href={ctaLink}
            className="inline-block bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-50 transition-colors"
          >
            {ctaText}
          </a>
        </div>
        <div className="w-full md:w-1/3">
          <img
            src={imageSrc}
            alt="Promotional content"
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      </div>
    </motion.div>
  );
} 
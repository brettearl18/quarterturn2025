'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'John Smith',
      role: 'CEO & Founder',
      image: '/images/team/john-smith.jpg',
      bio: 'With over 15 years of experience in the fitness industry...'
    },
    {
      name: 'Sarah Johnson',
      role: 'Head of Operations',
      image: '/images/team/sarah-johnson.jpg',
      bio: 'Leading our operations with expertise in business development...'
    },
    {
      name: 'Mike Chen',
      role: 'Technical Director',
      image: '/images/team/mike-chen.jpg',
      bio: 'Bringing innovative solutions to our platform...'
    }
  ];

  const values = [
    {
      title: 'Innovation',
      description: 'Constantly evolving and improving our platform to meet the changing needs of the fitness industry.'
    },
    {
      title: 'Community',
      description: 'Building strong relationships between fitness professionals and clients.'
    },
    {
      title: 'Excellence',
      description: 'Maintaining the highest standards in service quality and user experience.'
    },
    {
      title: 'Integrity',
      description: 'Operating with transparency and honesty in all our business practices.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative h-[400px] bg-black text-white"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-4">About Quarter Turn</h1>
          <p className="text-xl max-w-2xl">
            Empowering fitness professionals and enthusiasts through innovative marketplace solutions.
          </p>
        </div>
      </motion.section>

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600">
              To revolutionize the fitness industry by creating a comprehensive marketplace that connects professionals with clients, 
              facilitates seamless transactions, and promotes growth within the fitness community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg overflow-hidden"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-yellow-600 mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 
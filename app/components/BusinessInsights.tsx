'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

interface Insight {
  id: string;
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

interface Event {
  id: string;
  title: string;
  date: string;
  type: 'webinar' | 'workshop' | 'networking';
  attendees: number;
}

interface SuccessStory {
  id: string;
  businessName: string;
  metric: string;
  improvement: string;
  quote: string;
  author: string;
}

const insights: Insight[] = [
  {
    id: '1',
    title: 'Active Members',
    value: '2,547',
    change: 12,
    trend: 'up'
  },
  {
    id: '2',
    title: 'Avg. Session Duration',
    value: '45 mins',
    change: 8,
    trend: 'up'
  },
  {
    id: '3',
    title: 'Client Retention',
    value: '87%',
    change: 5,
    trend: 'up'
  }
];

const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Business Growth Strategies',
    date: '2024-03-25',
    type: 'webinar',
    attendees: 156
  },
  {
    id: '2',
    title: 'Client Retention Workshop',
    date: '2024-03-28',
    type: 'workshop',
    attendees: 45
  },
  {
    id: '3',
    title: 'Fitness Industry Meetup',
    date: '2024-04-02',
    type: 'networking',
    attendees: 89
  }
];

const successStories: SuccessStory[] = [
  {
    id: '1',
    businessName: 'Elite Performance Training',
    metric: 'Client Base',
    improvement: '150% growth',
    quote: "The directory's AI matching helped us connect with our ideal clients.",
    author: 'Sarah Chen, Owner'
  },
  {
    id: '2',
    businessName: 'CrossFit Revolution',
    metric: 'Revenue',
    improvement: '85% increase',
    quote: "Premium listing boosted our visibility and transformed our business.",
    author: 'Mike Torres, Founder'
  }
];

export default function BusinessInsights() {
  const [activeTab, setActiveTab] = useState<'metrics' | 'events' | 'stories'>('metrics');

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Featured Business Insights</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-4 py-2 rounded-md text-sm transition-colors ${
              activeTab === 'metrics'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Metrics
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2 rounded-md text-sm transition-colors ${
              activeTab === 'events'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Events
          </button>
          <button
            onClick={() => setActiveTab('stories')}
            className={`px-4 py-2 rounded-md text-sm transition-colors ${
              activeTab === 'stories'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Success Stories
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'metrics' && (
          <div className="grid grid-cols-3 gap-6">
            {insights.map(insight => (
              <div key={insight.id} className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-600">{insight.title}</h3>
                <div className="mt-2 flex items-end gap-2">
                  <span className="text-2xl font-bold text-gray-900">{insight.value}</span>
                  <span className={`text-sm ${
                    insight.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {insight.trend === 'up' ? '↑' : '↓'} {insight.change}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-4">
            {upcomingEvents.map(event => (
              <div key={event.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium capitalize bg-blue-100 text-blue-800">
                      {event.type}
                    </span>
                    <p className="text-sm text-gray-600 mt-1">{event.attendees} attending</p>
                  </div>
                </div>
              </div>
            ))}
            <Link 
              href="/events"
              className="block text-center text-sm text-blue-600 hover:text-blue-800 mt-4"
            >
              View All Events →
            </Link>
          </div>
        )}

        {activeTab === 'stories' && (
          <div className="space-y-6">
            {successStories.map(story => (
              <div key={story.id} className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-medium text-gray-900">{story.businessName}</h3>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {story.improvement}
                  </span>
                </div>
                <blockquote className="text-gray-600 italic mb-4">"{story.quote}"</blockquote>
                <p className="text-sm text-gray-500">- {story.author}</p>
              </div>
            ))}
            <Link 
              href="/success-stories"
              className="block text-center text-sm text-blue-600 hover:text-blue-800 mt-4"
            >
              Read More Success Stories →
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
} 
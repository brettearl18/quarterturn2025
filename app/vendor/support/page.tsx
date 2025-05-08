'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const faqs = [
  {
    question: 'How do I get started as a vendor?',
    answer: 'To become a vendor, click on the "Become a Vendor" link and fill out the registration form. You\'ll need to provide your business information and accept our terms and conditions. Once submitted, our team will review your application and get back to you within 2-3 business days.'
  },
  {
    question: 'What are the fees and commissions?',
    answer: 'We charge a base commission of 10% on each sale. Additional fees may apply for premium features or promotional opportunities. All fees are automatically calculated and deducted from your earnings.'
  },
  {
    question: 'How do I manage my inventory?',
    answer: 'You can manage your inventory through the vendor dashboard. We provide tools to bulk upload products, sync inventory across multiple platforms, and track stock levels in real-time.'
  },
  {
    question: 'How are payments processed?',
    answer: 'Payments are processed automatically every two weeks. We support direct bank deposits and PayPal. You can view your earnings and pending payments in the vendor dashboard.'
  },
  {
    question: 'What happens if there\'s a dispute?',
    answer: 'We have a dedicated dispute resolution team. If a customer raises an issue, you\'ll be notified immediately through your dashboard and email. We aim to resolve all disputes within 48 hours.'
  }
];

const supportChannels = [
  {
    title: 'Email Support',
    description: 'Send us an email for non-urgent inquiries',
    contact: 'vendor.support@example.com',
    responseTime: '24-48 hours'
  },
  {
    title: 'Phone Support',
    description: 'Call us for urgent matters',
    contact: '1-800-VENDOR-HELP',
    responseTime: 'Mon-Fri, 9am-5pm EST'
  },
  {
    title: 'Live Chat',
    description: 'Chat with our support team',
    contact: 'Available in dashboard',
    responseTime: 'Instant during business hours'
  }
];

export default function VendorSupport() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Vendor Support</h1>
          <p className="mt-4 text-lg text-gray-600">
            We're here to help you succeed on our platform
          </p>
        </div>

        {/* Support Channels */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {supportChannels.map((channel, index) => (
            <div
              key={index}
              className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
            >
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">{channel.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{channel.description}</p>
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-900">Contact:</p>
                  <p className="mt-1 text-sm text-gray-600">{channel.contact}</p>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-900">Response Time:</p>
                  <p className="mt-1 text-sm text-gray-600">{channel.responseTime}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <button
                    className="w-full flex justify-between items-center text-left"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                    <ChevronDownIcon
                      className={`h-5 w-5 text-gray-500 transform transition-transform ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === index && (
                    <p className="mt-4 text-gray-600">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Support */}
        <div className="mt-12 bg-yellow-50 rounded-lg px-6 py-8">
          <h2 className="text-xl font-semibold text-yellow-900">Need More Help?</h2>
          <p className="mt-2 text-yellow-700">
            Our vendor success team is available for one-on-one consultations to help you grow your 
            business on our platform. Schedule a call with one of our experts to discuss your specific 
            needs.
          </p>
          <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
            Schedule a Consultation
          </button>
        </div>
      </div>
    </div>
  );
} 
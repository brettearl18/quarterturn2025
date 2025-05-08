'use client';

import { useState } from 'react';
import { ChatBubbleLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function TrainerChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (!message.trim()) return;
    // TODO: Implement chat functionality
    setMessage('');
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-[#4AC1E0] text-white p-3 rounded-full shadow-lg hover:bg-[#E0DF00] transition-colors"
      >
        <ChatBubbleLeftIcon className="h-6 w-6" />
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-[#76777A] hover:text-[#4AC1E0] transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            
            <div className="p-6">
              <h2 className="text-xl font-semibold text-[#76777A] mb-4">Chat with a Fitness Expert</h2>
              <div className="space-y-4">
                <div className="bg-[#D8D8D6] bg-opacity-20 p-4 rounded-lg">
                  <p className="text-[#76777A]">
                    Hi! I'm your personal fitness expert. How can I help you today?
                  </p>
                </div>
                <div className="flex">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 border border-[#D8D8D6] rounded-l-lg px-4 py-2 focus:outline-none focus:border-[#4AC1E0] text-[#76777A]"
                  />
                  <button 
                    onClick={handleSendMessage}
                    className="bg-[#4AC1E0] text-white px-6 py-2 rounded-r-lg hover:bg-[#E0DF00] transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 
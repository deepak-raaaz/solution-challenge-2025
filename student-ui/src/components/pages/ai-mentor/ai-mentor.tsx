'use client';

import React, { useState, useEffect, useRef } from 'react';
import quickActions from './quick-actions.json';

// Types
interface Message {
  id: string;
  text: string;
  sender: 'ai' | 'user';
  timestamp: string;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// ChatHeader Component
const ChatHeader: React.FC = () => {
  return (
    <div className="bg-gray-800/20 border border-gray-700/40 p-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-[#1E90FF] rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
        </div>
        <div>
          <h3 className="text-[#E6E6E6] font-semibold">AI Mentor</h3>
          <p className="text-[#E6E6E6]/60 text-sm">Online • Ready to help</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button className="text-[#E6E6E6]/60 hover:text-[#E6E6E6] p-2 rounded-lg hover:bg-neutral-200/10 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

// ChatMessages Component
const ChatMessages: React.FC<{ messages: Message[]; isTyping: boolean }> = ({ messages, isTyping }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="h-96 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div key={message.id} className={`flex items-start space-x-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
          {message.sender === 'ai' && (
            <div className="w-8 h-8 bg-[#1E90FF] rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
          )}
          <div
            className={`rounded-lg p-3 max-w-xs sm:max-w-md ${
              message.sender === 'user' ? 'bg-[#1E90FF] text-white' : 'bg-gray-800/40 border border-gray-700/40 text-[#E6E6E6]'
            }`}
          >
            <p className="text-sm">{message.text}</p>
            {message.sender === 'ai' && message.id === 'ai-response' && (
              <div className="mt-2 flex flex-wrap gap-2">
                <button className="bg-[#1E90FF]/20 text-[#1E90FF] px-3 py-1 rounded-full text-xs hover:bg-[#1E90FF]/30 transition-colors">
                  Create Learning Path
                </button>
                <button className="bg-[#1E90FF]/20 text-[#1E90FF] px-3 py-1 rounded-full text-xs hover:bg-[#1E90FF]/30 transition-colors">
                  Explain Linear Regression
                </button>
              </div>
            )}
            <span className={`text-xs ${message.sender === 'user' ? 'text-white/70' : 'text-[#E6E6E6]/50'}`}>
              {message.timestamp}
            </span>
          </div>
          {message.sender === 'user' && (
            <div className="w-8 h-8 bg-gray-800/40 border border-gray-700/40 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-medium">U</span>
            </div>
          )}
        </div>
      ))}
      {isTyping && (
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-[#1E90FF] rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div className="g-gray-800/40 border border-gray-700/40 rounded-lg p-3">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-[#E6E6E6]/60 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-[#E6E6E6]/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-[#E6E6E6]/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

// ChatInput Component
const ChatInput: React.FC<{ onSend: (text: string) => void }> = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <div className="border-t border-gray-700/40 p-4">
      <div className="flex items-center space-x-3">
        <button className="text-[#E6E6E6]/60 hover:text-[#E6E6E6] p-2 rounded-lg hover:bg-neutral-200/10 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
          </svg>
        </button>
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Ask your AI mentor anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
            className="w-full bg-gray-800/20 border border-gray-700/40 rounded-lg px-4 py-3 text-[#E6E6E6] placeholder-[#E6E6E6]/50 focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:border-transparent"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-[#1E90FF] text-white p-3 rounded-lg hover:bg-[#1E90FF]/90 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

// QuickActionCard Component
const QuickActionCard: React.FC<{ action: QuickAction }> = ({ action }) => {
  return (
    <button className="bg-gray-800/20 border border-gray-700/40 rounded-lg p-4 text-left hover:border-[#1E90FF]/50 transition-colors group">
      <div className="flex items-center space-x-3 mb-2">
        <div className="w-8 h-8 bg-gray-800/20 border border-gray-700/40 rounded-lg flex items-center justify-center group-hover:bg-[#1E90FF]/30 transition-colors">
          <svg className="w-4 h-4 text-[#1E90FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={action.icon}></path>
          </svg>
        </div>
        <h3 className="text-[#E6E6E6] font-medium">{action.title}</h3>
      </div>
      <p className="text-[#E6E6E6]/60 text-sm">{action.description}</p>
    </button>
  );
};

// Main AIMentorChat Component
const AIMentor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'ai-welcome',
      text: "Hello! I'm your AI learning mentor. How can I help you today? I can assist with course recommendations, explain concepts, or answer questions about your learning path.",
      sender: 'ai',
      timestamp: '2:30 PM',
    },
    {
      id: 'user-message',
      text: "I'm struggling with understanding machine learning algorithms. Can you help?",
      sender: 'user',
      timestamp: '2:32 PM',
    },
    {
      id: 'ai-response',
      text: "Absolutely! Let's break down ML algorithms step by step. I recommend starting with linear regression - it's the foundation. Would you like me to create a personalized learning path for you?",
      sender: 'ai',
      timestamp: '2:33 PM',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (text: string) => {
    const newMessage: Message = {
      id: `user-${Date.now()}`,
      text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: `ai-${Date.now()}`,
        text: "Got it! Let’s dive deeper. Would you like a detailed explanation of a specific algorithm or a broader overview?",
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <section id="ai-mentor-chat" className="b py-16 px-4 sm:px-6 lg:px-8 max-lg:py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#E6E6E6] mb-4">AI Mentor Chat</h2>
          <p className="text-lg text-[#E6E6E6]/80 max-w-2xl mx-auto">
            Get instant help and personalized guidance from your AI learning companion
          </p>
        </div>

        {/* Chat Container */}
        <div className="g-gray-800/20 border border-gray-700/40 rounded-xl  overflow-hidden">
          <ChatHeader />
          <ChatMessages messages={messages} isTyping={isTyping} />
          <ChatInput onSend={handleSend} />
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action: QuickAction) => (
            <QuickActionCard key={action.id} action={action} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIMentor;
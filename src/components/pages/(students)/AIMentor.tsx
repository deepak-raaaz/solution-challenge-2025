// app/ai-mentor/page.tsx
'use client';

import { useState } from 'react';

interface Message {
  id: number;
  sender: 'AI' | 'User';
  text: string;
  timestamp: string;
}

interface Recommendation {
  title: string;
  description: string;
  category: string;
  duration: string;
  icon: 'education' | 'practice';
}

const initialMessages: Message[] = [
  {
    id: 1,
    sender: 'AI',
    text: "Hello! I've noticed you've been making great progress in your Web Development track. How can I help you today?",
    timestamp: '10:30 AM',
  },
  {
    id: 2,
    sender: 'User',
    text: "Hi! I'm a bit stuck on the JavaScript promises section. Could you explain async/await in simpler terms?",
    timestamp: '10:32 AM',
  },
  {
    id: 3,
    sender: 'AI',
    text: "Of course! Think of async/await as a cleaner way to work with promises:\n\n- **async** - Declares a function that will work asynchronously\n- **await** - Pauses execution until a promise resolves\n\nIt's like saying \"wait for this to finish before continuing.\" Would you like me to show you an example?",
    timestamp: '10:34 AM',
  },
  {
    id: 4,
    sender: 'User',
    text: "Yes, an example would be really helpful!",
    timestamp: '10:35 AM',
  },
  {
    id: 5,
    sender: 'AI',
    text: "Here's a simple example:\n\n```javascript\n// Using async/await\nasync function fetchUserData() {\n  try {\n    const response = await fetch('/api/user');\n    const userData = await response.json();\n    return userData;\n  } catch (error) {\n    console.error('Error:', error);\n  }\n}\n```\n\nThis is much cleaner than using promise chains with .then(). I've also added a lesson on async/await to your recommended playlist. Would you like to see it?",
    timestamp: '10:36 AM',
  },
];

const recommendations: Recommendation[] = [
  {
    title: 'Master Async JavaScript',
    description: 'Based on your recent activity, this will help you understand promises better.',
    category: 'Intermediate',
    duration: '25 min',
    icon: 'education',
  },
  {
    title: 'API Integration Practice',
    description: 'Apply your async/await knowledge with this hands-on project.',
    category: 'Practice',
    duration: '45 min',
    icon: 'practice',
  },
];

export default function AIMentor() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'User',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, newMessage]);
    setInput('');
    // Here you could add AI response logic
  };

  return (
    <section className=" text-white min-h-screen p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* AI Mentor Info Section */}
          <div className="col-span-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Your Personal AI Mentor
            </h2>
            <p className="text-slate-300 mb-6">
              Get personalized guidance and support throughout your learning journey with our advanced AI Mentor system.
            </p>

            <div className="bg-slate-800/50 border border-slate-700/40 rounded-xl p-6 mb-8 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">How Your AI Mentor Helps</h3>
              <ul className="space-y-3">
                {[
                  'Personalized learning recommendations based on your progress',
                  'Regular performance evaluations to track your growth',
                  'Targeted suggestions to improve weak areas',
                  '24/7 support for all your learning questions',
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 mt-0.5">
                      <svg className="h-4 w-4 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-slate-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-r from-indigo-600/20 to-blue-600/20 border border-indigo-500/30 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4 text-indigo-300">Your Learning Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/50 border border-slate-700/40 rounded-lg p-4">
                  <p className="text-sm text-slate-400">Current Level</p>
                  <div className="flex items-center mt-1">
                    <svg className="h-5 w-5 text-yellow-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0115 2h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-.707-.293L14 5.414l-.707.707A1 1 0 0112 6h-2a1 1 0 01-1-1V3a1 1 0 011-1h2zm2 10a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-2xl font-bold text-white">8</span>
                  </div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700/40 rounded-lg p-4">
                  <p className="text-sm text-slate-400">Progress</p>
                  <div className="mt-2">
                    <div className="w-full bg-slate-700/50 rounded-full h-2.5">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-500 h-2.5 rounded-full" style={{ width: '65%' }} />
                    </div>
                    <p className="text-right text-sm mt-1 text-blue-300">65%</p>
                  </div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700/40 rounded-lg p-4">
                  <p className="text-sm text-slate-400">Badges Earned</p>
                  <div className="flex items-center mt-1">
                    <svg className="h-5 w-5 text-indigo-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-2xl font-bold text-white">12</span>
                  </div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700/40 rounded-lg p-4">
                  <p className="text-sm text-slate-400">Next Goal</p>
                  <p className="text-sm font-medium text-indigo-300 mt-1">Complete JavaScript Module</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Mentor Chat Section */}
          <div className="col-sapn-1">
            <div className="bg-slate-800/70 border border-slate-700/40 rounded-xl overflow-hidden flex flex-col flex-grow">
              <div className="bg-slate-900/80 p-4 border-b border-slate-700/40">
                <div className="flex items-center">
                  <div className="relative mr-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-slate-900" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">AI Mentor</h3>
                    <p className="text-xs text-slate-400">Online | Learning Assistant</p>
                  </div>
                </div>
              </div>

              <div className="p-4 flex-grow overflow-y-auto h-96 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex items-start ${message.sender === 'User' ? 'justify-end' : ''}`}>
                    {message.sender === 'AI' && (
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mr-2">
                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                    )}
                    <div
                      className={`${
                        message.sender === 'AI' ? 'bg-slate-700/40 rounded-tl-none' : 'bg-blue-600/30 rounded-tr-none'
                      } rounded-lg p-3 max-w-xs sm:max-w-md`}
                    >
                      <p className="text-sm text-slate-200 whitespace-pre-wrap">{message.text}</p>
                      <p className="text-xs text-slate-400 mt-1">{message.timestamp}</p>
                    </div>
                    {message.sender === 'User' && (
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-slate-600 flex items-center justify-center ml-2">
                        <span className="text-sm font-medium text-white">YS</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-slate-900/80 p-4 border-t border-slate-700/40">
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Ask your AI Mentor anything..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-grow bg-slate-800/50 border border-slate-700/40 rounded-lg py-2 px-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="ml-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-2 text-white"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </button>
                </div>
                <div className="flex justify-center mt-3">
                  <div className="flex space-x-3">
                    {['JavaScript basics', 'Debugging help', 'Next lesson'].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setInput(suggestion)}
                        className="bg-slate-800/60 hover:bg-slate-700/60 text-xs text-slate-300 py-1 px-3 rounded-full border border-slate-700/40 transition"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Personalized Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.map((rec) => (
                  <div
                    key={rec.title}
                    className="bg-slate-800/50 border border-slate-700/40 rounded-lg p-4 hover:bg-slate-800/70 transition cursor-pointer"
                  >
                    <div className="flex items-center mb-2">
                      {rec.icon === 'education' ? (
                        <svg className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                        </svg>
                      )}
                      <span className="font-semibold text-white">{rec.title}</span>
                    </div>
                    <p className="text-sm text-slate-300">{rec.description}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className={`text-xs ${rec.icon === 'education' ? 'bg-blue-600/20 text-blue-400' : 'bg-green-600/20 text-green-400'} py-0.5 px-2 rounded-full`}>
                        {rec.category}
                      </span>
                      <span className="text-xs text-slate-400">{rec.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
// components/HowItWorks.tsx
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

const HowItWorks: FC = () => {
  const steps = [
    {
      number: 1,
      title: 'Sign Up & Assessment',
      description: 'Create your account and complete a quick assessment that helps our AI understand your learning style, goals, and current knowledge level.',
      imageUrl: 'https://placehold.co/500x300.png/4361EE/FFFFFF?text=Sign+Up+%26+Assessment',
      alt: 'User creating an account and taking a skill assessment',
      bgColor: 'bg-blue-100/50 dark:bg-blue-900/20',
      circleColor: 'bg-blue-500 dark:bg-blue-400',
      checkColor: 'text-blue-500 dark:text-blue-400',
      items: ['Personal profile creation', 'Skills & knowledge assessment', 'Learning preference survey'],
      reverse: false,
    },
    {
      number: 2,
      title: 'Receive Your Learning Plan',
      description: 'Our AI generates a tailored learning roadmap based on your assessment, identifying the optimal path for your educational journey.',
      imageUrl: 'https://placehold.co/500x300.png/4361EE/FFFFFF?text=Personalized+Learning+Plan',
      alt: 'AI creating a personalized learning path for a student',
      bgColor: 'bg-purple-100/50 dark:bg-purple-900/20',
      circleColor: 'bg-purple-500 dark:bg-purple-400',
      checkColor: 'text-purple-500 dark:text-purple-400',
      items: ['Customized learning roadmap', 'Recommended course materials', 'Scheduling suggestions'],
      reverse: true,
    },
    {
      number: 3,
      title: 'Learn At Your Own Pace',
      description: 'Access personalized lessons, activities, and assessments that adapt in real-time to your progress and learning style.',
      imageUrl: 'https://placehold.co/500x300.png/4361EE/FFFFFF?text=Interactive+Learning',
      alt: 'Student engaging with personalized learning content on various devices',
      bgColor: 'bg-pink-100/50 dark:bg-pink-900/20',
      circleColor: 'bg-pink-500 dark:bg-pink-400',
      checkColor: 'text-pink-500 dark:text-pink-400',
      items: ['Adaptive content delivery', 'Real-time progress tracking', 'Interactive exercises'],
      reverse: false,
    },
    {
      number: 4,
      title: 'Get Support When Needed',
      description: 'Access 24/7 AI chatbot assistance and connect with human mentors for more complex topics and personalized guidance.',
      imageUrl: 'https://placehold.co/500x300.png/4361EE/FFFFFF?text=AI+Mentorship',
      alt: 'AI mentor providing guidance to a student',
      bgColor: 'bg-indigo-100/50 dark:bg-indigo-900/20',
      circleColor: 'bg-indigo-500 dark:bg-indigo-400',
      checkColor: 'text-indigo-500 dark:text-indigo-400',
      items: ['24/7 AI chat support', 'Human mentor connections', 'Community discussion forums'],
      reverse: true,
    },
    {
      number: 5,
      title: 'Track Progress & Grow',
      description: 'Monitor your advancement through detailed analytics, earn certificates, and continuously evolve your learning journey.',
      imageUrl: 'https://placehold.co/500x300.png/4361EE/FFFFFF?text=Progress+Tracking',
      alt: 'Student reviewing learning progress analytics and achievements',
      bgColor: 'bg-blue-100/50 dark:bg-blue-900/20',
      circleColor: 'bg-blue-500 dark:bg-blue-400',
      checkColor: 'text-blue-500 dark:text-blue-400',
      items: ['Progress visualization', 'Achievement certificates', 'Continuous pathway adaptation'],
      reverse: false,
    },
  ];

  return (
    <div className="max-container py-16">
      <div className="text-center mb-12">
        <div className="inline-block p-2 bg-blue-100/50 dark:bg-blue-900/20 rounded-full mb-4">
          <svg className="w-8 h-8 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-b from-blue-400 to-blue-600 font-pp-neue-montreal bg-clip-text text-transparent">
          How It Works
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Getting started is simple. Follow these steps to begin your personalized learning journey.
        </p>
      </div>

      {/* Process Steps */}
      <div className="relative">
        {/* Connection Line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-blue-100/50 dark:bg-blue-900/20 transform -translate-x-1/2" />

        {steps.map((step) => (
          <div key={step.number} className="relative mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className={`order-${step.reverse ? 1 : 2} md:order-${step.reverse ? 1 : 2}`}>
                <div className="relative">
                  <div className={`mx-auto md:${step.reverse ? 'mr-0' : 'ml-0'} w-24 h-24 ${step.circleColor} rounded-full flex items-center justify-center text-white text-3xl font-bold mb-8 md:mb-0 z-10 relative`}>
                    {step.number}
                  </div>
                  <div className="relative w-full aspect-[5/3]">
                    <Image
                      src={step.imageUrl}
                      alt={step.alt}
                      fill
                      className="rounded-lg shadow-lg object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
              <div className={`md:text-${step.reverse ? 'left' : 'right'} order-${step.reverse ? 2 : 1} md:order-${step.reverse ? 2 : 1}`}>
                <div className={`${step.bgColor} backdrop-blur-sm p-6 rounded-xl shadow-lg dark:shadow-gray-900/30 md:${step.reverse ? 'mr-auto md:ml-0' : 'ml-auto md:mr-0'} max-w-md`}>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{step.description}</p>
                  <ul className={`space-y-2 md:text-${step.reverse ? 'left' : 'right'}`}>
                    {step.items.map((item) => (
                      <li key={item} className={`flex items-center ${step.reverse ? '' : 'md:justify-end'} text-gray-600 dark:text-gray-300`}>
                        {step.reverse ? (
                          <>
                            <svg className={`w-5 h-5 mr-2 ${step.checkColor}`} fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>{item}</span>
                          </>
                        ) : (
                          <>
                            <span>{item}</span>
                            <svg className={`w-5 h-5 ml-2 ${step.checkColor}`} fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Final CTA */}
      <div className="mt-20 text-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Ready to Transform Your Learning Experience?</h3>
        <Link href="#cta" className="inline-block bg-blue-500 dark:bg-blue-400 hover:bg-blue-600 dark:hover:bg-blue-300 text-white font-medium py-3 px-8 rounded-lg transition-colors">
          Start Your Journey Now
        </Link>
      </div>
    </div>
  );
};

export default HowItWorks;
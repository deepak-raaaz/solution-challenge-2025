// components/HowItWorks.tsx
import SectionHeading from '@/components/shared/section-heading';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

const HowItWorks: FC = () => {
  const steps = [
    {
      number: 1,
      title: 'Sign Up & Assessment',
      description: 'Create your account and complete a quick assessment that helps our AI understand your learning style, goals, and current knowledge level.',
      imageUrl: '/images/login.png',
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
      imageUrl: '/images/test.png',
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
      imageUrl: '/images/progress.png',
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
      imageUrl: '/images/aimentor.png',
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
      imageUrl: '/images/leaderboard.png',
      alt: 'Student reviewing learning progress analytics and achievements',
      bgColor: 'bg-blue-100/50 dark:bg-blue-900/20',
      circleColor: 'bg-blue-500 dark:bg-blue-400',
      checkColor: 'text-blue-500 dark:text-blue-400',
      items: ['Progress visualization', 'Achievement certificates', 'Continuous pathway adaptation'],
      reverse: false,
    },
  ];

  return (
    <div className="max-container py-24 ">
      <SectionHeading
        title="How It Works"
        subtitle="Getting started is simple. Follow these steps to begin your personalized learning journey."
        icon={
          <svg className="w-10 h-10 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        }
      />

      {/* Process Steps */}
      <div className="relative my-10">
        {/* Connection Line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-100/50 via-purple-100/50 to-blue-100/50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-blue-900/20 transform -translate-x-1/2" />

        {steps.map((step) => (
          <div key={step.number} className="relative mb-24 last:mb-0">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className={`order-${step.reverse ? 1 : 2} md:order-${step.reverse ? 1 : 2}`}>
                <div className="relative">
                  <div className={`mx-auto md:${step.reverse ? 'mr-0' : 'ml-0'} w-28 h-28 ${step.circleColor} rounded-full flex items-center justify-center text-white text-4xl font-bold mb-10 md:mb-0 z-10 relative shadow-lg transform hover:scale-105 transition-transform duration-300`}>
                    {step.number}
                  </div>
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
                    <Image
                      src={step.imageUrl}
                      alt={step.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw h-auto "
                    />
                  </div>
                </div>
                
              </div>
              <div className={`md:text-${step.reverse ? 'left' : 'right'} order-${step.reverse ? 2 : 1} md:order-${step.reverse ? 2 : 1}`}>
                <div className={`${step.bgColor} backdrop-blur-sm p-8 rounded-2xl shadow-xl dark:shadow-gray-900/30 md:${step.reverse ? 'mr-auto md:ml-0' : 'ml-auto md:mr-0'} max-w-lg transform hover:scale-[1.02] transition-transform duration-300`}>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{step.title}</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{step.description}</p>
                  <ul className={`space-y-3 md:text-${step.reverse ? 'left' : 'right'}`}>
                    {step.items.map((item) => (
                      <li key={item} className={`flex items-center ${step.reverse ? '' : 'md:justify-end'} text-gray-600 dark:text-gray-300 text-lg`}>
                        {step.reverse ? (
                          <>
                            <svg className={`w-6 h-6 mr-3 ${step.checkColor}`} fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>{item}</span>
                          </>
                        ) : (
                          <>
                            <span>{item}</span>
                            <svg className={`w-6 h-6 ml-3 ${step.checkColor}`} fill="currentColor" viewBox="0 0 20 20">
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
      <div className="mt-32 text-center">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Ready to Transform Your Learning Experience?</h3>
        <Link href="#cta" className="inline-block bg-blue-500 dark:bg-blue-400 hover:bg-blue-600 dark:hover:bg-blue-300 text-white font-semibold py-4 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
          Start Your Journey Now
        </Link>
      </div>
    </div>
  );
};

export default HowItWorks;
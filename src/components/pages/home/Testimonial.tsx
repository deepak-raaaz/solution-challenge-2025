// components/Testimonial.tsx
"use client"
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';

const Testimonial: FC = () => {
  const testimonials = [
    {
      name: 'Sarah T.',
      title: 'Rural Student, Kenya',
      avatar: 'https://placehold.co/100x100.png/4361EE/FFFFFF?text=ST',
      quote: 'This platform changed my life. With limited internet access, I was able to download lessons and study offline. The personalized learning path helped me excel in my exams.',
    },
    {
      name: 'David M.',
      title: 'Science Teacher, Brazil',
      avatar: 'https://placehold.co/100x100.png/4361EE/FFFFFF?text=DM',
      quote: 'Creating custom learning paths for my students has been revolutionary. The AI chat support helps answer questions when I\'m not available, and students are more engaged than ever.',
    },
    {
      name: 'Maya L.',
      title: 'NGO Leader, India',
      avatar: 'https://placehold.co/100x100.png/4361EE/FFFFFF?text=ML',
      quote: 'The multilingual support has been invaluable for our community. Children who once had no access to quality education are now thriving with personalized learning journeys.',
    },
  ];

  const caseStudy = {
    title: 'Rural Schools Transformation Project',
    description: 'A network of 50 rural schools across Southeast Asia saw a 68% improvement in student performance after implementing our AI-powered learning platform.',
    image: 'https://placehold.co/600x400.png/4361EE/FFFFFF?text=Rural+Schools+Case+Study',
    alt: 'Students using the AI learning platform in a rural classroom',
    stats: [
      '72% increase in student engagement',
      '94% of teachers reported reduced workload',
      '56% more students continuing to higher education',
    ],
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleTestimonials = 3;

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(testimonials.length - visibleTestimonials, prev + 1));
  };

  return (
    <section id="testimonials" className="py-16 bg-gray-50 dark:bg-[#0A0A1B]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-b from-blue-400 to-blue-600 font-pp-neue-montreal bg-clip-text text-transparent">
            Real Impact, Real Stories
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            See how our AI-powered platform is transforming education and creating opportunities worldwide.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.slice(currentIndex, currentIndex + visibleTestimonials).map((testimonial) => (
            <div key={testimonial.name} className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg dark:shadow-gray-900/30 p-6 hover:shadow-xl dark:hover:shadow-gray-900/50 transition-shadow duration-300 flex flex-col">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100/50 dark:bg-blue-900/20 flex items-center justify-center mr-4 relative">
                  <Image
                    src={testimonial.avatar}
                    alt={`${testimonial.name} portrait`}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.title}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic mb-4">{`"${testimonial.quote}"`}</p>
              <div className="flex mt-auto">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Case Study */}
        <div className="mt-16 bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg dark:shadow-gray-900/30 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8">
              <div className="flex items-center mb-4">
                <span className="bg-blue-500 dark:bg-blue-400 text-white px-3 py-1 rounded text-sm font-semibold mr-3">CASE STUDY</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">SDG 4: Quality Education</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{caseStudy.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{caseStudy.description}</p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300 mb-6">
                {caseStudy.stats.map((stat) => (
                  <li key={stat} className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{stat}</span>
                  </li>
                ))}
              </ul>
              <Link href="#" className="inline-block mt-4 text-blue-500 dark:text-blue-400 font-semibold hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-300">
                Read full case study →
              </Link>
            </div>
            <div className="md:w-1/2 bg-blue-100/50 dark:bg-blue-900/20 flex items-center justify-center p-8">
              <div className="relative w-full aspect-[3/2]">
                <Image
                  src={caseStudy.image}
                  alt={caseStudy.alt}
                  fill
                  className="rounded-lg shadow-md object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Slider Controls */}
        {testimonials.length > visibleTestimonials && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="mx-2 p-2 rounded-full bg-blue-500 dark:bg-blue-400 text-white hover:bg-blue-600 dark:hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500 transition-colors duration-300 disabled:bg-gray-400 dark:disabled:bg-gray-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= testimonials.length - visibleTestimonials}
              className="mx-2 p-2 rounded-full bg-blue-500 dark:bg-blue-400 text-white hover:bg-blue-600 dark:hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500 transition-colors duration-300 disabled:bg-gray-400 dark:disabled:bg-gray-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Call-to-action */}
        <div className="text-center mt-12">
          <Link href="#" className="inline-block px-8 py-4 bg-blue-500 dark:bg-blue-400 text-white font-bold rounded-lg hover:bg-blue-600 dark:hover:bg-blue-300 transition-colors duration-300 shadow-lg dark:shadow-gray-900/30 transform hover:-translate-y-1">
            Join the Education Revolution
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
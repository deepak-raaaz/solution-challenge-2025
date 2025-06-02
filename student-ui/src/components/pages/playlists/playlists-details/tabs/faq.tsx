'use client';

import React, { useState } from 'react';

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: 'What is the course duration?',
    answer: "This course is designed to be completed in approximately 2-3 hours, with 6 comprehensive lessons covering all aspects of AI's future impact.",
  },
  {
    id: 2,
    question: 'Do I need prior AI knowledge?',
    answer: 'No prior AI knowledge is required. This course is designed for beginners and provides a comprehensive introduction to AI concepts and their implications.',
  },
  {
    id: 3,
    question: 'Will I receive a certificate?',
    answer: 'Yes, upon successful completion of all lessons and assessments, you will receive a digital certificate that you can share on your professional profiles.',
  },
];

const FAQs: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenFAQ((prev) => (prev === id ? null : id));
  };

  return (
    <div id="faqs" className="space-y-6 max-md:space-y-3 bg-gray-800/10 border border-gray-700/40 p-4 rounded-lg ">
      <h1 className='text-xl font-semibold mx-2'>FAQs</h1>
      {faqs.map((faq) => (
        <div
          key={faq.id}
          className="bg-gray-800/20 border border-gray-700/40 rounded-xl overflow-hidden"
        >
          <button
            className="w-full text-left p-6 hover:bg-gray-700/30 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500/20"
            onClick={() => toggleFAQ(faq.id)}
            aria-expanded={openFAQ === faq.id}
            aria-controls={`faq-${faq.id}`}
          >
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-medium text-gray-100">{faq.question}</h4>
              <span className="text-gray-400 text-xl">
                {openFAQ === faq.id ? '−' : '+'}
              </span>
            </div>
          </button>
          <div
            id={`faq-${faq.id}`}
            className={`p-6 pt-3 text-gray-300 ${openFAQ === faq.id ? 'block' : 'hidden'}`}
          >
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQs;
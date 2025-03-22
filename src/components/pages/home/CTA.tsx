// components/CTA.tsx
"use client"
import { FC, FormEvent, useState } from 'react';
import Link from 'next/link';

const CTA: FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    newsletter: false,
  });

  const benefits = [
    'Personalized learning paths that adapt to your pace',
    'Access quality education anytime, anywhere',
    'AI-powered support and real-time feedback',
    'Multilingual content with offline accessibility',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Add form submission logic here (e.g., API call)
    console.log('Form submitted:', formData);
  };

  return (
    <section id="cta" className="py-16 bg-gray-50 dark:bg-[#0A0A1B]">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg dark:shadow-gray-900/30 overflow-hidden">
          <div className="md:flex">
            {/* Form Section */}
            <div className="md:w-1/2 p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-3 bg-gradient-to-b from-blue-400 to-blue-600 font-pp-neue-montreal bg-clip-text text-transparent">
                Join Our Education Revolution Today
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Empower yourself or your students with AI-driven personalized learning. Get started in minutes.
              </p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    I am a:
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  >
                    <option value="">Select your role</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher/Educator</option>
                    <option value="parent">Parent</option>
                    <option value="institution">Educational Institution</option>
                    <option value="ngo">NGO/Non-profit</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    id="newsletter"
                    name="newsletter"
                    type="checkbox"
                    checked={formData.newsletter}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-500 dark:text-blue-400 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400"
                  />
                  <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Send me updates about new features and educational resources
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 dark:bg-blue-400 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-300 transition-colors duration-300"
                >
                  Start Learning For Free
                </button>
              </form>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                By signing up, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>

            {/* Benefits Section */}
            <div className="md:w-1/2 bg-blue-500 dark:bg-blue-600 p-8 md:p-12 flex flex-col justify-center">
              <div className="text-white mb-8">
                <h3 className="text-2xl font-bold mb-4">Why Join Us?</h3>
                <ul className="space-y-3">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start">
                      <svg className="h-6 w-6 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/10 dark:bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-300">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-white font-medium">4.9/5 from 2,300+ users</span>
                </div>
                <p className="text-white text-sm italic">
                  &quot;This platform transformed how our school delivers education. Students are more engaged and performing better than ever.&quot;
                </p>
                <p className="text-white text-sm mt-2">— Dr. James Wilson, Principal</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional CTAs */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">Want to learn more? Schedule a personalized demo</p>
          <div className="flex justify-center gap-4">
            <Link
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-blue-500 dark:border-blue-400 text-blue-500 dark:text-blue-400 rounded-lg hover:bg-blue-500 dark:hover:bg-blue-400 hover:text-white transition-colors duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Request a Demo
            </Link>
            <Link
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-blue-500 dark:border-blue-400 text-blue-500 dark:text-blue-400 rounded-lg hover:bg-blue-500 dark:hover:bg-blue-400 hover:text-white transition-colors duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Partner as an Educator
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
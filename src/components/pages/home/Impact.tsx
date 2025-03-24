// components/Impact.tsx
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

const Impact: FC = () => {
  const sdgGoals = [
    {
      title: 'Equal Access to Education',
      description: 'Breaking down barriers of geography, income, and infrastructure to provide quality learning for everyone.',
    },
    {
      title: 'Lifelong Learning Opportunities',
      description: 'Supporting continuous education from basic literacy to advanced professional skills.',
    },
    {
      title: 'Educational Equity',
      description: 'Customized learning experiences to address individual needs and close achievement gaps.',
    },
  ];

  const stats = [
    {
      value: '250K+',
      label: 'Students reached worldwide',
      iconColor: 'text-blue-500 dark:text-blue-400',
      bgColor: 'bg-blue-100/50 dark:bg-blue-900/20',
      iconPath: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    },
    {
      value: '75+',
      label: 'Countries with active users',
      iconColor: 'text-purple-500 dark:text-purple-400',
      bgColor: 'bg-purple-100/50 dark:bg-purple-900/20',
      iconPath: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
      value: '4.8M',
      label: 'Learning hours delivered',
      iconColor: 'text-pink-500 dark:text-pink-400',
      bgColor: 'bg-pink-100/50 dark:bg-pink-900/20',
      iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    },
  ];

  const caseStudies = [
    {
      title: 'Rural Schools in Kenya',
      description: 'Students in remote areas with limited internet achieved 87% higher test scores using our offline learning modules.',
      image: 'https://placehold.co/300x400.png/4361EE/FFFFFF?text=Kenya+Case+Study',
      alt: 'Rural school in Kenya using the AI learning platform',
      person: {
        name: 'James Mwangi',
        title: 'Teacher, Nakuru County',
        avatar: 'https://placehold.co/40x40.png/4361EE/FFFFFF?text=JM',
      },
    },
    {
      title: 'Community Centers in India',
      description: '15,000 students across 200 villages gained access to quality STEM education through our multilingual platform.',
      image: 'https://placehold.co/300x400.png/4361EE/FFFFFF?text=India+Case+Study',
      alt: 'Students in India using tablets with the AI learning platform',
      person: {
        name: 'Priya Gupta',
        title: 'Education Coordinator, Maharashtra',
        avatar: 'https://placehold.co/40x40.png/4361EE/FFFFFF?text=PG',
      },
    },
  ];

  const testimonials = [
    {
      name: 'Maria Rodriguez',
      title: 'Student, Colombia',
      avatar: 'https://placehold.co/50x50.png/4361EE/FFFFFF?text=MR',
      quote: 'This platform changed everything for me. In my remote village, we had no advanced math teachers. Now I\'m preparing for engineering college!',
    },
    {
      name: 'Kemi Oladipo',
      title: 'Student, Nigeria',
      avatar: 'https://placehold.co/50x50.png/4361EE/FFFFFF?text=KO',
      quote: 'The SMS learning feature helped me continue my education even during internet outages. I\'ve improved my literacy scores by 40%.',
    },
    {
      name: 'Raul Mendoza',
      title: 'Teacher, Philippines',
      avatar: 'https://placehold.co/50x50.png/4361EE/FFFFFF?text=RM',
      quote: 'As a teacher serving coastal communities, the platform has helped me reach students who couldn\'t attend classes during typhoon season.',
    },
  ];

  return (
    <div className="max-container py-16">
      <div className="text-center mb-12">
        <div className="inline-block p-2 bg-blue-100/50 dark:bg-blue-900/20 rounded-full mb-4">
          <svg className="w-8 h-8 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-b from-blue-400 to-blue-600 font-pp-neue-montreal bg-clip-text text-transparent">
          Our Global Impact
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Transforming lives through accessible, quality education in communities worldwide.
        </p>
      </div>

      {/* UN SDG 4 Alignment */}
      <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-lg dark:shadow-gray-900/30 mb-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Aligned with UN SDG 4: Quality Education</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">We&apos;re committed to ensuring inclusive and equitable quality education and promoting lifelong learning opportunities for all.</p>
            <div className="space-y-6">
              {sdgGoals.map((goal) => (
                <div key={goal.title} className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100/50 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{goal.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{goal.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative w-full aspect-[5/4]">
            <Image
              src="https://placehold.co/500x400.png/4361EE/FFFFFF?text=SDG+4:+Quality+Education"
              alt="UN Sustainable Development Goal 4: Quality Education"
              fill
              className="rounded-lg object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      {/* Impact Statistics */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg dark:shadow-gray-900/30 text-center">
            <div className={`w-16 h-16 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <svg className={`w-8 h-8 ${stat.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.iconPath} />
              </svg>
            </div>
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</h3>
            <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Case Studies */}
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-10">Success Stories</h3>
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {caseStudies.map((study) => (
          <div key={study.title} className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg dark:shadow-gray-900/30 overflow-hidden">
            <div className="grid sm:grid-cols-5">
              <div className="sm:col-span-2 relative h-[400px] sm:h-auto">
                <Image
                  src={study.image}
                  alt={study.alt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 sm:col-span-3">
                <div className="uppercase tracking-wide text-sm text-blue-500 dark:text-blue-400 font-semibold">Case Study</div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mt-1 mb-2">{study.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{study.description}</p>
                <div className="flex items-center">
                  <div className="flex-shrink-0 relative w-10 h-10">
                    <Image
                      src={study.person.avatar}
                      alt={`${study.person.name}`}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{study.person.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{study.person.title}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-10">Student Testimonials</h3>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div key={testimonial.name} className="bg-white dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg dark:shadow-gray-900/30">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 relative w-[50px] h-[50px]">
                <Image
                  src={testimonial.avatar}
                  alt={`${testimonial.name}`}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div className="ml-3">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.title}</p>
              </div>
            </div>
            <div className="mb-4 flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600 dark:text-gray-300 italic">{`"${testimonial.quote}"`}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-16">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Join Our Global Education Movement</h3>
        <Link href="#cta" className="inline-block bg-blue-500 dark:bg-blue-400 hover:bg-blue-600 dark:hover:bg-blue-300 text-white font-medium py-3 px-8 rounded-lg transition-colors">
          Get Started Today
        </Link>
      </div>
    </div>
  );
};

export default Impact;
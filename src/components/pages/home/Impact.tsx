// components/Impact.tsx
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import SectionHeading from '@/components/shared/SectionHeading';

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
    <div className="max-container my-24">
      <SectionHeading
        title="Global Impact"
        subtitle="Transforming lives through accessible, quality education in communities worldwide."
        icon={
          <svg className="w-10 h-10 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        }
      />

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 my-16 ">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl dark:shadow-gray-900/30 text-center transform hover:scale-[1.02] transition-all duration-300"
          >
            <div className="w-16 h-16 bg-blue-100/50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mx-auto mb-6">
              <svg className={`w-8 h-8 ${stat.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.iconPath} />
              </svg>
            </div>
            <p className="text-3xl font-bold text-blue-500 dark:text-blue-400 mb-2">{stat.value}</p>
            <p className="text-lg text-gray-600 dark:text-gray-300">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* SDG Goals Section */}
      <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl dark:shadow-gray-900/30 mb-16">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Aligned with UN SDG 4: Quality Education
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sdgGoals.map((goal) => (
            <div
              key={goal.title}
              className="bg-gray-50 dark:bg-gray-800/30 p-6 rounded-xl transform hover:scale-[1.02] transition-all duration-300"
            >
              <div className="w-12 h-12 bg-blue-100/50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{goal.title}</h4>
              <p className="text-gray-600 dark:text-gray-300">{goal.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Case Studies */}
      {/* <div className="grid md:grid-cols-2 gap-8 mb-16">
        {caseStudies.map((study) => (
          <div
            key={study.title}
            className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl dark:shadow-gray-900/30 overflow-hidden transform hover:scale-[1.02] transition-all duration-300"
          >
            <div className="relative h-48">
              <Image
                src={study.image}
                alt={study.alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8">
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{study.title}</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{study.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100/50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mr-3">
                    <Image
                      src={study.person.avatar}
                      alt={`${study.person.name}`}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{study.person.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{study.person.title}</p>
                  </div>
                </div>
                <Link
                  href="#case-study"
                  className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 font-medium"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div> */}

      {/* Testimonials */}
      {/* <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl dark:shadow-gray-900/30">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Success Stories
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-gray-50 dark:bg-gray-800/30 p-6 rounded-xl transform hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100/50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mr-4">
                  <Image
                    src={testimonial.avatar}
                    alt={`${testimonial.name}`}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.title}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">&quot;{testimonial.quote}&quot;</p>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Impact;
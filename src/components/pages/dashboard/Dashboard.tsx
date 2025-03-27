// app/dashboard/page.tsx
import Link from 'next/link';

interface ProgressCardProps {
  title: string;
  value: string;
  subtext?: any;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
}

interface PlaylistCardProps {
  title: string;
  description: string;
  image: string;
  mentor: string;
  mentorAvatar: string;
  lessons: number;
  enrolled: string;
  rating: number;
  likes: number;
  badge: string;
  badgeColor: string;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ title, value, subtext, icon, bgColor, textColor }) => (
  <div className={`bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700/50 p-6 shadow-sm hover:shadow transition-shadow duration-300`}>
    <div className="flex items-center">
      <div className={`rounded-full ${bgColor} p-3`}>{icon}</div>
      <div className="ml-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{title}</h3>
        <div className="flex items-center">
          <span className={`text-2xl font-bold ${textColor}`}>{value}</span>
          {subtext && (
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{subtext}</span>
          )}
        </div>
      </div>
    </div>
  </div>
);

const PlaylistCard: React.FC<PlaylistCardProps> = ({
  title,
  description,
  image,
  mentor,
  mentorAvatar,
  lessons,
  enrolled,
  rating,
  likes,
  badge,
  badgeColor,
}) => (
  <div className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700/50 overflow-hidden shadow-sm hover:shadow transition-shadow duration-300">
    <div className="relative">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className={`absolute top-0 right-0 mt-2 mr-2 px-2 py-1 ${badgeColor} text-white text-xs font-bold rounded`}>
        {badge}
      </div>
    </div>
    <div className="p-5">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{description}</p>
      <div className="flex items-center mb-3">
        <img className="h-8 w-8 rounded-full" src={mentorAvatar} alt={mentor} />
        <div className="ml-2">
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{mentor}</p>
          <div className="flex items-center">
            <svg className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">Certified Mentor</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center">
          <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{lessons} lessons</span>
        </div>
        <div className="flex items-center">
          <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>{enrolled} enrolled</span>
        </div>
      </div>
    </div>
    <div className="px-5 py-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex justify-between items-center">
      <div className="flex items-center">
        <div className="flex items-center">
          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="ml-1 text-gray-600 dark:text-gray-300 font-medium">{rating}</span>
        </div>
        <span className="mx-2 text-gray-400 dark:text-gray-500">|</span>
        <div className="flex items-center">
          <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          <span className="ml-1 text-gray-600 dark:text-gray-300">{likes}</span>
        </div>
      </div>
      <Link href="#" className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        View Playlist
      </Link>
    </div>
  </div>
);

export default function Dashboard() {
  return (
    <section className="p-6 \">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Your Learning Dashboard</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Track your progress and continue where you left off</p>
      </div>

      {/* Progress overview cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <ProgressCard
          title="Current Level"
          value="7"
          subtext={<div className="ml-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Intermediate</div>}
          icon={<svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
          bgColor="bg-blue-100"
          textColor="text-blue-600"
        />
        <ProgressCard
          title="Completed Lessons"
          value="24"
          subtext="/ 36 total"
          icon={<svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          bgColor="bg-green-100"
          textColor="text-green-600"
        />
        <ProgressCard
          title="Learning Streak"
          value="14"
          subtext="days"
          icon={<svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          bgColor="bg-amber-100"
          textColor="text-amber-600"
        />
      </div>

      {/* Continue learning section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Continue Learning</h2>
        <div className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700/50 overflow-hidden shadow-sm">
          <div className="p-5 border-b border-gray-200 dark:border-gray-700/50 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Web Development Fundamentals</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Next: JavaScript Event Handling</p>
            </div>
            <Link href="#" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Resume
            </Link>
          </div>
          <div className="p-5 flex flex-col sm:flex-row">
            <div className="w-full sm:w-2/3">
              <div className="mb-3">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Progress</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">67%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '67%' }}></div>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <svg className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>4h 20m remaining</span>
                <span className="mx-3">•</span>
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>1,248 students</span>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/3 mt-4 sm:mt-0 sm:pl-6 flex flex-col justify-center">
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {Array(5).fill(0).map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-600 dark:text-gray-300">4.9 (324 ratings)</span>
              </div>
              <div className="flex space-x-2">
                {['HTML', 'CSS', 'JavaScript'].map((tag) => (
                  <span key={tag} className="px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-800 dark:text-white rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended playlists */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Recommended for You</h2>
          <Link href="/playlists" className="text-blue-300 hover:text-blue-400 text-sm font-medium">
            View all playlists
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PlaylistCard
            title="Machine Learning Fundamentals"
            description="Master the core concepts of machine learning and data science algorithms"
            image="/images/ml.png"
            mentor="Dr. Sarah Chen"
            mentorAvatar="https://avatar.iran.liara.run/public/31"
            lessons={24}
            enrolled="3.2k"
            rating={4.8}
            likes={428}
            badge="Trending"
            badgeColor="bg-blue-600"
          />
          <PlaylistCard
            title="Blockchain Development"
            description="Learn to build decentralized applications and smart contracts"
            image="/images/blockchain.png"
            mentor="Michael Rodriguez"
            mentorAvatar="https://avatar.iran.liara.run/public/42"
            lessons={18}
            enrolled="1.5k"
            rating={4.7}
            likes={254}
            badge="New"
            badgeColor="bg-green-600"
          />
          <PlaylistCard
            title="UI/UX Design Masterclass"
            description="Create beautiful user interfaces and engaging experiences"
            image="/images/uiux.png"
            mentor="Emma Thompson"
            mentorAvatar="https://avatar.iran.liara.run/public/23"
            lessons={32}
            enrolled="4.7k"
            rating={4.9}
            likes={712}
            badge="Popular"
            badgeColor="bg-purple-600"
          />
        </div>
      </div>

      {/* AI Mentor insights */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">AI Mentor Insights</h2>
        <div className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700/50 p-6 shadow-sm">
          <div className="flex items-start">
            <div className="bg-blue-100 rounded-full p-3 mr-4">
              <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Based on your recent progress</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">You've been making great progress with JavaScript fundamentals! I see you excelled in the arrays and functions modules. To further enhance your skills, I recommend focusing on these areas:</p>
              <ul className="space-y-3 mb-4">
                {[
                  "Complete the <span class='font-medium'>Advanced DOM Manipulation</span> lesson to strengthen your web skills",
                  "Try the <span class='font-medium'>JavaScript Promises</span> practice challenges to level up your async skills",
                  "Join the <span class='font-medium'>React Fundamentals</span> playlist to start building modern web applications"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
              <Link href="/ai-mentor" className="inline-flex items-center text-blue-600 hover:text-blue-700">
                <span className="font-medium">Get personalized learning plan</span>
                <svg className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Active discussion groups */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Active Discussion Groups</h2>
          <Link href="/discussions" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View all groups
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "JavaScript Developers",
              topic: "Working with async/await and handling API requests",
              online: 42,
              avatars: [33, 44, 12, 42]
            },
            {
              title: "React & Modern Frontend",
              topic: "State management approaches and React hooks best practices",
              online: 28,
              avatars: [21, 22, 37, 15]
            }
          ].map((group, index) => (
            <div key={index} className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700/50 p-5 shadow-sm hover:shadow transition-shadow duration-300">
              <div className="flex justify-between mb-3">
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{group.title}</h3>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{group.online} online</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Currently discussing: {group.topic}</p>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {group.avatars.map((id) => (
                    <img key={id} className="w-7 h-7 rounded-full border-2 border-white" src={`https://avatar.iran.liara.run/public/${id}`} alt={`User ${id}`} />
                  ))}
                  <div className="flex items-center justify-center w-7 h-7 rounded-full border-2 border-white bg-gray-200 text-xs font-medium text-gray-500">
                    +{index === 0 ? 16 : 8}
                  </div>
                </div>
                <Link href="#" className="inline-flex items-center px-3 py-1.5 border border-blue-600 text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Join Discussion
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
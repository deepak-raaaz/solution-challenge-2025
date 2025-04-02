// components/CollaborationHub.tsx
"use client";
import { useState } from 'react';

// Interfaces
interface TeamMember {
  name: string;
  department: string;
  role: 'Owner' | 'Editor' | 'Viewer';
  initials: string;
  color: string;
}

interface Collaborator {
  name: string;
  expertise: string;
  roadmaps: number;
  initials: string;
}

interface Activity {
  user: string | { name: string; initials: string };
  time: string;
  action: string;
  content: string;
  details?: { title: string; subtitle?: string; icon?: React.ReactNode } | string | string[];
  initials?: string;    
}

interface Tool {
  name: string;
  description: string;
  icon: React.ReactNode;
  action: string;
  color: string;
}

// Data
const teamMembers: TeamMember[] = [
  { name: 'John Doe', department: 'Science Department', role: 'Owner', initials: 'JD', color: 'green' },
  { name: 'Sarah Johnson', department: 'Math Department', role: 'Editor', initials: 'SJ', color: 'blue' },
  { name: 'David Wilson', department: 'Computer Science', role: 'Editor', initials: 'DW', color: 'blue' },
  { name: 'Amelia Lee', department: 'Art Department', role: 'Viewer', initials: 'AL', color: 'yellow' }
];

const recommendedCollaborators: Collaborator[] = [
  { name: 'Rachel Kim', expertise: 'Biology Expert', roadmaps: 15, initials: 'RK' },
  { name: 'Michael Patel', expertise: 'AI Specialist', roadmaps: 8, initials: 'MP' },
  { name: 'Julia Smith', expertise: 'History Teacher', roadmaps: 12, initials: 'JS' }
];

const activities: Activity[] = [
  {
    user: 'Sarah Johnson',
    time: '2 hours ago',
    action: 'Added a new milestone to',
    content: 'Algebra Fundamentals',
    details: { title: 'Advanced Equations', subtitle: 'Intermediate • 5 learning resources', icon: <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg> },
    initials: 'SJ'
  },
  {
    user: 'David Wilson',
    time: 'Yesterday',
    action: 'Left a comment on your',
    content: 'Python Programming',
    details: '"I think we should add a section on data visualization with matplotlib. It\'s a crucial skill for students to present their findings."',
    initials: 'DW'
  },
  {
    user: { name: 'AI Assistant', initials: 'AI' },
    time: '2 days ago',
    action: 'Suggested improvements for your',
    content: 'Digital Marketing',
    details: [
      'Add more practical exercises for social media strategy',
      'Update SEO module with latest algorithm changes',
      'Consider adding an introduction to marketing automation'
    ]
  }
];

const tools: Tool[] = [
  { name: 'Schedule Meeting', description: 'Plan virtual meetings with your collaborators to discuss roadmap improvements.', icon: <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>, action: 'Create Meeting', color: 'blue' },
  { name: 'Shared Documents', description: 'Create and edit documents collaboratively for planning and content creation.', icon: <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>, action: 'Access Documents', color: 'purple' },
  { name: 'Discussion Forum', description: 'Participate in topic-based discussions with your educational community.', icon: <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>, action: 'Browse Forums', color: 'green' },
  { name: 'Video Conferencing', description: 'Connect face-to-face with your team using our integrated video platform.', icon: <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>, action: 'Start Video Call', color: 'red' }
];

// Main Component
export const CollaborationHub: React.FC = () => {
  const [activityFilter, setActivityFilter] = useState<'All' | 'Comments' | 'Changes'>('All');

  return (
    <section id="collaboration-hub" className="page-section p-4 md:p-6 lg:p-8 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Collaboration Hub</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Work together with other educators to create better learning experiences</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <span className="flex items-center">
                <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                Contact
              </span>
            </button>
            <button className="px-4 py-2 bg-blue-600 dark:bg-blue-500 rounded-lg text-sm font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
              <span className="flex items-center">
                <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                Invite Collaborators
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Team Members */}
          <div className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200/30 dark:border-gray-700/30 p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Team Members</h2>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">View All</button>
            </div>
            <div className="space-y-4">
              {teamMembers.map(member => <TeamMemberCard key={member.name} {...member} />)}
            </div>
            <button className="w-full mt-4 flex items-center justify-center px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40 rounded-lg text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
              <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              Add New Team Member
            </button>
          </div>

          {/* Recommended Collaborators */}
          <div className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200/30 dark:border-gray-700/30 p-5">
            <div className="flex items-center mb-5">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recommended Collaborators</h2>
              <div className="ml-2 flex items-center">
                <span className="inline-flex items-center justify-center px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <svg className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                </span>
              </div>
            </div>
            <div className="space-y-4">
              {recommendedCollaborators.map(collab => <CollaboratorCard key={collab.name} {...collab} />)}
            </div>
            <button className="w-full mt-4 flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              Find More Educators
            </button>
          </div>

          {/* Connect Section */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-5">
            <h2 className="text-lg font-semibold text-white mb-2">Expand Your Network</h2>
            <p className="text-blue-100 text-sm mb-4">Join educator communities to share ideas and collaborate on roadmaps.</p>
            <img src="https://images.unsplash.com/photo-1425421669292-0c3da3b8f529?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8M3x8Y29sbGFib3JhdGlvbi1odWIlMjBwcm9mZXNzaW9uYWx8ZW58MHwwfHx8MTc0MzQ1MDUwMXww&ixlib=rb-4.0.3&q=80&w=1080?q=80" alt="Professional networking" onError={(e) => (e.currentTarget.src = 'https://placehold.co/1080x192')} className="w-full h-32 object-cover rounded-lg mb-4" />
            <button className="w-full flex items-center justify-center px-4 py-2 bg-white rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors">
              Browse Communities
            </button>
          </div>
        </div>

        {/* Middle Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200/30 dark:border-gray-700/30 p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
              <div className="flex space-x-2">
                {['All', 'Comments', 'Changes'].map(filter => (
                  <button key={filter} onClick={() => setActivityFilter(filter as any)} className={`px-3 py-1.5 ${activityFilter === filter ? 'bg-blue-600 dark:bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'} text-xs font-medium rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors`}>
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              {activities.map((activity, index) => <ActivityCard key={index} {...activity} />)}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-3">
                <img src="https://placehold.co/40x40?text=JD" alt="John Doe" className="w-10 h-10 rounded-full border border-gray-200/40 dark:border-gray-700/40" onError={(e) => (e.currentTarget.src = 'https://placehold.co/40x40?text=JD')} />
                <div className="flex-1">
                  <textarea rows={2} className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Share an update or ask a question..." />
                  <div className="flex justify-between mt-2">
                    <div className="flex space-x-2">
                      <button className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      </button>
                      <button className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                      </button>
                      <button className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </button>
                    </div>
                    <button className="px-4 py-1.5 bg-blue-600 dark:bg-blue-500 rounded-lg text-white text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Collaboration Tools */}
          <div className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200/30 dark:border-gray-700/30 p-5">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Collaboration Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tools.map(tool => <ToolCard key={tool.name} {...tool} />)}
            </div>
          </div>

          {/* Feature Highlight */}
          <div className="relative rounded-lg overflow-hidden">
            <img src="https://images.unsplash.com/photo-1484981138541-3d074aa97716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8Mnx8Y29sbGFib3JhdGlvbi1odWIlMjBwcm9mZXNzaW9uYWx8ZW58MHwwfHx8MTc0MzQ1MDUwMXww&ixlib=rb-4.0.3&q=80&w=1080?q=80" alt="Professional workspace" onError={(e) => (e.currentTarget.src = 'https://placehold.co/1080x208')} className="w-full h-52 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h2 className="text-xl font-bold text-white mb-2">Real-Time Collaboration</h2>
              <p className="text-white/80 text-sm mb-4">Experience seamless collaboration with multiple educators working simultaneously on roadmaps.</p>
              <button className="px-4 py-2 bg-white text-blue-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Team Member Card Component
const TeamMemberCard: React.FC<TeamMember> = ({ name, department, role, initials, color }) => (
  <div className="flex items-center">
    <img src={`https://placehold.co/40x40?text=${initials}`} alt={name} className="w-10 h-10 rounded-full border border-gray-200/40 dark:border-gray-700/40" onError={(e) => (e.currentTarget.src = `https://placehold.co/40x40?text=${initials}`)} />
    <div className="ml-3 flex-1">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{department}</p>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800 dark:bg-${color}-900/30 dark:text-${color}-400`}>
          {role}
        </span>
      </div>
    </div>
  </div>
);

// Collaborator Card Component
const CollaboratorCard: React.FC<Collaborator> = ({ name, expertise, roadmaps, initials }) => (
  <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
    <img src={`https://placehold.co/40x40?text=${initials}`} alt={name} className="w-10 h-10 rounded-full border border-gray-200/40 dark:border-gray-700/40" onError={(e) => (e.currentTarget.src = `https://placehold.co/40x40?text=${initials}`)} />
    <div className="ml-3 flex-1">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{expertise} • {roadmaps} roadmaps</p>
        </div>
        <button className="p-1.5 bg-blue-600 dark:bg-blue-500 rounded text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
        </button>
      </div>
    </div>
  </div>
);

// Activity Card Component
const ActivityCard: React.FC<Activity> = ({ user, time, action, content, details, initials }) => {
  const isAI = typeof user === 'object';
  const userName = isAI ? user.name : user;
  const userInitials = isAI ? user.initials : initials;

  return (
    <div className="flex">
      <div className="flex-shrink-0 mr-3">
        {isAI ? (
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center border border-blue-200 dark:border-blue-800/40">
            <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
          </div>
        ) : (
          <img src={`https://placehold.co/40x40?text=${userInitials}`} alt={userName} className="w-10 h-10 rounded-full border border-gray-200/40 dark:border-gray-700/40" onError={(e) => (e.currentTarget.src = `https://placehold.co/40x40?text=${userInitials}`)} />
        )}
      </div>
      <div className="flex-1">
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{userName}</p>
              <span className="mx-2 text-gray-500 dark:text-gray-400">•</span>
              <p className="text-xs text-gray-500 dark:text-gray-400">{time}</p>
            </div>
            <div className="text-gray-500 dark:text-gray-400">
              <button>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{action} <span className="font-medium text-blue-600 dark:text-blue-400">{content}</span> roadmap{typeof details === 'string' ? ':' : ''}</p>
          <div className="p-3 bg-white dark:bg-gray-800/50 rounded border border-gray-200/30 dark:border-gray-700/30">
            {typeof details === 'object' && !Array.isArray(details) ? (
              <div className="flex items-center">
                {details.icon && <div className="flex-shrink-0 w-8 h-8 rounded-md bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">{details.icon}</div>}
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{details.title}</p>
                  {details.subtitle && <p className="text-xs text-gray-500 dark:text-gray-400">{details.subtitle}</p>}
                </div>
              </div>
            ) : typeof details === 'string' ? (
              <p className="text-sm text-gray-700 dark:text-gray-300 italic">{details}</p>
            ) : Array.isArray(details) ? (
              <div className="space-y-2">
                {details.map((suggestion, index) => (
                  <div key={index} className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{suggestion}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex items-center mt-2 ml-4 space-x-6">
          <button className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
            {isAI ? (
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            ) : (
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
            )}
            {isAI ? 'Apply Suggestions' : 'Like'}
          </button>
          <button className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            {isAI ? 'Feedback' : 'Comment'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Tool Card Component
const ToolCard: React.FC<Tool> = ({ name, description, icon, action, color }) => (
  <div className="border border-gray-200/30 dark:border-gray-700/30 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-700/50 transition-colors">
    <div className="flex items-center mb-3">
      <div className={`w-10 h-10 rounded-lg bg-${color}-100 dark:bg-${color}-900/30 flex items-center justify-center`}>
        {icon}
      </div>
      <h3 className="ml-3 text-base font-medium text-gray-900 dark:text-white">{name}</h3>
    </div>
    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{description}</p>
    <button className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
      {action}
    </button>
  </div>
);
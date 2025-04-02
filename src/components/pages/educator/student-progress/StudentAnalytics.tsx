// components/StudentAnalytics.tsx
"use client";
import { useState } from 'react';

// Interfaces
interface Stat {
  title: string;
  value: string;
  unit?: string;
  change: number;
  changePositive: boolean;
  progress: number;
  progressColor: string;
  subtext: string;
  previous?: string;
  target?: string;
}

interface Roadmap {
  name: string;
  difficulty: string;
  students: number;
  progress: number;
  completion: number;
  icon: React.ReactNode;
  color: string;
}

interface Insight {
  type: 'success' | 'warning' | 'info';
  text: string;
  actionText: string;
  icon: React.ReactNode;
}

interface Resource {
  name: string;
  type: string;
  category: string;
  effectiveness: number;
  icon: React.ReactNode;
  color: string;
}

interface Skill {
  name: string;
  proficiency: number;
  color: string;
}

// Data
const stats: Stat[] = [
  {
    title: 'Active Students',
    value: '1,849',
    unit: 'students',
    change: 12,
    changePositive: true,
    progress: 72,
    progressColor: 'green',
    subtext: '72% of enrolled students active this week'
  },
  {
    title: 'Avg. Completion Rate',
    value: '64.8%',
    change: 3,
    changePositive: false,
    progress: 64.8,
    progressColor: 'indigo',
    subtext: 'Target: 70% completion rate'
  },
  {
    title: 'Avg. Engagement Time',
    value: '4.2',
    unit: 'hours/week',
    change: 7,
    changePositive: true,
    progress: 84,
    progressColor: 'yellow',
    subtext: '',
    previous: '3.9 hrs',
    target: '5 hrs'
  },
  {
    title: 'Assessment Score',
    value: '78.4%',
    change: 5,
    changePositive: true,
    progress: 78.4,
    progressColor: 'purple',
    subtext: '',
    previous: '74.6%',
    target: '80%'
  }
];

const roadmaps: Roadmap[] = [
  { name: 'Web Development Fundamentals', difficulty: 'Beginner', students: 356, progress: 85, completion: 78, icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>, color: 'blue' },
  { name: 'Data Science Essentials', difficulty: 'Intermediate', students: 278, progress: 62, completion: 55, icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>, color: 'purple' },
  { name: 'Financial Literacy 101', difficulty: 'Beginner', students: 412, progress: 72, completion: 65, icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, color: 'green' },
  { name: 'UX Design Principles', difficulty: 'Intermediate', students: 185, progress: 48, completion: 42, icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>, color: 'red' },
  { name: 'Effective Communication', difficulty: 'Beginner', students: 298, progress: 68, completion: 61, icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>, color: 'yellow' }
];

const insights: Insight[] = [
  { type: 'info', text: 'The UX Design Principles roadmap has a high drop-off rate at the wireframing module.', actionText: 'View Details', icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg> },
  { type: 'warning', text: 'Engagement time for Data Science Essentials is below target. Consider adding more interactive elements.', actionText: 'Recommendations', icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg> },
  { type: 'success', text: 'Financial Literacy 101 has the highest completion-to-engagement ratio. Consider expanding this roadmap.', actionText: 'Explore', icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> }
];

const resources: Resource[] = [
  { name: 'Intro to JavaScript', type: 'Video', category: 'Web Development', effectiveness: 94, icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>, color: 'blue' },
  { name: 'Neural Networks Quiz', type: 'Quiz', category: 'Data Science', effectiveness: 87, icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, color: 'purple' },
  { name: 'GitHub Exercise', type: 'Coding', category: 'Web Development', effectiveness: 65, icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>, color: 'yellow' },
  { name: 'Wireframing Article', type: 'Article', category: 'UX Design', effectiveness: 43, icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>, color: 'red' }
];

const skills: Skill[] = [
  { name: 'Advanced JavaScript', proficiency: 35, color: 'red' },
  { name: 'Data Visualization', proficiency: 62, color: 'yellow' },
  { name: 'Financial Modeling', proficiency: 78, color: 'green' },
  { name: 'User Testing', proficiency: 45, color: 'red' }
];

// Main Component
export const StudentAnalytics: React.FC = () => {
  const [timeframe, setTimeframe] = useState('Last 30 days');
  const [chartView, setChartView] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');

  return (
    <section id="student-analytics" className="page-section p-4 md:p-6 lg:p-8 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Student Analytics</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Track engagement, progress, and identify learning opportunities</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <span className="flex items-center">
                <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Export Data
              </span>
            </button>
            <button className="px-4 py-2 bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <span className="flex items-center">
                <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                Filter
              </span>
            </button>
            <button className="px-4 py-2 bg-indigo-600 dark:bg-indigo-500 rounded-lg text-sm font-medium text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors">
              <span className="flex items-center">
                <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" /></svg>
                AI Insights
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map(stat => <StatCard key={stat.title} {...stat} />)}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress by Roadmap */}
          <div className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200/30 dark:border-gray-700/30 p-5 overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Progress by Roadmap</h2>
              <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)} className="bg-gray-100 dark:bg-gray-700 border border-gray-200/30 dark:border-gray-600/30 rounded-md text-sm py-1 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>This year</option>
                <option>All time</option>
              </select>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Roadmap Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Students</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Avg. Progress</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Completion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {roadmaps.map(roadmap => <RoadmapRow key={roadmap.name} {...roadmap} />)}
                </tbody>
              </table>
            </div>
          </div>

          {/* Engagement Trends */}
          <div className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200/30 dark:border-gray-700/30 p-5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Engagement Trends</h2>
              <div className="flex space-x-2">
                {['Daily', 'Weekly', 'Monthly'].map(view => (
                  <button key={view} onClick={() => setChartView(view as any)} className={`px-3 py-1.5 ${chartView === view ? 'bg-indigo-600 dark:bg-indigo-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'} text-xs font-medium rounded hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors`}>
                    {view}
                  </button>
                ))}
              </div>
            </div>
            <EngagementChart view={chartView} />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* AI Insights */}
          <div className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200/30 dark:border-gray-700/30 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">AI Insights</h2>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                Updated
              </span>
            </div>
            <div className="space-y-3">
              {insights.map((insight, index) => <InsightCard key={index} {...insight} />)}
            </div>
          </div>

          {/* Resource Effectiveness */}
          <div className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200/30 dark:border-gray-700/30 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Resource Effectiveness</h2>
              <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium">View All</button>
            </div>
            <div className="space-y-3">
              {resources.map(resource => <ResourceCard key={resource.name} {...resource} />)}
            </div>
          </div>

          {/* Skill Gap Analysis */}
          <div className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200/30 dark:border-gray-700/30 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Skill Gap Analysis</h2>
              <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium">Details</button>
            </div>
            <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8Mnx8c3R1ZGVudC1hbmFseXRpY3MlMjBwcm9mZXNzaW9uYWx8ZW58MHwwfHx8MTc0MzQ0ODcyN3ww&ixlib=rb-4.0.3&q=80&w=1080?q=80" alt="Team analyzing student data" onError={(e) => (e.currentTarget.src = 'https://placehold.co/1080x192')} className="w-full h-48 object-cover rounded-lg mb-4" />
            <div className="space-y-3">
              {skills.map(skill => <SkillRow key={skill.name} {...skill} />)}
            </div>
            <button className="w-full mt-4 flex items-center justify-center px-4 py-2 border border-indigo-600 dark:border-indigo-500 rounded-lg text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
              Generate Learning Recommendations
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Stat Card Component
const StatCard: React.FC<Stat> = ({ title, value, unit, change, changePositive, progress, progressColor, subtext, previous, target }) => (
  <div className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200/30 dark:border-gray-700/30 p-5 hover:shadow-md transition-shadow duration-300">
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${changePositive ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
        <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={changePositive ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"} />
        </svg>
        {change}%
      </span>
    </div>
    <div className="flex items-baseline">
      <p className="text-3xl font-semibold text-gray-900 dark:text-white">{value}</p>
      {unit && <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">{unit}</p>}
    </div>
    <div className="mt-3">
      {previous && target && (
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
          <span>Previous: {previous}</span>
          <span>Target: {target}</span>
        </div>
      )}
      <div className="w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
        <div className={`bg-${progressColor}-500 dark:bg-${progressColor}-400 h-2 rounded-full`} style={{ width: `${progress}%` }}></div>
      </div>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{subtext}</p>
    </div>
  </div>
);

// Roadmap Row Component
const RoadmapRow: React.FC<Roadmap> = ({ name, difficulty, students, progress, completion, icon, color }) => (
  <tr>
    <td className="px-4 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <div className={`flex-shrink-0 h-8 w-8 rounded-md bg-${color}-100 dark:bg-${color}-900/30 flex items-center justify-center text-${color}-600 dark:text-${color}-400`}>
          {icon}
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900 dark:text-white">{name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{difficulty}</p>
        </div>
      </div>
    </td>
    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{students}</td>
    <td className="px-4 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mr-2">
          <div className={`bg-${color}-600 dark:bg-${color}-400 h-2.5 rounded-full`} style={{ width: `${progress}%` }}></div>
        </div>
        <span className="text-sm text-gray-900 dark:text-white">{progress}%</span>
      </div>
    </td>
    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${completion >= 60 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
        {completion}%
      </span>
    </td>
  </tr>
);

// Engagement Chart Component (Mock)
const EngagementChart: React.FC<{ view: 'Daily' | 'Weekly' | 'Monthly' }> = ({ view }) => {
  const dailyData = [60, 40, 80, 50, 75, 25, 33]; // Mock percentages
  return (
    <div className="relative h-80">
      <div className="absolute inset-0 flex items-end px-4 pb-6">
        <div className="w-full grid grid-cols-7 gap-2 h-64">
          {dailyData.map((height, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-full bg-indigo-600 dark:bg-indigo-500 rounded-t" style={{ height: `${height}%` }}></div>
              <span className="mt-2 text-xs text-gray-500 dark:text-gray-400">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute left-0 inset-y-0 w-12 flex flex-col justify-between pb-8 pt-4">
        {[800, 600, 400, 200, 0].map(value => <span key={value} className="text-xs text-gray-500 dark:text-gray-400">{value}</span>)}
      </div>
    </div>
  );
};

// Insight Card Component
const InsightCard: React.FC<Insight> = ({ type, text, actionText, icon }) => {
  const colors = {
    success: { bg: 'green', text: 'green' },
    warning: { bg: 'yellow', text: 'yellow' },
    info: { bg: 'indigo', text: 'indigo' }
  };
  return (
    <div className={`p-3 bg-${colors[type].bg}-50 dark:bg-${colors[type].bg}-900/20 rounded-lg border border-${colors[type].bg}-100 dark:border-${colors[type].bg}-800/30`}>
      <div className="flex">
        <div className="flex-shrink-0 text-${colors[type].text}-600 dark:text-${colors[type].text}-400">{icon}</div>
        <div className="ml-3">
          <p className={`text-sm text-${colors[type].text}-900 dark:text-${colors[type].text}-200`}>{text}</p>
          <div className="mt-2">
            <button className={`px-2 py-1 bg-${colors[type].bg}-600 dark:bg-${colors[type].bg}-500 rounded text-xs font-medium text-white hover:bg-${colors[type].bg}-700 dark:hover:bg-${colors[type].bg}-600 transition-colors`}>
              {actionText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Resource Card Component
const ResourceCard: React.FC<Resource> = ({ name, type, category, effectiveness, icon, color }) => (
  <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
    <div className={`flex-shrink-0 w-10 h-10 rounded-md bg-${color}-100 dark:bg-${color}-900/30 flex items-center justify-center text-${color}-600 dark:text-${color}-400`}>
      {icon}
    </div>
    <div className="ml-3 flex-1">
      <div className="flex justify-between">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">{name}</h3>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${effectiveness >= 80 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
          {effectiveness}%
        </span>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{type} • {category}</p>
      <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
        <div className={`bg-${color}-600 dark:bg-${color}-400 h-1.5 rounded-full`} style={{ width: `${effectiveness}%` }}></div>
      </div>
    </div>
  </div>
);

// Skill Row Component
const SkillRow: React.FC<Skill> = ({ name, proficiency, color }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="font-medium text-gray-700 dark:text-gray-300">{name}</span>
    <div className="flex items-center">
      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
        <div className={`bg-${color}-600 dark:bg-${color}-400 h-2 rounded-full`} style={{ width: `${proficiency}%` }}></div>
      </div>
      <span className="text-gray-900 dark:text-white">{proficiency}%</span>
    </div>
  </div>
);
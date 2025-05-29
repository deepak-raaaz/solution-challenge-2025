import { CommunityStats } from './community-type';

const stats: CommunityStats[] = [
  { value: '25.4K', label: 'Members' },
  { value: '1.2K', label: 'Online Now' },
  { value: '156', label: 'Study Groups' },
  { value: '3.8K', label: 'Discussions' },
];

export default function CommunityHeader() {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-200">
        Learning Community
      </h1>
      <p className="text-xl mb-8 text-gray-200 opacity-80">
        Connect, collaborate, and learn together with fellow students
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
        {stats.map((stat, index) => (
          <div key={index} className="p-4 rounded-lg bg-gray-800/20 border border-gray-700/40">
            <div className="text-2xl font-bold text-blue-500">{stat.value}</div>
            <div className="text-sm text-gray-200 opacity-70">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
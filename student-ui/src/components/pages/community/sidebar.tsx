import { Contributor, StudyGroup } from './community-type';

const contributors: Contributor[] = [
  { name: 'Dr. Emily Watson', avatar: 'https://avatar.iran.liara.run/public/34', answers: 2847, rank: '🏆', rankColor: 'bg-yellow-400' },
  { name: 'James Liu', avatar: 'https://avatar.iran.liara.run/public/56', answers: 1923, rank: '🥈', rankColor: 'bg-gray-400' },
  { name: 'Anna Kowalski', avatar: 'https://avatar.iran.liara.run/public/78', answers: 1654, rank: '🥉', rankColor: 'bg-amber-700' },
];

const studyGroups: StudyGroup[] = [
  {
    name: 'ML Study Group',
    status: 'Live',
    statusColor: 'bg-green-500',
    members: 12,
    action: 'Join Session',
    actionFunc: 'ml',
  },
  {
    name: 'React Bootcamp',
    status: 'Starting Soon',
    statusColor: 'bg-orange-500',
    members: 8,
    time: '30 min',
    action: 'Reserve Spot',
    actionFunc: 'react',
  },
];

export default function Sidebar() {
  const handleJoinStudyGroup = (groupId: string) => {
    console.log(`Joining study group: ${groupId}`);
    // Implement join study group logic here
  };

  const handleViewGuidelines = () => {
    console.log('Viewing full guidelines');
    // Implement guidelines view logic here
  };

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-8 space-y-6">
        {/* AI Chatbot */}
        <div className="p-6 rounded-xl bg-gray-800/20 border border-gray-700/40">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-500">
              <span className="text-white">🤖</span>
            </div>
            <div className="ml-3">
              <h3 className="font-semibold text-gray-200">AI Learning Assistant</h3>
              <p className="text-xs text-gray-200 opacity-70">Always here to help</p>
            </div>
          </div>
          <div className="mb-4">
            <div className="p-3 rounded-lg mb-3 bg-gray-950">
              <p className="text-sm text-gray-200">
                Hi! I can help you with questions about programming, data science, or any learning topic. What would you like to know?
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ask me anything..."
              className="flex-1 p-2 rounded text-sm bg-gray-950 text-gray-200 border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => console.log('Sending chat message')}
              className="px-3 py-2 rounded bg-blue-500 text-white hover:scale-105 transition-transform"
            >
              Send
            </button>
          </div>
        </div>

        {/* Top Contributors */}
        <div className="p-6 rounded-xl bg-gray-800/20 border border-gray-700/40">
          <h3 className="text-lg font-semibold mb-4 text-gray-200">Top Contributors</h3>
          <div className="space-y-3">
            {contributors.map((contributor, index) => (
              <div key={index} className="flex items-center">
                <img src={contributor.avatar} alt={contributor.name} className="w-8 h-8 rounded-full mr-3" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-200">{contributor.name}</p>
                  <p className="text-xs text-gray-200 opacity-70">{contributor.answers.toLocaleString()} helpful answers</p>
                </div>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${contributor.rankColor}`}>
                  <span className="text-xs">{contributor.rank}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Study Groups */}
        <div className="p-6 rounded-xl bg-gray-800/20 border border-gray-700/40">
          <h3 className="text-lg font-semibold mb-4 text-gray-200">Active Study Groups</h3>
          <div className="space-y-3">
            {studyGroups.map((group, index) => (
              <div key={index} className="p-3 rounded-lg bg-gray-700/20 border border-gray-700/40">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-200">{group.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded ${group.statusColor} text-white`}>
                    {group.status}
                  </span>
                </div>
                <p className="text-xs mb-2 text-gray-200 opacity-70">
                  {group.members} members {group.time ? `• Starts in ${group.time}` : 'studying together'}
                </p>
                <button
                  onClick={() => handleJoinStudyGroup(group.actionFunc)}
                  className="text-xs px-3 py-1 rounded bg-blue-500 text-white hover:scale-105 transition-transform"
                >
                  {group.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Community Guidelines */}
        <div className="p-6 rounded-xl bg-gray-800/20 border border-gray-700/40">
          <h3 className="text-lg font-semibold mb-4 text-gray-200">Community Guidelines</h3>
          <div className="space-y-2 text-sm text-gray-200 opacity-80">
            <p>• Be respectful and constructive</p>
            <p>• Share knowledge freely</p>
            <p>• Help others learn and grow</p>
            <p>• No spam or self-promotion</p>
            <p>• Use appropriate tags</p>
          </div>
          <button
            onClick={handleViewGuidelines}
            className="mt-4 text-sm text-blue-500 hover:scale-105 transition-transform"
          >
            View Full Guidelines →
          </button>
        </div>
      </div>
    </div>
  );
}
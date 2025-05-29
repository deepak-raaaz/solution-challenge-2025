import { DiscussionGroup } from './community-type';

interface DiscussionGroupsProps {
  groups: DiscussionGroup[];
  onCreateGroup: () => void;
  onJoinGroup: (groupId: string) => void;
}

export default function DiscussionGroups({ groups, onCreateGroup, onJoinGroup }: DiscussionGroupsProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-200">Popular Discussion Groups</h2>
        <button
          onClick={onCreateGroup}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:scale-105 transition-transform"
        >
          + Create Group
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {groups.map((group) => (
          <div
            key={group.id}
            onClick={() => onJoinGroup(group.id)}
            className="p-6 rounded-xl bg-gray-800/20 border border-gray-700/40  transition-transform cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 bg-blue-500">
                  <span className="text-white text-xl">{group.icon}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-200">{group.name}</h3>
                  <p className="text-sm text-gray-200 opacity-70">{group.members} members</p>
                </div>
              </div>
              <span
                className={`w-3 h-3 rounded-full animate-pulse ${group.statusColor}`}
                style={{ animationDuration: `${Math.random() * 1.5 + 1}s` }}
              ></span>
            </div>
            <p className="text-sm mb-4 text-gray-200 opacity-80">{group.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-sm mr-4 text-blue-500">💬 {group.messagesToday} today</span>
                <span className={`text-sm ${group.statusColor}`}>🟢 {group.status}</span>
              </div>
              <button className="px-3 py-1 rounded text-sm bg-blue-500 text-white hover:scale-105 transition-transform">
                Join
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
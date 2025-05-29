interface GamificationSectionProps {
    onLeaderboardClick: () => void;
    onProfileClick: () => void;
  }
  
  interface Learner {
    name: string;
    xp: number;
    avatar: string;
    rank: number;
    badges: { color: string; icon: string }[];
  }
  
  interface Badge {
    title: string;
    description: string;
    color: string;
    icon: string;
  }
  
  const topLearners: Learner[] = [
    {
      name: 'Emma Wilson',
      xp: 2450,
      avatar: 'https://avatar.iran.liara.run/public/4',
      rank: 1,
      badges: [
        { color: 'yellow-500', icon: 'star' },
        { color: 'blue-500', icon: 'check' },
      ],
    },
    {
      name: 'David Kim',
      xp: 2180,
      avatar: 'https://avatar.iran.liara.run/public/5',
      rank: 2,
      badges: [
        { color: 'green-500', icon: 'circle-check' },
        { color: 'purple-500', icon: 'user' },
      ],
    },
    {
      name: 'Sofia Garcia',
      xp: 1950,
      avatar: 'https://avatar.iran.liara.run/public/6',
      rank: 3,
      badges: [{ color: 'red-500', icon: 'fire' }],
    },
  ];
  
  const recentBadges: Badge[] = [
    {
      title: 'First Course',
      description: 'Completed',
      color: 'yellow-500',
      icon: 'star',
    },
    {
      title: 'Quiz Master',
      description: '10 Tests Passed',
      color: 'blue-500',
      icon: 'check',
    },
    {
      title: 'Streak Keeper',
      description: '7 Day Streak',
      color: 'green-500',
      icon: 'circle-check',
    },
    {
      title: 'Community Helper',
      description: '50 Answers',
      color: 'purple-500',
      icon: 'user',
    },
  ];
  
  export default function GamificationSection({
    onLeaderboardClick,
    onProfileClick,
  }: GamificationSectionProps) {
    const getIconSvg = (icon: string) => {
      switch (icon) {
        case 'star':
          return (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        case 'check':
          return (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          );
        case 'circle-check':
          return (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          );
        case 'user':
          return (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
            </svg>
          );
        case 'fire':
          return (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                clipRule="evenodd"
              />
            </svg>
          );
        default:
          return null;
      }
    };
  
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-800/20 border border-gray-700/40 rounded-xl  p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#E6E6E6]">Top Learners</h3>
            <button
              onClick={onLeaderboardClick}
              className="text-[#1E90FF] hover:text-[#1E90FF]/80 text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {topLearners.map((learner) => (
              <div key={learner.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="relative">
                    <img
                      src={learner.avatar}
                      alt="Top Learner"
                      className="w-10 h-10 rounded-full"
                    />
                    <div
                      className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-black ${
                        learner.rank === 1
                          ? 'bg-yellow-500'
                          : learner.rank === 2
                          ? 'bg-gray-400'
                          : 'bg-orange-500'
                      }`}
                    >
                      {learner.rank}
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-[#E6E6E6]">{learner.name}</p>
                    <p className="text-sm text-neutral-400">
                      {learner.xp.toLocaleString()} XP
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {learner.badges.map((badge, index) => (
                    <div
                      key={index}
                      className={`w-6 h-6 bg-${badge.color} rounded-full flex items-center justify-center text-white`}
                    >
                      {getIconSvg(badge.icon)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-800/20 border border-gray-700/40 rounded-xl  p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#E6E6E6]">Recent Badges</h3>
            <button
              onClick={onProfileClick}
              className="text-[#1E90FF] hover:text-[#1E90FF]/80 text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {recentBadges.map((badge) => (
              <div
                key={badge.title}
                className="text-center p-4 bg-[#0E1217] rounded-lg border border-neutral-200/10"
              >
                <div
                  className={`w-12 h-12 bg-${badge.color} rounded-full flex items-center justify-center mx-auto mb-2`}
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    {getIconSvg(badge.icon)}
                  </svg>
                </div>
                <p className="text-sm font-medium text-[#E6E6E6]">{badge.title}</p>
                <p className="text-xs text-neutral-400">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
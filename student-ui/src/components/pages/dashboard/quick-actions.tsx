interface QuickAction {
    title: string;
    description: string;
    icon: string;
    section: string;
  }
  
  interface QuickActionsProps {
    onActionClick: (section: string) => void;
  }
  
  const actions: QuickAction[] = [
    {
      title: 'Take Assessment',
      description: 'Test your skills',
      icon: 'check-circle',
      section: 'skill-assessment',
    },
    {
      title: 'Join Community',
      description: 'Connect with peers',
      icon: 'users',
      section: 'community',
    },
    {
      title: 'AI Mentor',
      description: 'Get instant help',
      icon: 'chat',
      section: 'ai-chatbot',
    },
  ];
  
  export default function QuickActions({ onActionClick }: QuickActionsProps) {
    const getIconSvg = (icon: string) => {
      switch (icon) {
        case 'check-circle':
          return (
            <svg
              className="w-6 h-6 text-[#1E90FF]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          );
        case 'users':
          return (
            <svg
              className="w-6 h-6 text-[#1E90FF]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          );
        case 'chat':
          return (
            <svg
              className="w-6 h-6 text-[#1E90FF]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          );
        default:
          return null;
      }
    };
  
    return (
      <div className="bg-gray-800/20 border border-gray-700/40 rounded-xl p-6">
        <h3 className="text-xl font-bold text-[#E6E6E6] mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {actions.map((action) => (
            <button
              key={action.title}
              onClick={() => onActionClick(action.section)}
              className="flex items-center p-4 bg-[#0E1217] rounded-lg border border-neutral-200/10 hover:border-[#1E90FF]/30 transition-colors duration-200 group"
            >
              <div className="w-12 h-12 bg-[#1E90FF]/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-[#1E90FF]/30 transition-colors duration-200">
                {getIconSvg(action.icon)}
              </div>
              <div className="text-left">
                <p className="font-medium text-[#E6E6E6]">{action.title}</p>
                <p className="text-sm text-neutral-400">{action.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }
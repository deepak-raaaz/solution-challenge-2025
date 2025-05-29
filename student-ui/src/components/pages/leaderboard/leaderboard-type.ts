export interface LeaderboardUser {
    rank: number;
    name: string;
    avatar: string;
    xp: number;
    badges: number;
    streak: number;
    level: number;
    location: string;
    isCurrentUser: boolean;
  }
  
  export interface CurrentUser {
    rank: number;
    xp: number;
    weeklyXp: number;
    rankChange: number;
    levelProgress: {
      current: number;
      total: number;
      level: number;
    };
    weeklyChallenge: {
      completed: number;
      total: number;
      reward: number;
    };
    achievements: {
      title: string;
      description: string;
      icon: string;
      color: string;
    }[];
    regionalRankings: {
      region: string;
      rank: number;
      flag: string;
    }[];
  }
  
  export interface FilterState {
    timePeriod: string;
    region: string;
    skillCategory: string;
    levelRange: string;
  }
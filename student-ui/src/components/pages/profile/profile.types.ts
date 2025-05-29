export interface ProfileUser {
    name: string;
    avatar: string;
    jobTitle: string;
    level: number;
    verified: boolean;
    courses: number;
    badge: number;
    avgScore: string;
    rank: number;
    streak: number;
    socialLinks: {
      platform: string;
      username: string;
      connected: boolean;
      icon: string;
    }[];
    personalInfo: {
      fullName: string;
      email: string;
      jobTitle: string;
      location: string;
      bio: string;
    };
    learningGoals: {
      title: string;
      description: string;
      progress: number;
      timeLeft: string;
      icon: string;
      color: string;
    }[];
    recentActivity: {
      description: string;
      time: string;
      icon: string;
      color: string;
    }[];
    skillLevels: {
      skill: string;
      level: string;
      progress: number;
      color: string;
    }[];
    studyTime: {
      totalHours: string;
      activeDays: number;
      dailyAverage: string;
    };
    badges: {
      title: string;
      description: string;
      icon: string;
      color: string;
    }[];
    certificates: {
      title: string;
      issuer: string;
      date: string;
      color: string;
    }[];
    rankings: {
      category: string;
      rank: number;
      color: string;
    }[];
    preferences: {
      learningStyle: string;
      difficulty: string;
      dailyStudyGoal: number;
      languages: string[];
      notifications: {
        courseUpdates: boolean;
        studyReminders: boolean;
        communityActivity: boolean;
        achievements: boolean;
      };
      privacy: {
        publicProfile: boolean;
        showProgress: boolean;
        leaderboardParticipation: boolean;
      };
    };
  }
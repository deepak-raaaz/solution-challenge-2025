export interface DiscussionGroup {
  id: string;
  name: string;
  icon: string;
  members: string;
  description: string;
  messagesToday: number;
  status: string;
  statusColor: string;
}

export interface DiscussionPost {
  id: number;
  author: string;
  avatar: string;
  level: string;
  levelColor: string;
  time: string;
  tags: string[];
  title: string;
  content: string;
  likes: number;
  replies: Reply[];
  errorLog?: string;
  urgent?: boolean;
}

export interface Reply {
  id: number;
  author: string;
  avatar: string;
  level: string;
  levelColor: string;
  time: string;
  content: string;
  likes: number;
}

export interface FeaturedDiscussion {
  tags: string[];
  title: string;
  description: string;
  host: string;
  hostAvatar: string;
  time: string;
  participants: number;
}

export interface CommunityStats {
  value: string;
  label: string;
}

export interface Contributor {
  name: string;
  avatar: string;
  answers: number;
  rank: string;
  rankColor: string;
}

export interface StudyGroup {
  name: string;
  status: string;
  statusColor: string;
  members: number;
  action: string;
  actionFunc: string;
  time?: string;
}
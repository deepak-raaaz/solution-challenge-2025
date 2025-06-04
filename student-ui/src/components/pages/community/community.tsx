'use client';

import { useState } from 'react';
import { DiscussionGroup } from './community-type';
import CommunityHeader from './community-header';
import DiscussionGroups from './discussion-groups';
import Sidebar from './sidebar';
import CreateGroupModal from './create-group-model';
import DiscussionList from './discussion-list';


const groupsData: DiscussionGroup[] = [
  {
    id: 'ml',
    name: 'Machine Learning Hub',
    icon: '🤖',
    members: '8.2K',
    description: 'Discuss algorithms, share projects, and get help with ML concepts',
    messagesToday: 342,
    status: 'Very Active',
    statusColor: 'text-green-500',
  },
  {
    id: 'webdev',
    name: 'Web Dev Community',
    icon: '💻',
    members: '12.1K',
    description: 'Frontend, backend, and full-stack development discussions',
    messagesToday: 528,
    status: 'Very Active',
    statusColor: 'text-green-500',
  },
  {
    id: 'cybersec',
    name: 'Cybersecurity Forum',
    icon: '🔒',
    members: '5.8K',
    description: 'Security best practices, ethical hacking, and threat analysis',
    messagesToday: 156,
    status: 'Active',
    statusColor: 'text-orange-500',
  },
  {
    id: 'datascience',
    name: 'Data Science Circle',
    icon: '📊',
    members: '9.5K',
    description: 'Analytics, visualization, and data-driven insights',
    messagesToday: 287,
    status: 'Very Active',
    statusColor: 'text-green-500',
  },
];

export default function CommunitySection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likes, setLikes] = useState<{ [key: number]: number }>({});

  const handleCreateGroup = () => {
    setIsModalOpen(true);
  };

  const handleJoinGroup = (groupId: string) => {
    console.log(`Joining group: ${groupId}`);
    // Implement join group logic here
  };

  const handleLikePost = (postId: number) => {
    setLikes((prev) => ({
      ...prev,
      [postId]: (prev[postId] || 0) + 1,
    }));
  };

  const handleReplyPost = (postId: number) => {
    console.log(`Replying to post: ${postId}`);
    // Implement reply logic here
  };

  const handleSharePost = (postId: number) => {
    console.log(`Sharing post: ${postId}`);
    // Implement share logic here
  };

  const handleBookmarkPost = (postId: number) => {
    console.log(`Bookmarking post: ${postId}`);
    // Implement bookmark logic here
  };

  return (
    <section id="community" className="min-h-screen px-4 py-20">
      <div className="max-w-7xl mx-auto">
        <CommunityHeader />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <DiscussionGroups
              groups={groupsData}
              onCreateGroup={handleCreateGroup}
              onJoinGroup={handleJoinGroup}
            />
            <DiscussionList
              likes={likes}
              onLikePost={handleLikePost}
              onReplyPost={handleReplyPost}
              onSharePost={handleSharePost}
              onBookmarkPost={handleBookmarkPost}
            />
          </div>
          <Sidebar />
        </div>
      </div>
      <CreateGroupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
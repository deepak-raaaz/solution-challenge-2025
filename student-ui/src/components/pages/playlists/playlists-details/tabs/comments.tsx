'use client';

import React, { useState, FormEvent } from 'react';

interface Comment {
  id: number;
  userInitials: string;
  userName: string;
  avatarColor: string;
  timestamp: string;
  content: string;
  likes: number;
  dislikes: number;
}

const initialComments: Comment[] = [
  {
    id: 1,
    userInitials: 'MR',
    userName: 'Maria Rodriguez',
    avatarColor: 'bg-green-500',
    timestamp: '2 hours ago',
    content: 'Excellent explanation! The visual examples really helped me understand the concept of minimizing residuals. Thank you Dr. Chen!',
    likes: 24,
    dislikes: 1,
  },
  {
    id: 2,
    userInitials: 'JW',
    userName: 'James Wilson',
    avatarColor: 'bg-blue-500',
    timestamp: '4 hours ago',
    content: 'Could you make a follow-up video on multiple linear regression? This was so clear and well-structured.',
    likes: 18,
    dislikes: 0,
  },
  {
    id: 3,
    userInitials: 'LP',
    userName: 'Lisa Park',
    avatarColor: 'bg-orange-500',
    timestamp: '6 hours ago',
    content: 'The Python implementation at 15:30 was perfect. Exactly what I needed for my project!',
    likes: 15,
    dislikes: 0,
  },
];

const Comments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState<string>('');
  const [commentCount, setCommentCount] = useState<number>(47);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newCommentObj: Comment = {
      id: comments.length + 1,
      userInitials: 'YU',
      userName: 'You',
      avatarColor: 'bg-purple-500',
      timestamp: 'Just now',
      content: newComment,
      likes: 0,
      dislikes: 0,
    };

    setComments([newCommentObj, ...comments]);
    setNewComment('');
    setCommentCount((prev) => prev + 1);
  };

  const handleLike = (id: number) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
      )
    );
  };

  const handleDislike = (id: number) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id ? { ...comment, dislikes: comment.dislikes + 1 } : comment
      )
    );
  };

  const handleReply = (id: number) => {
    alert(`Replying to comment ${id}`);
  };

  return (
    <div className="space-y-6 max-md:space-y-3 bg-gray-800/10 border border-gray-700/40 p-4 rounded-lg " >
      <h3 className="text-xl font-semibold mx-2" >
        Comments ({commentCount})
      </h3>

      {/* Comment Input */}
      <div className="mb-6">
        <div className="flex gap-3">
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-semibold">YU</span>
          </div>
          <div className="flex-1">
            <form onSubmit={handleSubmit}>
              <textarea
                className="w-full bg-gray-700/20 border border-gray-600/40 rounded-lg p-3 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={3}
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                aria-label="Add a comment"
              />
              <div className="mt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#1E90FF' }}
                  disabled={!newComment.trim()}
                >
                  Comment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <div className={`w-8 h-8 ${comment.avatarColor} rounded-full flex items-center justify-center flex-shrink-0`}>
              <span className="text-white text-sm font-semibold">{comment.userInitials}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-300">{comment.userName}</span>
                <span className="text-xs text-gray-500">{comment.timestamp}</span>
              </div>
              <p className="text-gray-400 text-sm mb-2">{comment.content}</p>
              <div className="flex items-center gap-4">
                <button
                  className="text-xs text-gray-500 hover:text-blue-400 transition-colors"
                  onClick={() => handleReply(comment.id)}
                  aria-label={`Reply to comment by ${comment.userName}`}
                >
                  Reply
                </button>
                <button
                  className="text-xs text-gray-500 hover:text-blue-400 transition-colors"
                  onClick={() => handleLike(comment.id)}
                  aria-label={`Like comment by ${comment.userName}`}
                >
                  👍 {comment.likes}
                </button>
                <button
                  className="text-xs text-gray-500 hover:text-blue-400 transition-colors"
                  onClick={() => handleDislike(comment.id)}
                  aria-label={`Dislike comment by ${comment.userName}`}
                >
                  👎 {comment.dislikes}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
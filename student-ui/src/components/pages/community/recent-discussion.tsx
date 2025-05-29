import { DiscussionPost } from './community-type';

interface RecentDiscussionsProps {
  posts: DiscussionPost[];
  likes: { [key: number]: number };
  onLikePost: (postId: number) => void;
  onReplyPost: (postId: number) => void;
  onSharePost: (postId: number) => void;
  onBookmarkPost: (postId: number) => void;
}

export default function RecentDiscussions({
  posts,
  likes,
  onLikePost,
  onReplyPost,
  onSharePost,
  onBookmarkPost,
}: RecentDiscussionsProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-200">Recent Discussions</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="p-6 rounded-xl bg-gray-800">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start">
                <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full mr-4" />
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="font-semibold mr-2 text-gray-200">{post.author}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${post.levelColor}`}>
                      {post.level}
                    </span>
                    <span className="text-sm ml-2 text-gray-200 opacity-70">{post.time}</span>
                  </div>
                  <h4 className="text-lg font-medium mb-2 text-gray-200">{post.title}</h4>
                  <p className="text-sm mb-3 text-gray-200 opacity-80">{post.content}</p>
                  <div className="flex items-center">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-sm px-2 py-1 rounded mr-2 bg-blue-500/20 text-blue-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onLikePost(post.id)}
                  className="flex items-center text-sm text-gray-200 hover:scale-105 transition-transform"
                >
                  <span className="mr-1">👍</span> {likes[post.id] || post.likes}
                </button>
                <button
                  onClick={() => onReplyPost(post.id)}
                  className="flex items-center text-sm text-blue-500 hover:scale-105 transition-transform"
                >
                  <span className="mr-1">💬</span> {post.replies.length} replies
                </button>
                <button
                  onClick={() => onSharePost(post.id)}
                  className="flex items-center text-sm text-gray-200 hover:scale-105 transition-transform"
                >
                  <span className="mr-1">📤</span> Share
                </button>
              </div>
              <button
                onClick={() => onBookmarkPost(post.id)}
                className="text-sm text-gray-200 hover:scale-105 transition-transform"
              >
                🔖 Save
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
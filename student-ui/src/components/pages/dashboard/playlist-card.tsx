import Link from "next/link";

  
  interface PlaylistCardProps {
    playlist: any;
  }
  
  export default function PlaylistCard({ playlist }: PlaylistCardProps) {
    const handleStartCourse = () => {
      console.log(`Starting course: ${playlist.title}`);
      // Add navigation logic here
    };
  
    return (
      <div className="bg-gray-800/20 border border-gray-700/40 rounded-xl   overflow-hidden hover:border-[#1E90FF]/30 transition-colors duration-200">
        <div className="relative">
          <img
            src={playlist.image}
            alt={`${playlist.title} Course`}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
            {playlist.duration}
          </div>
          <div
            className={`absolute bottom-3 left-3 px-2 py-1 rounded text-xs font-semibold ${
              playlist.type === 'FREE' ? 'bg-green-500' : 'bg-blue-500'
            } text-white`}
          >
            {playlist.type}
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center mb-3">
            <img
              src={playlist.mentorAvatar}
              alt="Mentor"
              className="w-8 h-8 rounded-full mr-3"
            />
            <div>
              <p className="text-sm font-medium text-[#E6E6E6]">{playlist.mentor}</p>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 text-yellow-400 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xs text-neutral-400">Verified</span>
              </div>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-[#E6E6E6] mb-2">
            {playlist.title}
          </h3>
          <p className="text-sm text-neutral-400 mb-4">{playlist.description}</p>
          <div className="flex items-center justify-between text-sm text-neutral-400">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                {playlist.likes.toLocaleString()}
              </span>
              <span className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
                {playlist.shares.toLocaleString()}
              </span>
              <span className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
                {playlist.comments.toLocaleString()}
              </span>
            </div>
            <Link href={`/courses/${playlist.id}`} >
            <button
            //   onClick={handleStartCourse}
              className="bg-[#1E90FF] hover:bg-[#1E90FF]/80 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              Start Course
            </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
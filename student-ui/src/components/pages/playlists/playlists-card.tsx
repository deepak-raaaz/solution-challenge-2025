
interface PlaylistCardProps {
  playlist: any;
  onClick: () => void;
}

export default function PlaylistCard({ playlist, onClick }: PlaylistCardProps) {
  return (
    <div
      className="rounded-lg border border-gray-700/40 overflow-hidden hover:border-blue-500/50 transition-colors duration-200 cursor-pointer bg-gray-800/20"
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={playlist?.thumbnailUrl}
          alt={playlist?.title}
          className="w-full h-48 object-cover"
        />
        {playlist?.featured && (
          <span
            className="absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded-full text-white bg-blue-500"
          >
            Featured
          </span>
        )}
        <span
          className={`absolute top-3 right-3 px-2 py-1 text-xs font-medium rounded-full text-white ${
            playlist?.price === 'Free' ? 'bg-green-500' : 'bg-yellow-500'
          }`}
        >
          {playlist?.price}
        </span>
        <span className="absolute bottom-3 right-3 px-2 py-1 rounded text-xs font-medium text-white bg-black/70">
          {playlist?.duration}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-gray-100">{playlist?.title}</h3>
        <p className="text-sm text-gray-400 mb-3 line-clamp-3">{playlist?.description}</p>

        <div className="flex items-center mb-3">
          <img
            src={`https://avatar.iran.liara.run/public/${Math.floor(Math.random() * 100)}`}
            alt={playlist?.mentor}
            className="w-8 h-8 rounded-full mr-3"
          />
          <div>
            <p className="text-sm font-medium text-gray-100">{playlist?.userId.name}</p>
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-yellow-400 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs text-gray-400">Verified Educator</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-400">
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
              {playlist?.stats?.likes}
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
              {playlist?.stats?.shares}
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
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z"
                />
              </svg>
              {playlist?.stats?.comments}
            </span>
          </div>
          <div className="flex items-center">
            <div className="flex -space-x-1">
              {/* {playlist?.avatarColors.map((color:any, index:any) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded-full border-2 border-gray-800"
                  style={{ backgroundColor: color }}
                />
              ))} */}
            </div>
            <span className="ml-2 text-xs">+{playlist?.stats?.enrolled} enrolled</span>
          </div>
        </div>
      </div>
    </div>
  );
}
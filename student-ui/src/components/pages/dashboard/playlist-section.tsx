
import PlaylistCard from './playlist-card';
import playlists from './playlists.json';

interface PlaylistSectionProps {
  onViewAll: () => void;
}

export default function PlaylistSection({ onViewAll }: PlaylistSectionProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#E6E6E6]">Featured Playlists</h2>
        <button
          onClick={onViewAll}
          className="text-[#1E90FF] hover:text-[#1E90FF]/80 font-medium"
        >
          View All
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </div>
  );
}
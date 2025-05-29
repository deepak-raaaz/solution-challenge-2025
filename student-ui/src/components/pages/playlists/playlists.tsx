"use client"
import { useState } from 'react';
import playlistsData from './playlists.json';
import SearchBar from './search-bar';
import FilterSelect from './filter-select';
import PlaylistCard from './playlists-card';
import { PlaylistModal } from './playlists-model';


// Filter options
const skillOptions = ['All Skills', 'Web Development', 'Machine Learning', 'Data Science', 'Cybersecurity', 'Blockchain'];
const levelOptions = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
const typeOptions = ['All Types', 'Free', 'Premium'];

export default function Playlists() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('All Skills');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedPlaylist, setSelectedPlaylist] = useState<any | null>(null);

  // Filter playlists based on search and filters
  const filteredPlaylists = playlistsData.filter((playlist: any) => {
    const matchesSearch = playlist.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      playlist.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkill = selectedSkill === 'All Skills' || playlist.title.includes(selectedSkill);
    const matchesLevel = selectedLevel === 'All Levels' || playlist.level.includes(selectedLevel);
    const matchesType = selectedType === 'All Types' || playlist.price === selectedType;
    return matchesSearch && matchesSkill && matchesLevel && matchesType;
  });

  const featuredPlaylists = filteredPlaylists.filter(p => p.featured);
  const allPlaylists = filteredPlaylists;

  return (
    <section id="playlist-browser" className="min-h-screen p-6 max-lg:py-20 max-lg:px-4 ">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-100">Playlist Browser</h1>
        <p className="text-lg text-gray-400 mb-6">
          Discover curated learning paths from top educators and platforms
        </p>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <div className="flex flex-wrap gap-3">
            <FilterSelect
              value={selectedSkill}
              onChange={setSelectedSkill}
              options={skillOptions}
            />
            <FilterSelect
              value={selectedLevel}
              onChange={setSelectedLevel}
              options={levelOptions}
            />
            <FilterSelect
              value={selectedType}
              onChange={setSelectedType}
              options={typeOptions}
            />
          </div>
        </div>
      </div>

      {/* Featured Playlists */}
      {featuredPlaylists.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-100">Featured Playlists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {featuredPlaylists.map(playlist => (
              <PlaylistCard
                key={playlist.id}
                playlist={playlist}
                onClick={() => setSelectedPlaylist(playlist)}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Playlists */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-100">All Playlists</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {allPlaylists.map(playlist => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              onClick={() => setSelectedPlaylist(playlist)}
            />
          ))}
        </div>
      </div>

      {/* Playlist Modal */}
      {selectedPlaylist && (
        <PlaylistModal
          playlist={selectedPlaylist}
          onClose={() => setSelectedPlaylist(null)}
        />
      )}
    </section>
  );
}
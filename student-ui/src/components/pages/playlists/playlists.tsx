"use client";
import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchBar from './search-bar';
import FilterSelect from './filter-select';
import PlaylistCard from './playlists-card';
import { PlaylistModal } from './playlists-model';
import { useGetAllPlaylistsQuery } from '@/redux/features/api/generate/generateApi';

// Filter options
const skillOptions = ['All Skills', 'Web Development', 'Machine Learning', 'Data Science', 'Cybersecurity', 'Blockchain'];
const levelOptions = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
const typeOptions = ['All Types', 'Free', 'Paid', 'Mixed'];
const platformOptions = ['All Platforms', 'YouTube', 'Coursera', 'Udemy', 'edX'];
const sortOptions = ['Latest', 'Oldest'];

// TypeScript interfaces
interface Playlist {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  playlistPersonalizationId: {
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    resourcesType: 'Free' | 'Paid' | 'Mixed';
    platforms: string[];
    estimatedDuration: string;
  };
  metadata: {
    source?: string;
    language?: string;
    popularity?: number;
  };
  moduleIds: { _id: string; title: string; description: string }[];
  userId: { name: string };
}

interface QueryParams {
  page: number;
  limit: number;
  search?: string;
  level?: string;
  resourceType?: string;
  platforms?: string;
  tags?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export default function Playlists() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL query parameters
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [tempSearchQuery, setTempSearchQuery] = useState(searchQuery); // Temporary state for search input
  const [selectedSkill, setSelectedSkill] = useState(searchParams.get('tags') || 'All Skills');
  const [selectedLevel, setSelectedLevel] = useState(searchParams.get('level') || 'All Levels');
  const [selectedType, setSelectedType] = useState(searchParams.get('resourceType') || 'All Types');
  const [selectedPlatform, setSelectedPlatform] = useState(searchParams.get('platforms') || 'All Platforms');
  const [selectedSort, setSelectedSort] = useState(searchParams.get('sortOrder') === 'asc' ? 'Oldest' : 'Latest');
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: parseInt(searchParams.get('page') || '1', 10),
    limit: 9, // 3x3 grid
    sortBy: 'createdAt',
    sortOrder: searchParams.get('sortOrder') as 'asc' | 'desc' || 'desc',
  });
  const [shouldFetch, setShouldFetch] = useState(false);

  // Build query parameters for API
  const buildQueryParams = useCallback((): QueryParams => ({
    ...queryParams,
    search: searchQuery || undefined,
    level: selectedLevel !== 'All Levels' ? selectedLevel : undefined,
    resourceType: selectedType !== 'All Types' ? selectedType : undefined,
    platforms: selectedPlatform !== 'All Platforms' ? selectedPlatform : undefined,
    tags: selectedSkill !== 'All Skills' ? selectedSkill : undefined,
    sortBy: 'createdAt',
    sortOrder: selectedSort === 'Oldest' ? 'asc' : 'desc',
  }), [queryParams, searchQuery, selectedLevel, selectedType, selectedPlatform, selectedSkill, selectedSort]);

  // Generate unique query key for RTK Query cache
  const queryKey = JSON.stringify(buildQueryParams());

  // Update URL with query parameters
  const updateUrl = useCallback(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (selectedLevel !== 'All Levels') params.set('level', selectedLevel);
    if (selectedType !== 'All Types') params.set('resourceType', selectedType);
    if (selectedPlatform !== 'All Platforms') params.set('platforms', selectedPlatform);
    if (selectedSkill !== 'All Skills') params.set('tags', selectedSkill);
    if (queryParams.page > 1) params.set('page', queryParams.page.toString());
    if (selectedSort === 'Oldest') params.set('sortOrder', 'asc');

    const queryString = params.toString();
    router.replace(`/playlists${queryString ? `?${queryString}` : ''}`, { scroll: false });
  }, [searchQuery, selectedLevel, selectedType, selectedPlatform, selectedSkill, queryParams.page, selectedSort, router]);

  // Fetch playlists from API
  const { data, isLoading, error } = useGetAllPlaylistsQuery(buildQueryParams(), {
    refetchOnMountOrArgChange: true,
    skip: !shouldFetch,
  });

  // Use API data only, default to empty array if no data or error
  const playlists: Playlist[] = (data?.playlists && !error) ? data.playlists : [];
  const totalPages = (data?.pagination?.totalPages && !error) ? data.pagination.totalPages : 0;

  // Featured playlists (based on metadata.popularity)
  const featuredPlaylists = playlists.filter(
    p => p.metadata?.popularity && p.metadata.popularity > 50
  );

  // Handle search button click
  const handleSearch = () => {
    setSearchQuery(tempSearchQuery); // Update searchQuery with tempSearchQuery
    setQueryParams(prev => ({ ...prev, page: 1 }));
    setShouldFetch(true);
  };

  // Handle pagination
  const handleLoadMore = () => {
    if (queryParams.page < totalPages) {
      setQueryParams(prev => ({ ...prev, page: prev.page + 1 }));
      setShouldFetch(true);
    }
  };

  // Sync URL and fetch on filter changes (excluding searchQuery)
  useEffect(() => {
    setQueryParams(prev => ({ ...prev, page: 1 })); // Reset to page 1 on filter change
    setShouldFetch(true);
    updateUrl();
  }, [selectedSkill, selectedLevel, selectedType, selectedPlatform, selectedSort, updateUrl]);

  // Update URL when searchQuery changes (after search button click)
  useEffect(() => {
    updateUrl();
  }, [searchQuery, updateUrl]);

  // Initial fetch if URL has query params
  useEffect(() => {
    if (searchParams.toString()) {
      setShouldFetch(true);
    }
  }, [searchParams]);

  // Reset shouldFetch after data is loaded or error occurs
  useEffect(() => {
    if (data || error) {
      setShouldFetch(false);
    }
  }, [data, error]);

  return (
    <section id="playlist-browser" className="min-h-screen p-6 max-lg:py-20 max-lg:px-4 ">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-100">Playlist Browser</h1>
        <p className="text-lg text-gray-400 mb-6">
          Discover curated learning paths from top educators and platforms
        </p>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6 justify-between items-start lg:items-end">
          <div className="flex w-full lg:w-auto gap-2">
            <SearchBar searchQuery={tempSearchQuery} setSearchQuery={setTempSearchQuery} />
            <button
              onClick={handleSearch}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
              aria-label="Search playlists"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            <FilterSelect
              value={selectedSkill}
              onChange={setSelectedSkill}
              options={skillOptions}
              label="Skill"
            />
            <FilterSelect
              value={selectedLevel}
              onChange={setSelectedLevel}
              options={levelOptions}
              label="Level"
            />
            <FilterSelect
              value={selectedType}
              onChange={setSelectedType}
              options={typeOptions}
              label="Type"
            />
            <FilterSelect
              value={selectedPlatform}
              onChange={setSelectedPlatform}
              options={platformOptions}
              label="Platform"
            />
            <FilterSelect
              value={selectedSort}
              onChange={setSelectedSort}
              options={sortOptions}
              label="Sort"
              ariaLabel="Sort playlists"
            />
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-8 p-4 bg-red-600/20 border border-red-500 rounded-lg text-red-300 text-center">
          Failed to load playlists. Please try again later.
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-800 rounded-lg p-4">
              <div className="h-40 bg-gray-700 rounded mb-4"></div>
              <div className="h-6 bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      )}

      {/* Featured Playlists */}
      {!isLoading && featuredPlaylists.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-100">Featured Playlists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {featuredPlaylists.slice(0, 3).map(playlist => (
              <PlaylistCard
                key={playlist._id}
                playlist={playlist}
                onClick={() => setSelectedPlaylist(playlist)}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Playlists */}
      {!isLoading && playlists.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-100">All Playlists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {playlists.map(playlist => (
              <PlaylistCard
                key={playlist._id}
                playlist={playlist}
                onClick={() => setSelectedPlaylist(playlist)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && playlists.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-xl">No playlists found. Try adjusting your filters or search query.</p>
        </div>
      )}

      {/* Pagination */}
      {!isLoading && playlists.length > 0 && queryParams.page < totalPages && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Load More
          </button>
        </div>
      )}

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
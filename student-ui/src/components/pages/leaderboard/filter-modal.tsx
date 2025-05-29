import { FC, useState } from 'react';
import { FilterState } from './leaderboard-type';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  onReset: () => void;
}

const FilterModal: FC<FilterModalProps> = ({ isOpen, onClose, onApply, onReset }) => {
  const [filters, setFilters] = useState<FilterState>({
    timePeriod: 'All Time',
    region: 'Global',
    skillCategory: 'All Skills',
    levelRange: 'Any Level',
  });

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800/10 border border-gray-700/40 backdrop-blur-md flex items-center justify-center z-50" >
      <div className="bg-[#0E1217] border border-gray-700/40 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-100">Filter Leaderboard</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm mb-2">Time Period</label>
            <select
              className="w-full bg-gray-800/20 border border-gray-700/40 rounded-lg px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.timePeriod}
              onChange={(e) => setFilters({ ...filters, timePeriod: e.target.value })}
            >
              {['All Time', 'This Month', 'This Week', 'Today'].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-2">Region</label>
            <select
              className="w-full bg-gray-800/20 border border-gray-700/40 rounded-lg px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.region}
              onChange={(e) => setFilters({ ...filters, region: e.target.value })}
            >
              {['Global', 'North America', 'Europe', 'Asia', 'My Country', 'My City'].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-2">Skill Category</label>
            <select
              className="w-full bg-gray-800/20 border border-gray-700/40 rounded-lg px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.skillCategory}
              onChange={(e) => setFilters({ ...filters, skillCategory: e.target.value })}
            >
              {['All Skills', 'Web Development', 'Machine Learning', 'Data Science', 'Blockchain', 'Cybersecurity'].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-2">Level Range</label>
            <select
              className="w-full bg-gray-800/20 border border-gray-700/40 rounded-lg px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.levelRange}
              onChange={(e) => setFilters({ ...filters, levelRange: e.target.value })}
            >
              {['Any Level', '1-5', '6-10', '11-15', '16-20', '20+'].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              onClick={onReset}
              className="flex-1 bg-gray-800/20 border border-gray-700/40 text-gray-100 py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Reset
            </button>
            <button
              onClick={handleApply}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
  }
  
  export default function SearchBar({ value, onChange }: SearchBarProps) {
    return (
      <div className="relative">
        <input
          type="text"
          placeholder="Search courses, skills, or topics..."
          className="w-full bg-gray-800/20 border border-gray-700/40 rounded-lg px-4 py-3 pl-12 text-[#E6E6E6] placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:border-transparent"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <svg
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    );
  }
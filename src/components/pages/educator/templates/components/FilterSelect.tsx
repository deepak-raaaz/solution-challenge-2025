// components/FilterSelect.tsx
interface FilterSelectProps {
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
    className?: string;
  }
  
  export const FilterSelect: React.FC<FilterSelectProps> = ({ label, value, options, onChange, className }) => (
    <div className={`flex items-center ${className}`}>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">{label}:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-gray-100 dark:bg-gray-700 border border-gray-200/30 dark:border-gray-600/30 rounded-md text-sm py-1 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
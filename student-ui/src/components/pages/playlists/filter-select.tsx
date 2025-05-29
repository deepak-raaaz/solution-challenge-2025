import { Dispatch, SetStateAction } from 'react';

interface FilterSelectProps {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  options: string[];
}

export default function FilterSelect({ value, onChange, options }: FilterSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-4 py-3 rounded-lg border border-gray-700/40 focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-gray-800/20 text-gray-100"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
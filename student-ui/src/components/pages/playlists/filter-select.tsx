
import { Dispatch, SetStateAction } from 'react';

interface FilterSelectProps {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  options: string[];
  label?: string;
  ariaLabel?: string;
  disabledOption?: string; // Option to disable (e.g., "All Skills")
}

export default function FilterSelect({
  value,
  onChange,
  options,
  label,
  ariaLabel,
  disabledOption,
}: FilterSelectProps) {
  return (
    <div className="flex flex-col gap-1">
      {/* {label && (
        <label className="text-sm font-medium text-gray-300">
          {label}
        </label>
      )} */}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-2.5 rounded-lg border border-gray-700/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all duration-200 bg-gray-800/50 text-gray-100 text-sm hover:bg-gray-800/70 disabled:text-gray-500"
        aria-label={ariaLabel || label || 'Select filter'}
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
            disabled={disabledOption === option}
            className={disabledOption === option ? 'text-gray-500 bg-gray-900' : 'bg-gray-800 text-gray-100'}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
interface FilterSelectProps {
    options: string[];
    value: string;
    onChange: (value: string) => void;
  }
  
  export default function FilterSelect({ options, value, onChange }: FilterSelectProps) {
    return (
      <select
        className="bg-gray-800/20 border border-gray-700/40 rounded-lg px-4 py-2 text-[#E6E6E6] focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }
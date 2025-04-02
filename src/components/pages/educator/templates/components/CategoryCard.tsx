// components/CategoryCard.tsx

interface Category {
    name: string;
    count: number;
    icon: React.ReactNode;
    color: string;
  }
export const CategoryCard: React.FC<Category> = ({ name, count, icon, color }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200/30 dark:border-gray-700/30 p-4 text-center hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-colors cursor-pointer">
      <div className={`w-12 h-12 bg-${color}-100 dark:bg-${color}-900/30 rounded-full flex items-center justify-center mx-auto mb-3`}>
        <span className={`text-${color}-600 dark:text-${color}-400`}>{icon}</span>
      </div>
      <h3 className="text-sm font-medium text-gray-900 dark:text-white">{name}</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{count} templates</p>
    </div>
  );
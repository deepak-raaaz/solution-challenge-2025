// components/ComponentCategory.tsx
interface ComponentItem {
    icon: React.ReactNode;
    text: string;
  }
  
  interface ComponentCategoryProps {
    title: string;
    icon: React.ReactNode;
    items: ComponentItem[];
  }
  
  export const ComponentCategory: React.FC<ComponentCategoryProps> = ({ title, icon, items }) => {
    return (
      <div>
        <div className="flex items-center mb-2">
          {icon}
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</span>
        </div>
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-600/30 rounded-md cursor-move hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-colors">
              <div className="flex items-center">
                {item.icon}
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
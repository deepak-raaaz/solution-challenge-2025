import { FC } from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
  headingClassName?: string;
  subheadingClassName?: string;
}

const SectionHeading: FC<SectionHeadingProps> = ({ 
  title, 
  subtitle, 
  icon, 
  className = '',
  headingClassName = '',
  subheadingClassName = ''
}) => {
  return (
    <div className={`text-center ${className}`}>
      {icon && (
        <div className="inline-block p-3 bg-blue-100/50 dark:bg-blue-900/20 rounded-full mb-6">
          {icon}
        </div>
      )}
      <h2 className={`text-4xl md:text-5xl lg:text-6xl font-medium leading-wider font-pp-neue-montreal mb-4 text-transparent ${headingClassName}`}>
        <span className="bg-gradient-to-b from-blue-400 to-blue-600 bg-clip-text">
          {title.split(' ')[0]}
        </span>{" "}
        <span className="bg-gradient-to-b from-neutral-200 to-neutral-400 bg-clip-text">
          {title.split(' ').slice(1).join(' ')}
        </span>
      </h2>
      {subtitle && (
        <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto ${subheadingClassName}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading; 
import { FC } from 'react';

interface Course {
  id: number;
  title: string;
  image: string;
  completedModules: number;
  totalModules: number;
  progressColor: string;
}

interface CourseProgressProps {
  courses: Course[];
}

const CourseProgress: FC<CourseProgressProps> = ({ courses }) => {
  return (
    <div className="p-6 rounded-lg border bg-gray-800/20 border-gray-700/40">
      <h3 className="text-xl font-bold mb-6 text-[#E6E6E6]">Course Progress</h3>
      <div className="space-y-6">
        {courses.map((course) => (
          <div key={course.id}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <img src={course.image} alt={course.title} className="w-10 h-10 rounded-lg mr-3" />
                <div>
                  <h4 className="font-medium text-[#E6E6E6]">{course.title}</h4>
                  <p className="text-sm text-neutral-400">{`${course.completedModules} of ${course.totalModules} modules completed`}</p>
                </div>
              </div>
              <span className="text-sm font-medium" style={{ color: course.progressColor }}>
                {Math.round((course.completedModules / course.totalModules) * 100)}%
              </span>
            </div>
            <div className="w-full bg-neutral-700 rounded-full h-2">
              <div
                className="h-2 rounded-full"
                style={{
                  backgroundColor: course.progressColor,
                  width: `${(course.completedModules / course.totalModules) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseProgress;
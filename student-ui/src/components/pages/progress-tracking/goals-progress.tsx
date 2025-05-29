import { FC } from 'react';

interface Goal {
  id: number;
  title: string;
  current: number;
  target: number;
  progressColor: string;
}

interface GoalsProgressProps {
  goals: Goal[];
}

const GoalsProgress: FC<GoalsProgressProps> = ({ goals }) => {
  return (
    <div className="p-6 rounded-lg border bg-gray-800/20 border-gray-700/40">
      <h3 className="text-lg font-bold mb-4 text-[#E6E6E6]">Monthly Goals</h3>
      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-[#E6E6E6]">{goal.title}</span>
              <span className="text-sm text-neutral-400">{`${goal.current}/${goal.target}`}</span>
            </div>
            <div className="w-full bg-neutral-700 rounded-full h-2">
              <div
                className="h-2 rounded-full"
                style={{ backgroundColor: goal.progressColor, width: `${(goal.current / goal.target) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalsProgress;
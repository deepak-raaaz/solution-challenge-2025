import { FC, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WeeklyStudyChart: FC = () => {
  const [timeRange, setTimeRange] = useState('Last 7 days');

  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Study Hours',
        data: [2.5, 1.8, 3.2, 2.1, 2.8, 1.2, 3.6],
        backgroundColor: ['#1E90FF', '#1E90FF', '#1E90FF', '#1E90FF', '#1E90FF', '#1E90FF', '#10B981'],
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Hours',
          color: '#E6E6E6',
        },
        ticks: {
          color: '#E6E6E6',
        },
        grid: {
          color: '#374151',
        },
      },
      x: {
        ticks: {
          color: '#E6E6E6',
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1C2526',
        titleColor: '#E6E6E6',
        bodyColor: '#E6E6E6',
      },
    },
  };

  return (
    <div className="p-6 rounded-lg border border-gray-700/20 bg-gray-800/20 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-[#E6E6E6]">Weekly Study Time</h3>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-2 rounded-lg border border-neutral-200/20 focus:border-blue-500 focus:outline-none transition-colors duration-200 text-sm bg-[#0E1217] text-[#E6E6E6]"
        >
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 3 months</option>
        </select>
      </div>
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default WeeklyStudyChart;
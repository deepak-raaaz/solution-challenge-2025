import { FC } from 'react';
import CalendarHeatmap, { ReactCalendarHeatmapValue } from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

// Define TooltipDataAttrs type explicitly
type TooltipDataAttrs = { [key: string]: any };

interface StreakDay {
  date: string;
  count: number;
}

interface StudyStreakProps {
  streak: { days: StreakDay[]; currentStreak: number };
}

const StudyStreak: FC<StudyStreakProps> = ({ streak }) => {
  // Calculate start date (3 months ago from today, May 29, 2025)
  const today = new Date('2025-05-29');
  const startDate = new Date(today);
  startDate.setMonth(today.getMonth() - 3);

  // Transform data for CalendarHeatmap, filtering out invalid dates
  const heatmapData:any[] = streak.days
    .map((day) => {
      const parsedDate = new Date(day.date);
      // Only include valid dates
      if (isNaN(parsedDate.getTime())) return null;
      return { date: parsedDate, count: day.count };
    })
    .filter((item):any => item !== null && item.date !== null);

  // Custom class for color based on count
  const getClassForValue = (value: ReactCalendarHeatmapValue<Date> | undefined): string => {
    if (!value || !value.date) return 'fill-[#374151]'; // Inactive (no data or invalid date)
    if (value.count === undefined || value.count === 0) return 'fill-[#374151]'; // Inactive
    if (value.count === 1) return 'fill-[#10B981]'; // Active
    if (value.count === 2) return 'fill-[#1E90FF]'; // Current day
    return 'fill-[#374151]';
  };

  // Tooltip data attributes
  const getTooltipDataAttrs = (value: ReactCalendarHeatmapValue<Date> | undefined): TooltipDataAttrs => {
    if (!value || !value.date) return { 'data-tooltip': 'No activity' };
    const dateStr = value.date.toLocaleDateString();
    const status = value.count === undefined || value.count === 0 ? 'No activity' : value.count === 1 ? 'Studied' : 'Studied (Today)';
    return { 'data-tooltip': `${dateStr}: ${status}` };
  };

  return (
    <div className="p-6 rounded-lg border bg-gray-800/20 border-gray-700/40">
      <h3 className="text-lg font-bold mb-4 text-[#E6E6E6]">Study Streak</h3>
      <div className="mb-4">
        <CalendarHeatmap
          startDate={startDate}
          endDate={today}
          values={heatmapData}
          classForValue={getClassForValue}
          tooltipDataAttrs={getTooltipDataAttrs}
          showWeekdayLabels
          gutterSize={2}
        />
      </div>
      <style jsx>{`
        .react-calendar-heatmap .react-calendar-heatmap-weekday-labels {
          fill: #9CA3AF;
          font-size: 12px;
        }
        .react-calendar-heatmap .react-calendar-heatmap-month-labels {
          fill: #9CA3AF;
          font-size: 12px;
        }
        .react-calendar-heatmap rect {
          rx: 4px; /* Rounded corners */
        }
        [data-tooltip]:hover:after {
          content: attr(data-tooltip);
          position: absolute;
          background: #1C2526;
          color: #E6E6E6;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          z-index: 10;
          white-space: nowrap;
        }
      `}</style>
      <p className="text-xs text-neutral-400">Current streak: {streak.currentStreak} days</p>
    </div>
  );
};

export default StudyStreak;
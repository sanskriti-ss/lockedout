import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MoodReportChartProps {
  easy: Record<string, number[]>;
  hard: Record<string, number[]>;
}

// Simple bar chart using SVG (for demo/synthetic data)
const MOODS = ["stress", "focus", "relaxation", "engagement", "excitement", "interest"];
const COLORS = ["#ef4444", "#22c55e", "#3b82f6", "#f59e42", "#a855f7", "#eab308"];

const MoodReportChart: React.FC<MoodReportChartProps> = ({ easy, hard }) => {
  // Compute average for each mood
  const avg = (arr: number[]) => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
  return (
    <Card className="mt-8 bg-gray-900 max-w-10xl w-full mx-auto px-8">
      <CardHeader>
        <CardTitle className="text-lg text-white">Synthetic EEG Mood Report</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <svg width={500} height={320}>
            {MOODS.map((mood, i) => {
              const easyVals = easy[mood] || [];
              const hardVals = hard[mood] || [];
              const easyAvg = avg(easyVals);
              const hardAvg = avg(hardVals);
              // Bar positions
              const xEasy = 15 + i * 80;
              const xHard = 45 + i * 80;
              // Bar heights
              const yEasy = 260 - easyAvg * 2;
              const yHard = 260 - hardAvg * 2;
              return (
                <g key={mood}>
                  {/* Easy bar */}
                  <rect x={xEasy} y={yEasy} width={30} height={easyAvg * 2} fill={COLORS[i]} opacity={0.7} />
                  {/* Hard bar */}
                  <rect x={xHard} y={yHard} width={30} height={hardAvg * 2} fill={COLORS[i]} opacity={1} />
                  {/* Mood label */}
                  <text x={xEasy+30} y={290} textAnchor="middle" fontSize={14} fill="#fff">{mood}</text>
                </g>
              );
            })}
            {/* Legend */}
            <rect x={20} y={20} width={24} height={24} fill="#888" opacity={0.7} />
            <text x={50} y={38} fontSize={16} fill="#fff">Easy</text>
            <rect x={120} y={20} width={24} height={24} fill="#888" opacity={1} />
            <text x={150} y={38} fontSize={16} fill="#fff">Hard</text>
          </svg>
        </div>
        <div className="text-xs text-gray-300 mt-2">(Synthetic EEG values: 0-100, averaged per mood and difficulty.)</div>
      </CardContent>
    </Card>
  );
};

export default MoodReportChart;

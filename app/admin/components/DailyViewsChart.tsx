"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface DailyViewsData {
  date: string;
  views: number;
}

interface DailyViewsChartProps {
  data: DailyViewsData[];
}

const DailyViewsChart: React.FC<DailyViewsChartProps> = ({ data }) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const chartData = {
    labels: sortedData.map((item) => item.date),
    datasets: [
      {
        label: "Views",
        data: sortedData.map((item) => item.views),
        fill: false,
        borderColor: "blue",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="p-4 border rounded-md">
      <h3 className="text-lg font-semibold mb-2">Daily Views</h3>
      <Line data={chartData} />
    </div>
  );
};

export default DailyViewsChart;

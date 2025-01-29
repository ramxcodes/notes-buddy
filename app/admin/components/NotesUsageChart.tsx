"use client";

import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
  Legend
);

interface NoteUsageItem {
  noteSlug: string;
  totalViews: number;
  // other fields omitted for brevity
}

interface NotesUsageChartProps {
  usageItems: NoteUsageItem[];
}

/**
 * Displays a bar chart of the top 5 notes by totalViews
 */
export function NotesUsageChart({ usageItems }: NotesUsageChartProps) {
  // 1) Sort usageItems by totalViews desc
  const sorted = [...usageItems].sort(
    (a, b) => b.totalViews - a.totalViews
  );
  // 2) Take top 5
  const topFive = sorted.slice(0, 5);

  const labels = topFive.map((item) => item.noteSlug);
  const data = topFive.map((item) => item.totalViews);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Views",
        data,
        backgroundColor: "rgba(54, 162, 235, 0.7)",
      },
    ],
  };

  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: { ticks: { autoSkip: false } },
      y: { beginAtZero: true },
    },
  };

  if (topFive.length === 0) {
    return <p className="text-sm italic text-muted-foreground">No data to display</p>;
  }

  return (
    <div className="max-w-xl overflow-x-auto">
      <Bar data={chartData} options={options} />
    </div>
  );
}

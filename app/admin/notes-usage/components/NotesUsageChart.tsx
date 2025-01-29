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
import { NoteUsageItem } from "./types";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Title, Legend);

interface NotesUsageChartProps {
  usageItems: NoteUsageItem[];
}

export function NotesUsageChart({ usageItems }: NotesUsageChartProps) {
  const sorted = [...usageItems].sort((a, b) => b.totalViews - a.totalViews);
  const topFive = sorted.slice(0, 5);

  if (!topFive.length) {
    return <p className="text-sm italic text-muted-foreground">No data to display</p>;
  }

  const labels = topFive.map((item) => item.noteSlug);
  const dataPoints = topFive.map((item) => item.totalViews);

  const data = {
    labels,
    datasets: [
      {
        label: "Views",
        data: dataPoints,
        backgroundColor: "rgba(213, 135, 235, 0.7)",
      },
    ],
  };

  const options: any = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      x: { ticks: { autoSkip: false } },
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="max-w-xl overflow-x-auto">
      <Bar data={data} options={options} />
    </div>
  );
}

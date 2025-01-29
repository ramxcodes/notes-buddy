"use client";

import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { parseISO, format } from "date-fns";
import { NoteUsageItem } from "./types";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
  Legend
);

interface NotesUsageTrendChartProps {
  usageItems: NoteUsageItem[];
}

export function NotesUsageTrendChart({ usageItems }: NotesUsageTrendChartProps) {
  // Build a day -> count map from all userEntries
  const dailyCounts = useMemo(() => {
    const map: Record<string, number> = {};
    usageItems.forEach((item) => {
      item.userEntries.forEach((entry) => {
        const day = format(parseISO(entry.viewedAt), "yyyy-MM-dd");
        map[day] = (map[day] || 0) + 1;
      });
    });

    // Convert to sorted array
    const entries = Object.entries(map).sort(([a], [b]) => (a < b ? -1 : 1));
    return entries; // e.g. [["2025-01-01", 5], ["2025-01-02", 10], ...]
  }, [usageItems]);

  if (!dailyCounts.length) {
    return <p className="text-sm italic text-muted-foreground">No data for trend chart</p>;
  }

  const labels = dailyCounts.map(([day]) => day);
  const dataPoints = dailyCounts.map(([_, count]) => count);

  const data = {
    labels,
    datasets: [
      {
        label: "Daily Views",
        data: dataPoints,
        borderColor: "rgba(99, 102, 241, 0.8)",
        backgroundColor: "rgba(5, 8, 199, 0.3)",
        fill: true,
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
      x: { ticks: { autoSkip: true, maxRotation: 0 } },
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="max-w-xl overflow-x-auto">
      <Line data={data} options={options} />
    </div>
  );
}

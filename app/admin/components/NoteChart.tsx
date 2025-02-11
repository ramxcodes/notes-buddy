"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface NoteData {
  noteSlug: string;
  count: number;
}

interface NoteChartProps {
  notes: Array<NoteData>;
}

const NoteChart: React.FC<NoteChartProps> = ({ notes }) => {
  const labels = notes.map((n) => n.noteSlug);
  const dataValues = notes.map((n) => n.count);

  const data = {
    labels,
    datasets: [
      {
        label: "Visits per Note",
        data: dataValues,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: false },
    },
  };

  return <Bar data={data} options={options} />;
};

export default NoteChart;

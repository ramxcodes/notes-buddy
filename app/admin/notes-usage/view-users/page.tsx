"use client";

import React, { useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { parseISO, format } from "date-fns";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
  Legend,
  LineElement,
  PointElement
);

interface UserEntry {
  name: string;
  email: string | null;
  planTier?: string;
  isBlocked?: boolean;
  viewedAt: string;
  ip?: string;
  timeSpent?: number;
}

interface NoteUsageItem {
  noteSlug: string;
  totalViews: number;
  lastViewed?: string;
  userEntries: UserEntry[];
}

const BASE_URL = process.env.NEXTAUTH_URL || "";

interface UserBarChartProps {
  topUsers: { email: string; views: number }[];
}

function UserBarChart({ topUsers }: UserBarChartProps) {
  if (!topUsers.length) {
    return <p className="text-sm italic">No data to display</p>;
  }

  const labels = topUsers.map((user) => user.email);
  const dataPoints = topUsers.map((user) => user.views);

  const data = {
    labels,
    datasets: [
      {
        label: "Views",
        data: dataPoints,
        backgroundColor: "rgba(161, 39, 245, 0.7)",
      },
    ],
  };

  const options = {
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

interface UserTrendChartProps {
  dailyData: { date: string; count: number }[];
}

function UserTrendChart({ dailyData }: UserTrendChartProps) {
  if (!dailyData.length) {
    return <p className="text-sm italic">No trend data available</p>;
  }

  const labels = dailyData.map((item) => item.date);
  const dataPoints = dailyData.map((item) => item.count);

  const data = {
    labels,
    datasets: [
      {
        label: "Daily Views",
        data: dataPoints,
        fill: true,
        borderColor: "rgba(161, 39, 245, 0.8)",
        backgroundColor: "rgba(128, 0, 128, 0.3)",
      },
    ],
  };

  const options = {
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

function ViewUsersContent() {
  const searchParams = useSearchParams();
  const noteSlugParam = searchParams.get("noteSlug");
  const noteSlug = noteSlugParam ? decodeURIComponent(noteSlugParam) : null;

  const [userData, setUserData] = useState<UserEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");

  useEffect(() => {
    if (!noteSlug) {
      setError("No note identifier provided.");
      setLoading(false);
      return;
    }
    fetch(`${BASE_URL}/admin/api/notes-usage`, {
      cache: "no-store",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch usage data: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data: NoteUsageItem[]) => {
        const item = data.find((item) => item.noteSlug === noteSlug);
        if (item) {
          setUserData(item.userEntries);
        } else {
          setError("No data found for this note.");
        }
      })
      .catch((err) => {
        console.error("Error fetching usage data:", err);
        setError("Error fetching usage data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [noteSlug]);

  const topUsers = useMemo(() => {
    const map: Record<string, number> = {};
    userData.forEach((entry) => {
      const key = entry.email || "Anonymous";
      map[key] = (map[key] || 0) + 1;
    });
    const sorted = Object.entries(map)
      .map(([email, views]) => ({ email, views }))
      .sort((a, b) => b.views - a.views);
    return sorted.slice(0, 5);
  }, [userData]);

  const dailyData = useMemo(() => {
    const map: Record<string, number> = {};
    userData.forEach((entry) => {
      const day = format(parseISO(entry.viewedAt), "yyyy-MM-dd");
      map[day] = (map[day] || 0) + 1;
    });
    const sorted = Object.entries(map)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => (a.date < b.date ? -1 : 1));
    return sorted;
  }, [userData]);

  const sortedUserData = useMemo(() => {
    return [...userData].sort((a, b) => {
      if (sortOrder === "latest") {
        return parseISO(b.viewedAt).getTime() - parseISO(a.viewedAt).getTime();
      } else {
        return parseISO(a.viewedAt).getTime() - parseISO(b.viewedAt).getTime();
      }
    });
  }, [userData, sortOrder]);

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          User Analytics for Note:{" "}
          <span className="font-mono font-normal">{noteSlug || "N/A"}</span>
        </h1>
        <Link href="/admin/notes-usage">
          <Button variant="outline" size="sm">
            Back
          </Button>
        </Link>
      </div>

      {loading ? (
        <p>Loading data…</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Analytics</h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Top Users (by Views)</h3>
                <UserBarChart topUsers={topUsers} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">
                  Daily User Activity Trend
                </h3>
                <UserTrendChart dailyData={dailyData} />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">All User Entries</h2>
            <div className="mb-4 flex items-center gap-2">
              <label className="text-sm font-medium">Sort by:</label>
              <Select
                value={sortOrder}
                onValueChange={(val: "latest" | "oldest") => setSortOrder(val)}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  {/* <TableHead>User</TableHead> */}
                  <TableHead>Email</TableHead>
                  <TableHead>Viewed At</TableHead>
                  {/* <TableHead>Total Time (min)</TableHead> */}
                  <TableHead>IP Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedUserData.map((entry, index) => (
                  <TableRow key={index}>
                    {/* <TableCell>{entry.name}</TableCell> */}
                    <TableCell>{entry.email || "Anonymous"}</TableCell>
                    <TableCell>
                      {format(parseISO(entry.viewedAt), "dd-MMM-yyyy hh:mm a")}
                    </TableCell>
                    {/* <TableCell>
                      {entry.timeSpent
                        ? (entry.timeSpent / 60).toFixed(1)
                        : "0"}
                    </TableCell> */}
                    <TableCell>{entry.ip || "N/A"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
}

export default function ViewUsersPage() {
  return (
    <Suspense fallback={<p>Loading Data...</p>}>
      <ViewUsersContent />
    </Suspense>
  );
}

"use client";

import { useEffect, useState, useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { parseISO, format, isBefore, isAfter } from "date-fns";

import { NotesUsageStats } from "./components/NotesUsageStats";
import { NotesUsageChart } from "./components/NotesUsageChart";
import { NotesUsageTrendChart } from "./components/NotesUsageTrendChart";
import { NotesUsageTable } from "./components/NotesUsageTable";
import { FilterSection } from "./components/FilterSection";
import { ExportCsvButton } from "./components/ExportCsvButton";
import { PaginationControl } from "./components/PaginationControl";

interface UsageStats {
  totalUsageRecords: number;
  distinctSlugs: number;
  topSlug: string | null;
  topCount: number;
  totalTimeStudied: number;
}

interface NoteUsageItem {
  noteSlug: string;
  totalViews: number;
  lastViewed?: string;
  userEntries: {
    name: React.ReactNode;
    email: string | null;
    planTier?: string;
    isBlocked?: boolean;
    viewedAt: string;
    ip?: string;
    timeSpent?: number;
  }[];
  anonymousCount: number;
  verifiedCount: number;
  premiumCount: number;
  freeCount: number;
  university: string;
  degree: string;
  year: string;
  semester: string;
  subject: string;
  unit: string;
  noteLink: string;
}

const BASE_URL = process.env.NEXTAUTH_URL || "";

export default function NotesUsagePage() {
  const [stats, setStats] = useState<UsageStats | null>(null);
  const [usageData, setUsageData] = useState<NoteUsageItem[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingUsage, setLoadingUsage] = useState(true);

  const [universityFilter, setUniversityFilter] = useState("all");
  const [degreeFilter, setDegreeFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [semesterFilter, setSemesterFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [startDate, setStartDate] = useState(""); // "YYYY-MM-DD"
  const [endDate, setEndDate] = useState("");

  const [sortField, setSortField] = useState<"views" | "lastViewed">("views");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      const response = await fetch(`${BASE_URL}/admin/api/notes-usage/stats`, {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch stats: ${response.statusText}`);
      }
      const data: UsageStats = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch usage stats:", error);
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchUsage = async () => {
    setLoadingUsage(true);
    try {
      const response = await fetch(`${BASE_URL}/admin/api/notes-usage`, {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch usage data: ${response.statusText}`);
      }
      const data: NoteUsageItem[] = await response.json();
      setUsageData(data);
    } catch (error) {
      console.error("Failed to fetch usage data:", error);
    } finally {
      setLoadingUsage(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchUsage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredData = useMemo(() => {
    return usageData.filter((item) => {
      if (universityFilter !== "all" && item.university !== universityFilter) {
        return false;
      }
      if (degreeFilter !== "all" && item.degree !== degreeFilter) {
        return false;
      }
      if (yearFilter !== "all" && item.year !== yearFilter) {
        return false;
      }
      if (semesterFilter !== "all" && item.semester !== semesterFilter) {
        return false;
      }
      if (
        subjectFilter &&
        !item.subject.toLowerCase().includes(subjectFilter.toLowerCase())
      ) {
        return false;
      }
      if (startDate || endDate) {
        const start = startDate ? parseISO(startDate) : null;
        const end = endDate ? parseISO(endDate) : null;

        const hasEntryInRange = item.userEntries.some((entry) => {
          const viewed = parseISO(entry.viewedAt);
          if (start && isBefore(viewed, start)) {
            return false;
          }
          if (end && isAfter(viewed, end)) {
            return false;
          }
          return true;
        });
        if (!hasEntryInRange) {
          return false;
        }
      }
      return true;
    });
  }, [
    usageData,
    universityFilter,
    degreeFilter,
    yearFilter,
    semesterFilter,
    subjectFilter,
    startDate,
    endDate,
  ]);

  const sortedData = useMemo(() => {
    const copy = [...filteredData];
    copy.sort((a, b) => {
      if (sortField === "views") {
        const diff = a.totalViews - b.totalViews;
        return sortDirection === "asc" ? diff : -diff;
      } else {
        const dateA = a.lastViewed ? parseISO(a.lastViewed) : null;
        const dateB = b.lastViewed ? parseISO(b.lastViewed) : null;
        if (dateA && dateB) {
          return sortDirection === "asc"
            ? dateA.getTime() - dateB.getTime()
            : dateB.getTime() - dateA.getTime();
        } else if (dateA) {
          return sortDirection === "asc" ? 1 : -1;
        } else if (dateB) {
          return sortDirection === "asc" ? -1 : 1;
        }
        return 0;
      }
    });
    return copy;
  }, [filteredData, sortField, sortDirection]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredData, sortField, sortDirection]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleExportCSV = () => {
    const header = [
      "noteSlug",
      "totalViews",
      "lastViewed",
      "anonymousCount",
      "verifiedCount",
      "premiumCount",
      "freeCount",
      "university",
      "degree",
      "year",
      "semester",
      "subject",
      "unit",
      "noteLink",
    ].join(",");
    const rows = sortedData.map((item) => {
      return [
        `"${item.noteSlug}"`,
        item.totalViews,
        item.lastViewed ?? "",
        item.anonymousCount,
        item.verifiedCount,
        item.premiumCount,
        item.freeCount,
        item.university,
        item.degree,
        item.year,
        item.semester,
        item.subject,
        item.unit,
        item.noteLink,
      ].join(",");
    });
    const csv = [header, ...rows].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `notes-usage-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Notes Analytics</h1>
      <Separator className="mb-6" />

      {loadingStats ? (
        <Skeleton className="h-24 w-full mb-6" />
      ) : (
        stats && <NotesUsageStats stats={stats} />
      )}

      <FilterSection
        usageData={usageData}
        universityFilter={universityFilter}
        setUniversityFilter={setUniversityFilter}
        degreeFilter={degreeFilter}
        setDegreeFilter={setDegreeFilter}
        yearFilter={yearFilter}
        setYearFilter={setYearFilter}
        semesterFilter={semesterFilter}
        setSemesterFilter={setSemesterFilter}
        subjectFilter={subjectFilter}
        setSubjectFilter={setSubjectFilter}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        sortField={sortField}
        setSortField={setSortField}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
      <ExportCsvButton onExportCSV={handleExportCSV} />

      <Separator className="mb-6" />
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 mb-6 gap-4 items-center justify-between sm:mx-0 md:mx-20">
        <div>
          <h2 className="text-xl font-bold mb-4">Analytics</h2>
          <p className="text-sm text-muted-foreground mb-2">
            Below is a bar chart of the top 5 notes by views (filtered +
            sorted).
          </p>
          <div className="mb-6 mt-2">
            <NotesUsageChart usageItems={sortedData} />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Daily View Trend</h2>
          <p className="text-sm text-muted-foreground mb-2">
            Aggregated daily count of all filtered + sorted usage.
          </p>
          <div className="mb-6 mt-2">
            <NotesUsageTrendChart usageItems={filteredData} />
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Top Reading Notes</h2>
      <Separator className="mb-6" />

      {loadingUsage ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-full" />
          ))}
        </div>
      ) : (
        <NotesUsageTable usageData={paginatedData} />
      )}

      <PaginationControl
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
}

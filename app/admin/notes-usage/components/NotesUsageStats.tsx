"use client";

interface UsageStats {
  totalUsageRecords: number;
  distinctSlugs: number;
  topSlug: string | null;
  topCount: number;
}

interface NotesUsageStatsProps {
  stats: UsageStats;
}

export function NotesUsageStats({ stats }: NotesUsageStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="p-4 border rounded-md text-center">
        <h3 className="text-sm font-medium text-gray-600 mb-1">Total Views</h3>
        <p className="text-xl font-bold">{stats.totalUsageRecords}</p>
      </div>
      <div className="p-4 border rounded-md text-center">
        <h3 className="text-sm font-medium text-gray-600 mb-1">
          Distinct Slugs
        </h3>
        <p className="text-xl font-bold">{stats.distinctSlugs}</p>
      </div>
      <div className="p-4 border rounded-md text-center">
        <h3 className="text-sm font-medium text-gray-600 mb-1">Top Slug</h3>
        <p className="text-sm font-bold">{stats.topSlug || "N/A"}</p>
      </div>
      <div className="p-4 border rounded-md text-center">
        <h3 className="text-sm font-medium text-gray-600 mb-1">
          Top Slug Views
        </h3>
        <p className="text-xl font-bold">{stats.topCount}</p>
      </div>
    </div>
  );
}

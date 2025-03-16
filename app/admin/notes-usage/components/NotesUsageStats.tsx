"use client";

interface UsageStats {
  totalUsageRecords: number;
  distinctSlugs: number;
  topSlug: string | null;
  topCount: number;
  totalTimeStudied: number;
}

interface NotesUsageStatsProps {
  stats: UsageStats;
}

export function NotesUsageStats({ stats }: NotesUsageStatsProps) {
  const hours = Math.floor(stats.totalTimeStudied / 3600);
  const minutes = Math.floor((stats.totalTimeStudied % 3600) / 60);
  const seconds = Math.round(stats.totalTimeStudied % 60);

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
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
      <div className="p-4 border rounded-md text-center">
        <h3 className="text-sm font-medium text-gray-600 mb-1">
          Total Time Studied
        </h3>
        <p className="text-xl font-bold">
          {hours}h {minutes}m {seconds}s
        </p>
      </div>
    </div>
  );
}

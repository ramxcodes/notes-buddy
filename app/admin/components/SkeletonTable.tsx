"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonTable = () => {
  return (
    <div className="animate-pulse">
      <Skeleton className="h-6 w-1/3 mb-4" />
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="border-b">
              {["Name", "Email", "Plan", "Total Visits", "Actions"].map(
                (header) => (
                  <th key={header} className="px-4 py-2">
                    <Skeleton className="h-4 w-full" />
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, idx) => (
              <tr key={idx} className="border-b">
                {Array.from({ length: 5 }).map((_, colIdx) => (
                  <td key={colIdx} className="px-4 py-2">
                    <Skeleton className="h-4 w-full" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SkeletonTable;

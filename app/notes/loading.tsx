"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingNotes() {
  return (
    <div className="container max-w-3xl py-6">

      <Skeleton className="h-10 w-2/3 mb-4" />

      <div className="flex space-x-2 mb-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-20" />
      </div>

      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

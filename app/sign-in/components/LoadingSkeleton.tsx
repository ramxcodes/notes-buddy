import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const LoadingSkeleton = () => (
  <Card className="px-24 py-20 space-y-4 flex flex-col items-center justify-center font-wotfard animate-pulse">
    <Skeleton className="w-24 h-24 rounded-full" />
    <Skeleton className="h-10 w-48 rounded-md" />
    <div className="text-left space-y-2 flex flex-col items-start justify-center w-full">
      <Skeleton className="h-6 w-64 rounded-md" />
      <Skeleton className="h-6 w-48 rounded-md" />
      <Skeleton className="h-6 w-56 rounded-md" />
      <Skeleton className="h-6 w-40 rounded-md" />
      <Skeleton className="h-6 w-52 rounded-md" />
    </div>
  </Card>
);
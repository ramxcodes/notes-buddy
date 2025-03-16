"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const ScrollProcess = dynamic(
  () => import("@/components/notes-ui/ScrollProcess"),
  {
    ssr: false,
    loading: () => (
      <div className="mb-4">
        <Skeleton className="h-4 w-1/2 mb-2" />
      </div>
    ),
  }
);

const DynamicArticle = dynamic(
  () => import("@/components/notes-ui/DynamicArticle"),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-3">
        <Skeleton className="h-6 w-1/2 mb-2" />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
    ),
  }
);

interface SlugArticleProps {
  title: string;
  description: string;
  tags?: string[];
  body: string;
  slug: string;
  currentUnit: number;
  totalUnits: number;
}

export function SlugArticle({
  title,
  description,
  tags,
  body,
  slug,
  currentUnit,
  totalUnits,
}: SlugArticleProps) {
  return (
    <>
      <Suspense fallback={null}>
        <ScrollProcess />
      </Suspense>
      <Suspense fallback={null}>
        <DynamicArticle
          title={title}
          description={description}
          tags={tags}
          body={body}
          slug={slug}
          currentUnit={currentUnit}
          totalUnits={totalUnits}
        />
      </Suspense>
    </>
  );
}

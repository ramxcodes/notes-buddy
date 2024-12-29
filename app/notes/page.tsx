"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { posts } from "#site/content";
import { PostItemBox } from "@/components/post-item-box";
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllTags, sortPosts, sortTagsByCount } from "@/lib/utils";
import dynamic from "next/dynamic";
import TagError from "@/components/TagError";
import { NotesSeach } from "@/components/NotesSeach";

const QueryPagination = dynamic(
  () =>
    import("@/components/query-pagination").then((mod) => mod.QueryPagination),
  { ssr: false }
);
// const NotesSeach = dynamic(
//   () =>
//     import("@/components/NotesSeach").then((mod) => mod.NotesSeach),
//   { ssr: false }
// );

const POSTS_PER_PAGE = 6;

function BlogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get("tags")?.split(",") || []
  );
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedTags.length > 0) {
      params.set("tags", selectedTags.join(","));
    }
    params.set("page", currentPage.toString());
    router.push(`?${params.toString()}`);
  }, [selectedTags, currentPage, router]);

  const sortedPosts = sortPosts(
    posts.filter((post) => {
      if (!post.published || post.excludeFromMain) return false;
      if (selectedTags.length === 0) return true;
      return selectedTags.every((tag) => post.tags?.includes(tag));
    })
  );

  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);
  const displayPosts = sortedPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage
  );

  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    setCurrentPage(1);
  };

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl">
            Welcome to Notes
          </h1>
          <p className="text-xl text-muted-foreground">
            Your exams last moment notes are here!
          </p>
          <NotesSeach/>
        </div>
      </div>
      <Card className="my-10">
        <CardHeader>
          <CardTitle>Search By :</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {sortedTags?.map((tag) => (
            <Tag
              tag={tag}
              key={tag}
              count={tags[tag]}
              onClick={() => toggleTag(tag)}
              selected={selectedTags.includes(tag)}
            />
          ))}
        </CardContent>
      </Card>
      <div className="flex flex-col gap-4">
        <hr />
        {displayPosts?.length > 0 ? (
          <ul className="gap-4 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {displayPosts.map((post) => {
              const { slug, title, description, tags } = post;
              return (
                <li key={slug}>
                  <PostItemBox
                    slug={slug}
                    title={title}
                    description={description}
                    tags={tags}
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <TagError />
        )}
        <QueryPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          className="justify-end mt-4"
        />
      </div>
    </div>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={<div>Loading Notes...</div>}>
      <BlogContent />
    </Suspense>
  );
}

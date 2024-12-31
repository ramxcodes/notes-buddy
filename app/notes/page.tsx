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
import { NotesSearch } from "@/components/NotesSearch";
import BlurFade from "@/components/ui/blur-fade";

const QueryPagination = dynamic(
  () =>
    import("@/components/query-pagination").then((mod) => mod.QueryPagination),
  { ssr: false }
);

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
    <div className="container max-w-4xl py-6 lg:py-10 font-wotfard">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="text-[2.3rem] lg:text-[4.5rem] md:text-[4rem] leading-[1] font-bold dark:bg-gradient-to-b dark:from-[rgba(244,244,255,1)] dark:to-[rgba(181,180,207,1)] dark:text-transparent dark:bg-clip-text py-2 text-center">
            Welcome to Notes Buddy!
          </h1>
          <p className="text-xl text-center text-muted-foreground">
            Your exams last moment notes are here!
          </p>
          <NotesSearch DropBox={true} />
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
                  <BlurFade delay={0.1} inView>
                    <PostItemBox
                      slug={slug}
                      title={title}
                      description={description}
                      tags={tags}
                    />
                  </BlurFade>
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

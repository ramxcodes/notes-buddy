"use client";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { posts } from "#site/content";
import { PostItemBox } from "@/components/post-item-box";
import { QueryPagination } from "@/components/query-pagination";
import { Tag } from "@/components/tag";
import { sortPosts } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const pathname = usePathname(); // Get the current pathname
  const searchParams = useSearchParams(); // Access query parameters
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Decode query params on initial load
  useEffect(() => {
    const initialPage = parseInt(searchParams.get("page") || "1", 10);
    const tags = searchParams.get("tags")?.split(",") || [];
    setCurrentPage(isNaN(initialPage) || initialPage < 1 ? 1 : initialPage); // Ensure valid page
    setSelectedTags(tags.filter(Boolean)); // Remove empty or invalid tags
  }, [searchParams]);

  const sortedPosts = sortPosts(
    posts.filter((post) => {
      if (!post.published) return false;
      if (selectedTags.length === 0) return true;
      return selectedTags.every((tag) => post.tags?.includes(tag));
    })
  );

  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);
  const displayPosts = sortedPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage
  );

  function handlePageChange(newPage: number) {
    const validPage = Math.min(Math.max(newPage, 1), totalPages); // Ensure page bounds
    if (validPage === currentPage) return; // Prevent unnecessary updates

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", validPage.toString());
    window.history.pushState({}, "", `${pathname}?${params.toString()}`);
    setCurrentPage(validPage);
  }

  function handleTagSelection(tag: string) {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(updatedTags);

    const params = new URLSearchParams(searchParams.toString());
    if (updatedTags.length > 0) {
      params.set("tags", updatedTags.join(","));
    } else {
      params.delete("tags"); // Remove the 'tags' param if no tags are selected
    }
    params.set("page", "1"); // Reset to first page on tag change
    window.history.pushState({}, "", `${pathname}?${params.toString()}`);
    setCurrentPage(1);
  }

  const tags = Array.from(new Set(posts.flatMap((post) => post.tags || [])));

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
        </div>
      </div>
      <div className="max-w-4xl py-6 flex flex-col">
        <Card className="my-10 rounded-lg shadow">
          <CardHeader className="px-6 py-4">
            <CardTitle className="font-bold text-lg">Search By :</CardTitle>
          </CardHeader>
          <CardContent className="px-6 py-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Tag
                key={tag}
                tag={tag}
                selected={selectedTags.includes(tag)}
                onClick={() => handleTagSelection(tag)}
              >
                {tag}
              </Tag>
            ))}
          </CardContent>
        </Card>
        <div className="flex flex-col gap-4">
          <hr />
          {displayPosts?.length > 0 ? (
            <ul className="gap-4 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {displayPosts.map((post) => {
                const {
                  slug,
                  title,
                  description,
                  tags,
                  date,
                  published,
                  excludeFromMain,
                  body,
                } = post;
                return (
                  <li key={slug}>
                    <PostItemBox
                      slug={slug}
                      title={title}
                      description={description}
                      tags={tags}
                      date={date}
                      published={published}
                      excludeFromMain={excludeFromMain}
                      body={body}
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="text-2xl">
              <p>
                You may have selected <b>Two or more subjects</b>.
              </p>
              <br />
              <div className="text-muted-foreground text-lg">
                Please use the following approach:
                <ul>
                  <li>
                    <b>Single Subject</b>: You can select only one subject at a
                    time.
                  </li>
                  <li>
                    <b>Single Degree</b>: You can select only one degree at a
                    time.
                  </li>
                </ul>
              </div>
            </div>
          )}
          <QueryPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            className="justify-end mt-4"
          />
        </div>
      </div>
    </div>
  );
}

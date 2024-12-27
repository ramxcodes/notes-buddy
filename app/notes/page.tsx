"use client";

import { posts } from "#site/content";
import { PostItemBox } from "@/components/post-item-box";
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllTags, sortPosts, sortTagsByCount } from "@/lib/utils";
import { SetStateAction, useState } from "react";
import dynamic from "next/dynamic";

const QueryPagination = dynamic(
  () => import('@/components/query-pagination').then((mod) => mod.QueryPagination),
  { ssr: false }
);
const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

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
        </div>
      </div>
      <div className="max-w-4xl py-6 flex flex-col">
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
            <div className="text-2xl">
              <p>
                You May have selected <b>Two or more subjects</b>.
              </p>
              <br />
              <div className="text-muted-foreground text-lg">
                Please use the following approach :
                <ul>
                  <li>
                    <b>Single Subject</b> : You can select only one subject at a
                    time.
                  </li>
                  <li>
                    <b>Single Degree</b> : You can select only one Degree at a
                    time.
                  </li>
                </ul>
              </div>
            </div>
          )}
          <QueryPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={(page: SetStateAction<number>) =>
              setCurrentPage(page)
            }
            className="justify-end mt-4"
          />
        </div>
      </div>
    </div>
  );
}

import { posts } from "#site/content";
import { PostItemBox } from "@/components/post-item-box";
import { QueryPagination } from "@/components/query-pagination";
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllTags, sortPosts, sortTagsByCount } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My blog",
  description: "This is a description",
};

const POSTS_PER_PAGE = 5;

interface BlogPageProps {
  searchParams: {
    page?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const sortedPosts = sortPosts(posts.filter((post) => post.published));
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);

  const displayPosts = sortedPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage
  );

  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);

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
        <Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1 my-10">
          <CardHeader>
            <CardTitle>Search By :</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {sortedTags?.map((tag) => (
              <Tag tag={tag} key={tag} count={tags[tag]} />
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
            <p>Nothing to see here yet</p>
          )}
          <QueryPagination
            totalPages={totalPages}
            className="justify-end mt-4"
          />
        </div>
      </div>
    </div>
  );
}

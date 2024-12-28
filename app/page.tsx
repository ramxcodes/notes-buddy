import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn, sortPosts } from "@/lib/utils";
import { posts } from "#site/content";
import Link from "next/link";
import { PostItem } from "@/components/post-item";
import NotesShortcuts from "@/components/NotesShortcuts";
import { PostItemBox } from "@/components/post-item-box";
import { HeroSlideTextEffect } from "@/components/Home/HeroSlideTextEffect";
import { HeroShimmerTextEffect } from "@/components/Home/HeroShimmerTextEffect";

export default function Home() {
  const latestPosts = sortPosts(posts).slice(0, 5);
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:mt-10 lg:py-32">
        <div className="container flex flex-col gap-4 text-center">
          <HeroShimmerTextEffect />
          <div className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance">
            Your exams last moment{" "}
            <HeroSlideTextEffect interval={3}>
              {["Notes", "One Shots", "Quick Revision"]}
            </HeroSlideTextEffect>{" "}
            !
          </div>
          <div className="flex flex-col gap-4 justify-center sm:flex-row">
            <Link
              href="/notes"
              className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-fit")}
            >
              View Notes
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full sm:w-fit"
              )}
            >
              Visit Some page
            </Link>
          </div>
        </div>
      </section>
      <NotesShortcuts />
      <section className="container max-w-4xl py-6 flex flex-col mt-60">
        <ul className="gap-4 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map(
            (post) =>
              post.published && (
                <li key={post.slug}>
                  <PostItemBox
                    slug={post.slug}
                    title={post.title}
                    description={post.description}
                    tags={post.tags}
                  />
                </li>
              )
          )}
        </ul>
      </section>
      <section className="container max-w-4xl py-6 lg:py-10 flex flex-col space-y-6 mt-60">
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">
          Latest Notes
        </h2>
        <ul className="flex flex-col">
          {latestPosts.map(
            (post) =>
              post.published && (
                <li
                  key={post.slug}
                  className="first:border-t first:border-border"
                >
                  <PostItem
                    slug={post.slug}
                    title={post.title}
                    description={post.description}
                    date={post.date}
                    tags={post.tags}
                  />
                </li>
              )
          )}
        </ul>
      </section>
    </>
  );
}

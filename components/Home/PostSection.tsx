import { sortPosts } from "@/lib/utils";
import { posts } from "#site/content";
import NotesShortcuts from "@/components/NotesShortcuts";
import { PostItemBox } from "@/components/post-item-box";

export default function PostSection() {
  const latestPosts = sortPosts(posts).slice(0, 5);
  return (
    <>
      <section className="container max-w-4xl py-6 flex flex-col">
        <NotesShortcuts />
      </section>
    </>
  );
}

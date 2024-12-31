import { posts } from "#site/content";
import { PostItemBox } from "@/components/post-item-box";

const normalizeTag = (tag: string) => tag.toLowerCase().replace(/-/g, " ");

export default function TagPage({ params }: { params: { tag: string } }) {
  const { tag } = params;
  const decodedTag = normalizeTag(tag);

  const filteredPosts = posts.filter(
    (post) =>
      post.tags?.some((t) => normalizeTag(t) === decodedTag) &&
      post.published &&
      !post.excludeFromMain
  );

  return (
    <div className="container max-w-4xl py-6 lg:py-10 font-wotfard">
      <h1 className="text-[2.3rem] lg:text-[4.5rem] md:text-[4rem] leading-[1] font-bold dark:bg-gradient-to-b dark:from-[rgba(244,244,255,1)] dark:to-[rgba(181,180,207,1)] dark:text-transparent dark:bg-clip-text py-2 text-center">
        Notes of {decodedTag}
      </h1>
      {filteredPosts.length > 0 ? (
        <ul className="gap-4 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => {
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
        <p>No posts found for this tag.</p>
      )}
    </div>
  );
}

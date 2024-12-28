import { posts } from "#site/content";
import { PostItemBox } from "@/components/post-item-box";

export default function TagPage({ params }: { params: { tag: string } }) {
  const { tag } = params;
  const decodedTag = tag.replace(/-/g, " "); // Replace hyphens with spaces

  const filteredPosts = posts.filter(
    (post) =>
      post.tags?.includes(decodedTag) && post.published && !post.excludeFromMain
  );

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <h1 className="font-black text-4xl lg:text-5xl mb-4">
        Notes of : {decodedTag}
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

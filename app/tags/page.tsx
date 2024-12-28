import { posts } from "#site/content";
import Link from "next/link";

const normalizeTag = (tag: string) => tag.toLowerCase().replace(/\s+/g, "-");

export default function TagsPage() {
  const allTags = posts.reduce((acc, post) => {
    if (post.tags) {
      post.tags.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <h1 className="font-black text-4xl lg:text-5xl mb-4">All Tags</h1>
      <ul className="flex flex-wrap gap-2">
        {Object.entries(allTags).map(([tag, count]) => {
          const normalizedTag = normalizeTag(tag);
          return (
            <li key={normalizedTag}>
              <Link href={`/tags/${normalizedTag}`}>
                <span className="inline-block px-3 py-1 text-sm rounded-lg cursor-pointer">
                  {tag} ({count})
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

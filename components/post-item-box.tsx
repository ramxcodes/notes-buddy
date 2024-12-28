import Link from "next/link";
import { Tag } from "./tag";

interface PostItemProps {
  slug: string;
  title: string;
  description?: string;
  tags?: Array<string>;
}

export function PostItemBox({ slug, title, description, tags }: PostItemProps) {
  return (
    <article className="py-6 border border-border rounded-xl">
      <div className="max-w-full md:w-[400px] h-[350px] rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col">
        <div className="p-6 flex-grow">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            <Link href={"/" + slug} className="hover:underline">
              {title}
            </Link>
          </h2>
          <div className="text-sm text-gray-600 mt-2 mb-4 line-clamp-2">
            <p>{description}</p>
          </div>
          {tags && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <Link key={tag} href={`/tags/${tag}`} passHref>
                  <Tag tag={tag} />
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="px-6 py-4 flex justify-between items-center">
          <Link
            href={"/" + slug}
            className="inline-block bg-[#E2E2E2] text-black text-sm px-4 py-2 rounded-md transition-colors"
          >
            Read Notes →
          </Link>
        </div>
      </div>
    </article>
  );
}

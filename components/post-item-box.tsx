import Link from "next/link";
import { Tag } from "./tag";
import { Badge } from "@/components/ui/badge";

interface PostItemProps {
  slug: string;
  title: string;
  description?: string;
  tags?: string[];
  premium?: boolean;
}

const normalizeTag = (tag: string) => tag.toLowerCase().replace(/\s+/g, "-");

export function PostItemBox({ slug, title, description, tags, premium }: PostItemProps) {
  return (
    <article className="dark:border dark:border-border rounded-xl">
      <div className="max-w-full md:w-[400px] rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col h-full">
        <div className="p-6 flex-grow flex flex-col">
          {premium && (
            <div className="mb-2">
              <Badge className="font-gilroy text-yellow-500" variant="outline">Premium</Badge>
            </div>
          )}
          <h2 className="text-xl md:text-2xl font-semibold mb-2">
            <Link href={`/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h2>
          <div className="text-sm text-gray-600 mt-2 mb-4 flex-grow line-clamp-2">
            <p>{description}</p>
          </div>
          {tags && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <span key={tag}>
                  <Tag tag={tag} />
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="px-6 py-4 flex justify-between items-center">
          <Link
            href={`/${slug}`}
            className="inline-block bg-[#E2E2E2] text-black text-sm px-4 py-2 rounded-md transition-colors"
          >
            Read Notes →
          </Link>
        </div>
      </div>
    </article>
  );
}

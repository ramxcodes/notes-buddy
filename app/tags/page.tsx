import Link from "next/link";

interface TagProps {
  tag: string;
  selected?: boolean;
}

export function Tag({ tag }: TagProps) {
  return (
    <Link href={`/tags/${tag}`}>
      <span
        className={`inline-block px-3 py-1 text-sm rounded-lg cursor-pointer`}
      >
        {tag}
      </span>
    </Link>
  );
}

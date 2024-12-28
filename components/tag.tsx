import Link from "next/link";
import { badgeVariants } from "./ui/badge";

interface TagProps {
  tag: string;
  current?: boolean;
  count?: number;
  onClick?: () => void;
  selected?: boolean;
}

const normalizeTag = (tag: string) => tag.toLowerCase().replace(/\s+/g, "-");

export function Tag({ tag, count, onClick, selected }: TagProps) {
  const formattedTag = normalizeTag(tag);

  return (
    <Link href={`/tags/${formattedTag}`}>
      <button
        className={badgeVariants({
          variant: selected ? "default" : "secondary",
          className: "no-underline rounded-md px-2 py-1",
        })}
        onClick={onClick}
      >
        {tag} {count ? `(${count})` : null}
      </button>
    </Link>
  );
}

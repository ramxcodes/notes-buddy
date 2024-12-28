import Link from "next/link";
import { badgeVariants } from "./ui/badge";

interface TagProps {
  tag: string;
  current?: boolean;
  count?: number;
  onClick?: () => void;
  selected?: boolean;
}

export function Tag({ tag, count, onClick, selected }: TagProps) {
  const formattedTag = tag.replace(/\s+/g, "-"); // Replace spaces with hyphens

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

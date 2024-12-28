import Link from "next/link";
import { slug } from "github-slugger";
import { badgeVariants } from "./ui/badge";

interface TagProps {
  tag: string;
  current?: boolean;
  count?: number;
  selected?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export function Tag({ tag, count, onClick, selected }: TagProps) {
  return (
    <div onClick={(e) => {
      e.preventDefault();
      onClick(); // Trigger the parent-defined tag click handler
    }}>
      <Link
        href={`/blog/tags/${slug(tag)}`}
        className={badgeVariants({
          variant: selected ? "default" : "secondary",
          className: "no-underline rounded-md px-2 py-1 cursor-pointer",
        })}
      >
        {tag} {count ? `(${count})` : null}
      </Link>
    </div>
  );
}

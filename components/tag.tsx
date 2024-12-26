import Link from "next/link";
import { slug } from "github-slugger";
import { badgeVariants } from "./ui/badge";

interface TagProps {
  tag: string;
  current?: boolean;
  count?: number;
  onClick?: () => void;
  selected?: boolean;
}

export function Tag({ tag, current, count, onClick, selected }: TagProps) {
  return (
    <button
      className={badgeVariants({
        variant: selected ? "default" : "secondary",
        className: "no-underline rounded-md px-2 py-1",
      })}
      onClick={onClick}
    >
      {tag} {count ? `(${count})` : null}
    </button>
  );
}

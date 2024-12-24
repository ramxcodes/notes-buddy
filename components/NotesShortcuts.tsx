import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

export default function NotesShortcuts() {
  const links = [
    { href: "/notes", label: "View All Notes" },
    { href: "/tags/1st-year", label: "First Year Notes" },
    { href: "/tags/2nd-year", label: "Second Year Notes" },
    { href: "/tags/3rd-year", label: "Third Year Notes" },
    { href: "/tags/4th-year", label: "Fourth Year Notes" },
  ];

  return (
    <section className="container max-w-4xl py-6 lg:py-10 flex flex-col space-y-6 mt-60">
      <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">
        Go to your favorite notes
      </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {links.map((link) => (
        <Link
        key={link.href}
        href={link.href}
        className={cn(buttonVariants({ size: "lg" }), "w-full")}
        >
        {link.label}
        </Link>
      ))}
    </div>
    </section>
  );
}

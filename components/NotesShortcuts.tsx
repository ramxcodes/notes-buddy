import React from "react";
import Link from "next/link";
import BlurFade from "./ui/blur-fade";

export default function NotesShortcuts() {
  const links = [
    { href: "/notes", label: "View All Notes" },
    { href: "/tags/1st-year", label: "First Year Notes" },
    { href: "/tags/2nd-year", label: "Second Year Notes" },
    { href: "/tags/3rd-year", label: "Third Year Notes" },
    { href: "/tags/4th-year", label: "Fourth Year Notes" },
    { href: "/tags/1st-semester", label: "First Sem notes" },
    { href: "/tags/2nd-semester", label: "Second Sem notes" },
    { href: "/tags/3rd-semester", label: "Third Sem notes" },
    { href: "/tags/4th-semester", label: "Fourth Sem notes" },
    { href: "/tags/5th-semester", label: "Fifth Sem notes" },
    { href: "/tags/6th-semester", label: "Sixth Sem notes" },
    { href: "/tags/7th-semester", label: "Seventh Sem notes" },
    { href: "/tags/8th-semester", label: "Eighth Sem notes" },
  ];

  const getRandomColor = () => {
    const colors = [
      "bg-red-400",
      "bg-blue-400",
      "bg-green-400",
      "bg-yellow-400",
      "bg-purple-400",
      "bg-pink-400",
      "bg-teal-400",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <section className="container max-w-4xl py-6 lg:py-10 flex flex-col space-y-6 mt-60">
      <BlurFade delay={0.5} inView>
        <h1 className="text-[2.3rem] md:text-[3.3rem] lg:text-[4.5rem] leading-[1] font-bold dark:bg-gradient-to-b dark:from-[rgba(244,244,255,1)] dark:to-[rgba(181,180,207,1)] dark:text-transparent dark:bg-clip-text py-2 text-center pt-20 md:pt-10">
          Study Smarter, Pick Your Notes!
        </h1>
      </BlurFade>
      <BlurFade delay={1} inView>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {links.map((link) => (
            <div
              key={link.href}
              className={`group relative cursor-pointer p-2 w-full border rounded-full overflow-hidden text-black text-center font-semibold ${getRandomColor()}`}
            >
              <span className="translate-y-0 group-hover:-translate-y-12 group-hover:opacity-0 transition-all duration-300 inline-block">
                {link.label}
              </span>
              <Link
                href={link.href}
                className="absolute left-0 top-0 h-full w-full"
              >
                <div className="flex gap-2 text-white items-center absolute left-0 top-0 h-full w-full justify-center translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 rounded-full group-hover:rounded-none">
                  <span>{link.label}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </BlurFade>
    </section>
  );
}

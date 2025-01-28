/* eslint-disable @next/next/no-img-element */

"use client";

import { siteConfig } from "@/config/site";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function MainNav() {
  const notes: { title: string; href: string; description?: string }[] = [
    {
      title: "View All Notes",
      href: "/notes",
      description: "Click here to view all notes.",
    },
    {
      title: "B.Tech First Year Notes",
      href: "/tags/1st-Year",
      description: "Click here to view notes for the first Year.",
    },
    {
      title: "B.Tech Second Year Notes",
      href: "/tags/2nd-Year",
      description: "Click here to view notes for the second Year.",
    },
    {
      title: "B.Tech Third Year Notes",
      href: "/tags/3rd-Year",
      description: "Click here to view notes for the third Year.",
    },
    {
      title: "B.Tech Fourth Year Notes",
      href: "/tags/4th-Year",
      description: "Click here to view notes for the fourth Year.",
    },
  ];
  const others: { title: string; href: string; description?: string }[] = [
    {
      title: "Online Compilers",
      href: "/compiler",
      description: "Feature rich online compiler for C, C++, Java, JavaScript, Python",
    },
    {
      title: "Request Notes",
      href: "/request-notes",
      description: "Didn't find your notes? Request now",
    },
  ];

  const pathname = usePathname();
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <img src="/logo.png" alt="logo" className="size-6" />
        <span className="font-bold">{siteConfig.name}</span>
      </Link>
      <Link
        href="/contributors"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathname === "/about" ? "text-foreground" : "text-foreground/60"
        )}
      >
        Top Contributors
      </Link>
      <NavigationMenu className="bg-transparent hidden md:block">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Notes</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {notes.map((note) => (
                  <li key={note.title} className="hover:text-gray-900">
                    <Link
                      href={note.href}
                      className="block p-3 hover:bg-gray-100 rounded-md"
                    >
                      <div className="font-medium">{note.title}</div>
                      <p className="text-sm text-gray-500">
                        {note.description}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Link
        href="/about"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathname === "/about" ? "text-foreground" : "text-foreground/60"
        )}
      >
        About us
      </Link>
      <NavigationMenu className="bg-transparent hidden md:block">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Others</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {others.map((other) => (
                  <li key={other.title} className="hover:text-gray-900">
                    <Link
                      href={other.href}
                      className="block p-3 hover:bg-gray-100 rounded-md"
                    >
                      <div className="font-medium">{other.title}</div>
                      <p className="text-sm text-gray-500">
                        {other.description}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}

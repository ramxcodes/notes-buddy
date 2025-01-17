import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Icons } from "./icons";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { ModeToggle } from "./mode-toggle";

export function SiteHeader() {
  return (
    <header className="z-50 fixed top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-center lg:justify-end space-x-2">
          <nav className="flex w-fit items-center">
            <Link
              href="https://chat.whatsapp.com/EcretA1N7eCFQeHecm1uWO"
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-10 px-0 hidden sm:inline-flex group transition-all duration-200 ease-in"
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:text-green-600  transition-all duration-200 ease-in"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                  <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
                </svg>
                <span className="sr-only">Join Whatsapp community</span>
              </div>
            </Link>
            <div className="mr-2 md:mr-0">
              <ModeToggle />
            </div>
            <MobileNav />
          </nav>
        </div>
      </div>
    </header>
  );
}

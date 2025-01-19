/* eslint-disable @next/next/no-img-element */

"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { Icons } from "./icons";
import { siteConfig } from "@/config/site";
import { UserProfile } from "./UserProfile";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false); // State for Notes dropdown

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-10 px-0 sm:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <MobileLink
          onOpenChange={setOpen}
          href="/"
          className="flex items-center justify-center"
        >
          <img src="/logo.png" alt="notes buddy logo" className="size-6" />
          <span className="font-bold font-wotfard">{siteConfig.name}</span>
        </MobileLink>
        <div className="flex flex-col gap-3 mt-3 font-wotfard">
          <hr />
          <button
            className="flex justify-between items-center text-left"
            onClick={() => setNotesOpen(!notesOpen)}
          >
            Notes
            <span>{notesOpen ? "-" : "+"}</span>
          </button>
          {notesOpen && (
            <ul className="ml-4 flex flex-col gap-2">
              {siteConfig.notes.map((note: { title: string; href: string }) => (
                <MobileLink
                  key={note.title}
                  href={note.href}
                  onOpenChange={setOpen}
                >
                  {note.title}
                </MobileLink>
              ))}
            </ul>
          )}
          <MobileLink onOpenChange={setOpen} href="/about">
            About us
          </MobileLink>
          <MobileLink onOpenChange={setOpen} href="/contributors">
            Top Contributors
          </MobileLink>
          <Link
            target="_blank"
            rel="noreferrer"
            href="https://chat.whatsapp.com/EcretA1N7eCFQeHecm1uWO"
          >
            Join Whatsapp community
          </Link>
        </div>
        <div className="mt-10">
          <hr className="mb-10" />
          <UserProfile />
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  children,
  className,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}

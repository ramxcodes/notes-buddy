"use client";

import BlurFade from "@/components/ui/blur-fade";

interface HeaderProps {
  isAuthenticated: boolean;
  userName: string | null;
}

export function Header({ isAuthenticated, userName }: HeaderProps) {
  return (
    <div>
      <BlurFade delay={0.2} inView>
        <h1 className="text-[2.3rem] lg:text-[4.5rem] md:text-[4rem] leading-[1] font-bold dark:bg-gradient-to-b dark:from-[rgba(244,244,255,1)] dark:to-[rgba(181,180,207,1)] dark:text-transparent dark:bg-clip-text py-2 text-center">
          Buy Notes Buddy Premium
        </h1>
      </BlurFade>
      <BlurFade delay={0.5} inView>
        {isAuthenticated ? (
          <p className="text-center text-2xl">
            Hello, {userName}!<br />
            Good to see you here ✨
          </p>
        ) : (
          <p className="text-center text-red-500 text-lg">
            Please log in to continue.
          </p>
        )}
      </BlurFade>
    </div>
  );
}

"use client";

import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/utils/cn";

export const ModeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    if (!theme) {
      setTheme("system");
    }
  }, [theme, setTheme]);

  const handleToggle = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  return (
    <button
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md border border-neutral-500/10 bg-white px-2 py-1 font-medium text-neutral-600 tracking-tight hover:bg-neutral-100 dark:bg-[#01050F] dark:text-neutral-300 dark:hover:bg-neutral-700"
      onClick={handleToggle}
      type="button"
    >
      <span
        className={cn(
          "relative size-6 scale-75 rounded-full bg-gradient-to-tr"
        )}
      >
        <span
          className={cn(
            "absolute top-0 left-0 z-10 h-full w-full transform-gpu rounded-full bg-gradient-to-tr from-indigo-400 to-sky-200 transition-transform duration-500 ease-in-out",
            resolvedTheme === "dark" ? "scale-100" : "scale-90"
          )}
        />
        <span
          className={cn(
            "absolute top-0 left-0 z-10 h-full w-full transform-gpu rounded-full bg-gradient-to-tr from-rose-400 to-amber-300 transition-transform duration-500 ease-in-out dark:from-rose-600 dark:to-amber-600",
            resolvedTheme === "light" ? "opacity-100" : "opacity-0"
          )}
        />
        <span
          className={cn(
            "absolute top-0 right-0 z-20 size-4 origin-top-right transform-gpu rounded-full bg-white transition-transform duration-500 ease-in-out group-hover:bg-neutral-100 dark:bg-neutral-800 group-hover:dark:bg-neutral-700",
            resolvedTheme === "dark" ? "scale-100" : "scale-0"
          )}
        />
      </span>
      <span className="relative h-6 w-12">
        <span
          className={cn(
            "absolute top-0 left-0 transition-all duration-1000 ease-in-out",
            resolvedTheme === "light"
              ? "-translate-y-4 opacity-0 blur-lg"
              : "translate-y-0 opacity-100 blur-0"
          )}
        >
          Dark
        </span>
        <span
          className={cn(
            "absolute top-0 left-0 transition-all duration-1000 ease-in-out",
            resolvedTheme === "dark"
              ? "translate-y-4 opacity-0 blur-lg"
              : "translate-y-0 opacity-100 blur-0"
          )}
        >
          Light
        </span>
      </span>
    </button>
  );
};

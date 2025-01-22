/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const useHeadingTracker = (storageKey: string) => {
  const pathname = usePathname();

  const assignHeadingIds = () => {
    const headings = Array.from(document.querySelectorAll("h2"));
    headings.forEach((heading, index) => {
      if (!heading.id) {
        heading.id = `heading-${index}`;
      }
    });
  };

  const saveLastHeading = () => {
    const headings = Array.from(document.querySelectorAll("h2"));
    let closestHeading: HTMLElement | null = null as HTMLElement | null;
    let closestOffset = Number.MAX_VALUE;

    headings.forEach((heading) => {
      const offset = Math.abs(
        (heading as HTMLElement).getBoundingClientRect().top - 0
      );
      if (offset < closestOffset) {
        closestOffset = offset;
        closestHeading = heading as HTMLElement;
      }
    });

    if (closestHeading && closestHeading.id) {
      localStorage.setItem(storageKey, closestHeading.id);
    }
  };

  const restoreLastHeading = () => {
    setTimeout(() => {
      const lastHeadingId = localStorage.getItem(storageKey);
      if (lastHeadingId) {
        const heading = document.getElementById(lastHeadingId);
        if (heading) {
          heading.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          console.warn("Heading not found in the DOM:", lastHeadingId);
        }
      }
    }, 100);
  };

  useEffect(() => {
    assignHeadingIds();
    restoreLastHeading();

    window.addEventListener("scroll", saveLastHeading);
    return () => {
      window.removeEventListener("scroll", saveLastHeading);
    };
  }, [pathname, storageKey]);
};

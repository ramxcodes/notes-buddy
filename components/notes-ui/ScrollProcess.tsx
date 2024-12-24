"use client";

import useScrollProgress from "@/hooks/useScrollProgress";
import { ChevronsUp } from "lucide-react";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";

const ScrollProgress = () => {
  const { scrollProgress } = useScrollProgress();
  const showNavigateToTop = scrollProgress > 10;
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      <Progress
        value={scrollProgress}
        className="w-full h-1 z-50 fixed top-0"
      />
      {showNavigateToTop && (
        <div className="fixed bottom-14 right-10" title="Scroll to Top">
          <Button variant="outline" size="icon" className="cursor-auto">
            <ChevronsUp className="transition-all" onClick={scrollToTop} />
            <span className="sr-only">Scroll to top</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ScrollProgress;

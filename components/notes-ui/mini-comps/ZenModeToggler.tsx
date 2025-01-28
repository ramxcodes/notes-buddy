"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";

export function ZenModeToggler() {
  const [isZen, setIsZen] = useState(false);

  const toggleZenMode = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsZen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsZen(false);
    }
  }, []);

  return (
    <Button
      variant="outline"
      className="hover:bg-gray-300 dark:hover:bg-gray-700 w-full my-2"
      onClick={toggleZenMode}
    >
      {isZen ? "Exit Zen Mode" : "Enter Zen Mode"}
    </Button>
  );
}

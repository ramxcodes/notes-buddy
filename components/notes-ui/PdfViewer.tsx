import React, { useEffect, useState, useRef } from "react";
import { createIntersectionObserver } from "@/utils/intersectionObserver";
import { Skeleton } from "@/components/ui/skeleton";

interface PdfViewerProps {
  filePath: string;
}

export const PdfViewer: React.FC<PdfViewerProps> = ({ filePath }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = createIntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = containerRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[70vh] md:h-[90vh]">
      {isVisible ? (
        <iframe
          src={`${filePath}#toolbar=0&navpanes=0`}
          width="100%"
          height="100%"
          style={{ border: "none" }}
          title="PDF Viewer"
          loading="lazy"
        />
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <Skeleton className="w-full h-full" />
        </div>
      )}
    </div>
  );
};

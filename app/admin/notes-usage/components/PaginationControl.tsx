"use client";

import { Button } from "@/components/ui/button";

interface PaginationControlProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

export function PaginationControl({
  currentPage,
  setCurrentPage,
  totalPages,
}: PaginationControlProps) {
  return (
    <div className="flex justify-center items-center mt-6 gap-4">
      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Previous
      </Button>
      <span className="text-sm">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="outline"
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
}

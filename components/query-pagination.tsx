"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "./ui/pagination";

interface QueryPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function QueryPagination({
  totalPages,
  currentPage,
  onPageChange,
  className,
}: QueryPaginationProps) {
  const pathname = usePathname(); // Get current pathname
  const searchParams = useSearchParams(); // Get query params

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber === currentPage || pageNumber < 1 || pageNumber > totalPages) {
      return; // Prevent invalid or redundant page changes
    }

    onPageChange(pageNumber); // Notify parent component
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    window.history.pushState({}, "", `${pathname}?${params.toString()}`); // Update URL without reload
  };

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <Pagination className={`flex items-center space-x-2 ${className}`}>
      <PaginationContent>
        {prevPage >= 1 && (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(prevPage);
              }}
            >
              Previous
            </PaginationPrevious>
          </PaginationItem>
        )}

        {Array.from({ length: totalPages }, (_, index) => {
          const pageIndex = index + 1;
          return (
            <PaginationItem
              className={`hidden sm:inline-block rounded px-4 py-2 cursor-pointer ${
                currentPage === pageIndex ? "active" : ""
              }`}
              key={`page-button-${pageIndex}`}
            >
              <PaginationLink
                isActive={currentPage === pageIndex}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(pageIndex);
                }}
              >
                {pageIndex}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {nextPage <= totalPages && (
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(nextPage);
              }}
            >
              Next
            </PaginationNext>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

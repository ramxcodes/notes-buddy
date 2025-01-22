"use client";

import { useSearchParams, useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
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
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateSearchParams = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    router.push(`?${params.toString()}`);
    onPageChange(pageNumber);
  };

  const generatePaginationItems = () => {
    const items = [];

    if (window.innerWidth > 640) {
      // Show detailed pagination for larger screens
      if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
          items.push(
            <PaginationItem key={`page-${i}`}>
              <PaginationLink
                isActive={currentPage === i}
                onClick={() => updateSearchParams(i)}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
      } else {
        items.push(
          <PaginationItem key="page-1">
            <PaginationLink
              isActive={currentPage === 1}
              onClick={() => updateSearchParams(1)}
            >
              1
            </PaginationLink>
          </PaginationItem>
        );

        if (currentPage > 3) {
          if (currentPage > 4) {
            items.push(<span key="ellipsis-start">...</span>);
          }
        }

        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages - 1, currentPage + 1);

        for (let i = startPage; i <= endPage; i++) {
          items.push(
            <PaginationItem key={`page-${i}`}>
              <PaginationLink
                isActive={currentPage === i}
                onClick={() => updateSearchParams(i)}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }

        if (currentPage < totalPages - 2) {
          if (currentPage < totalPages - 3) {
            items.push(<span key="ellipsis-end">...</span>);
          }
          items.push(
            <PaginationItem key={`page-${totalPages}`}>
              <PaginationLink
                isActive={currentPage === totalPages}
                onClick={() => updateSearchParams(totalPages)}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          );
        }
      }
    }

    return items;
  };

  return (
    <Pagination className={className}>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() => updateSearchParams(currentPage - 1)}
            />
          </PaginationItem>
        )}

        {window.innerWidth > 640 && generatePaginationItems()}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext
              onClick={() => updateSearchParams(currentPage + 1)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

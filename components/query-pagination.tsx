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

  return (
    <Pagination className={className}>
      <PaginationContent>
        {currentPage > 1 ? (
          <PaginationItem>
            <PaginationPrevious
              onClick={() => updateSearchParams(currentPage - 1)}
            />
          </PaginationItem>
        ) : null}

        {Array(totalPages)
          .fill("")
          .map((_, index) => (
            <PaginationItem
              className="hidden sm:inline-block"
              key={`page-button-${index}`}
            >
              <PaginationLink
                isActive={currentPage === index + 1}
                onClick={() => updateSearchParams(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

        {currentPage < totalPages ? (
          <PaginationItem>
            <PaginationNext
              onClick={() => updateSearchParams(currentPage + 1)}
            />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
}

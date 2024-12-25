"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "../ui/pagination";

interface UnitPaginationProps {
  currentUnit: number;
  totalUnits: number;
  slug: string;
}

export function UnitPagination({
  currentUnit,
  totalUnits,
  slug,
}: UnitPaginationProps) {
  const prevUnit = currentUnit - 1;
  const nextUnit = currentUnit + 1;

  const createUnitSlug = (unit: number) =>
    slug.replace(/-Unit-\d+-/, `-Unit-${unit}-`);

  return (
    <Pagination>
      <PaginationContent>
        {prevUnit >= 1 ? (
          <PaginationItem>
            <PaginationPrevious href={createUnitSlug(prevUnit)} />
          </PaginationItem>
        ) : null}

        {Array.from({ length: totalUnits }, (_, index) => {
          const unitNumber = index + 1;
          return (
            <PaginationItem
              className="hidden sm:inline-block"
              key={`unit-button-${unitNumber}`}
            >
              <PaginationLink
                isActive={currentUnit === unitNumber}
                href={createUnitSlug(unitNumber)}
              >
                {unitNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {nextUnit <= totalUnits ? (
          <PaginationItem>
            <PaginationNext href={createUnitSlug(nextUnit)} />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
}

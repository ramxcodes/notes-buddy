// pagination-config.ts

// List of slugs where UnitPagination should be disabled
export const disabledPaginationSlugs = [
  "github/contribution-guide", // No "notes/" prefix here
];

export const isPaginationDisabled = (slug: string): boolean => {
  const normalizedSlug = slug.replace(/^notes\//, "");
  return disabledPaginationSlugs.includes(normalizedSlug);
};

export const disabledPaginationSlugs = ["github/contribution-guide"];

export const isPaginationDisabled = (slug: string): boolean => {
  const normalizedSlug = slug.replace(/^notes\//, "");
  const disableKeywords = ["one-shot", "quiz", "pdf"];

  const containsDisableKeyword = disableKeywords.some((keyword) =>
    normalizedSlug.includes(keyword)
  );

  return (
    disabledPaginationSlugs.includes(normalizedSlug) || containsDisableKeyword
  );
};

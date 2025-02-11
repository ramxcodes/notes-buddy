export const disabledPaginationSlugs = ["github/contribution-guide"];

export const isPaginationDisabled = (slug: string): boolean => {
  const normalizedSlug = slug.replace(/^notes\//, "");
  const disableKeywords = ["one-shot", "quiz", "book", "flashcards", "MST-1", "MST-2", "pyq", "toppers-handwritten-notes", "video-material"];

  const containsDisableKeyword = disableKeywords.some((keyword) =>
    normalizedSlug.includes(keyword)
  );

  return (
    disabledPaginationSlugs.includes(normalizedSlug) || containsDisableKeyword
  );
};

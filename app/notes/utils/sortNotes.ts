export interface Post {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  metadata?: {
    university?: string;
    degree?: string;
    semester?: string;
    subject?: string;
    contentType?: string;
    premium?: boolean;
  };
  published: boolean;
  excludeFromMain: boolean;
}

const premiumOrder: string[] = [
  "quiz",
  "flashcards",
  "one shot",
  "Video Material",
  "Toppers handwritten notes",
  "pyq",
  "mst",
];

export function getPremiumOrderIndex(contentType: string): number {
  const normalized = contentType.toLowerCase().trim();
  for (let i = 0; i < premiumOrder.length; i++) {
    if (normalized.includes(premiumOrder[i])) {
      return i;
    }
  }
  return premiumOrder.length;
}

export function extractUnitNumber(title: string): number {
  const match = title.match(/unit\s*(\d+)/i);
  if (match && match[1]) {
    return parseInt(match[1], 10);
  }
  return 1;
}

export function comparePosts(a: Post, b: Post): number {
  const unitA = extractUnitNumber(a.title);
  const unitB = extractUnitNumber(b.title);
  if (unitA !== unitB) {
    return unitA - unitB;
  }

  const isSubjectA =
    !a.metadata?.premium &&
    (!a.metadata?.contentType ||
      a.metadata?.contentType.toLowerCase() === "notes");
  const isSubjectB =
    !b.metadata?.premium &&
    (!b.metadata?.contentType ||
      b.metadata?.contentType.toLowerCase() === "notes");

  if (isSubjectA !== isSubjectB) {
    return isSubjectA ? -1 : 1;
  }

  if (a.metadata?.premium && b.metadata?.premium) {
    const typeA = a.metadata?.contentType || "";
    const typeB = b.metadata?.contentType || "";
    const orderA = getPremiumOrderIndex(typeA);
    const orderB = getPremiumOrderIndex(typeB);
    if (orderA !== orderB) {
      return orderA - orderB;
    }
  }

  return a.title.localeCompare(b.title);
}

export function sortNotes(posts: Post[]): Post[] {
  return [...posts].sort(comparePosts);
}

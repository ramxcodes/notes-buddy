import { Tier } from "./access/types";

export const tierAccess: Record<Tier, string[]> = {
  "Tier 1": ["one-shots", "quiz"],
  "Tier 2": ["one-shots", "quiz", "pyq", "flashcards", "IMP"],
  "Tier 3": [
    "one-shots",
    "quiz",
    "pyq",
    "flashcards",
    "IMP",
    "video-material",
    "toppers-handwritten-notes",
    "ai-chatbot",
  ],
};

export function hasAccess(userTier: string, requiredTier: string): boolean {
  const tiers = Object.keys(tierAccess);

  if (!tiers.includes(userTier) || !tiers.includes(requiredTier)) {
    return false;
  }

  const userTierIndex = tiers.indexOf(userTier);
  const requiredTierIndex = tiers.indexOf(requiredTier);

  return userTierIndex >= requiredTierIndex;
}

export interface NoteUsageEntry {
  email: string;
  planTier: string;
  isBlocked: boolean;
  viewedAt: string;
  ip: string;
}

export interface NoteUsageItem {
  noteSlug: string;
  totalViews: number;
  lastViewed: string;
  noteLink: string;
  userEntries: NoteUsageEntry[];
}

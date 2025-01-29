export interface UserEntry {
    name: ReactNode;
    email: string | null;
    planTier?: string;
    isBlocked?: boolean;
    viewedAt: string; // ISO string
    ip?: string;
  }
  
  export interface NoteUsageItem {
    noteSlug: string;
    totalViews: number;
    lastViewed?: string;
    userEntries: UserEntry[];
    anonymousCount: number;
    verifiedCount: number;
    premiumCount: number;
    freeCount: number;
    university: string;
    degree: string;
    year: string;
    semester: string;
    subject: string;
    unit: string;
    noteLink: string;
  }
  
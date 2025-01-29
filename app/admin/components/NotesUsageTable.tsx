"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface UserEntry {
  email: string | null;
  planTier?: string;
  isBlocked?: boolean;
  viewedAt: string;
  ip?: string;
}

interface NoteUsageItem {
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

interface NotesUsageTableProps {
  usageData: NoteUsageItem[];
}

export function NotesUsageTable({ usageData }: NotesUsageTableProps) {
  const [selectedUserList, setSelectedUserList] = useState<UserEntry[] | null>(null);

  const handleOpenUsers = (users: UserEntry[]) => {
    setSelectedUserList(users);
  };

  const handleCloseUsers = () => {
    setSelectedUserList(null);
  };

  return (
    <>
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>University</TableHead>
            <TableHead>Degree</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Semester</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Anon/Ver/Prem</TableHead>
            <TableHead>Last Viewed</TableHead>
            <TableHead>Note Link</TableHead>
            <TableHead>Users</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usageData.map((entry, index) => {
            const timeAgo = entry.lastViewed
              ? formatDistanceToNow(new Date(entry.lastViewed)) + " ago"
              : "N/A";

            return (
              <TableRow key={entry.noteSlug}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{entry.university}</TableCell>
                <TableCell>{entry.degree}</TableCell>
                <TableCell>{entry.year}</TableCell>
                <TableCell>{entry.semester}</TableCell>
                <TableCell>{entry.subject}</TableCell>
                <TableCell>{entry.unit}</TableCell>
                <TableCell>
                  <Badge>{entry.totalViews}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs">
                      Anonymous: {entry.anonymousCount}
                    </span>
                    <span className="text-xs">
                      Verified: {entry.verifiedCount}
                    </span>
                    <span className="text-xs">
                      Premium: {entry.premiumCount}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{timeAgo}</TableCell>
                <TableCell>
                  <a
                    href={entry.noteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-600 hover:text-blue-800"
                  >
                    View
                  </a>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenUsers(entry.userEntries)}
                  >
                    View Users
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Dialog with the list of user views */}
      <Dialog open={!!selectedUserList} onOpenChange={handleCloseUsers}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Note Viewers</DialogTitle>
          </DialogHeader>
          {selectedUserList?.length === 0 && (
            <p className="text-sm">No logged-in users viewed this note.</p>
          )}
          {selectedUserList?.length !== 0 && (
            <div className="space-y-2 mt-2 max-h-[400px] overflow-auto">
              {selectedUserList?.map((user, idx) => {
                const viewAgo = formatDistanceToNow(new Date(user.viewedAt)) + " ago";
                return (
                  <div
                    key={idx}
                    className="border-b pb-2 mb-2 last:border-none last:pb-0 last:mb-0"
                  >
                    <p className="text-sm">
                      <strong>Name:</strong>{" "}
                      {user.email ? user.email : <em>Anonymous</em>}
                    </p>
                    <p className="text-sm">
                      <strong>Plan:</strong>{" "}
                      {user.email ? user.planTier || "Free" : "—"}
                    </p>
                    <p className="text-sm">
                      <strong>Viewed:</strong> {viewAgo}
                    </p>
                    {user.ip && (
                      <p className="text-sm">
                        <strong>IP:</strong> {user.ip}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

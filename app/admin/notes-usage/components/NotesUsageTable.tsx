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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { NoteUsageItem, UserEntry } from "./types";

interface NotesUsageTableProps {
  usageData: NoteUsageItem[];
}

export function NotesUsageTable({ usageData }: NotesUsageTableProps) {
  const [selectedUserList, setSelectedUserList] = useState<UserEntry[] | null>(
    null
  );

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
                  <div className="flex flex-col gap-1 text-xs">
                    <span>Anonymous: {entry.anonymousCount}</span>
                    <span>Verified: {entry.verifiedCount}</span>
                    <span>Premium: {entry.premiumCount}</span>
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
                const viewAgo =
                  formatDistanceToNow(new Date(user.viewedAt)) + " ago";
                const isAnonymous = !user.email; // if email is null -> anonymous

                return (
                  <div
                    key={idx}
                    className="border-b pb-2 mb-2 last:border-none last:pb-0 last:mb-0"
                  >
                    {isAnonymous ? (
                      // Anonymous user
                      <>
                        <p className="text-sm">
                          <strong>Name:</strong> Anonymous
                        </p>
                      </>
                    ) : (
                      // Logged-in user
                      <>
                        <p className="text-sm">
                          <strong>Email:</strong> {user.email}
                        </p>
                        {/* Only show plan if it exists */}
                        {user.planTier && (
                          <p className="text-sm">
                            <strong>Plan:</strong> {user.planTier}
                          </p>
                        )}
                      </>
                    )}

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

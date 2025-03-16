"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NoteUsageItem } from "./types";

interface NotesUsageTableProps {
  usageData: NoteUsageItem[];
}

export function NotesUsageTable({ usageData }: NotesUsageTableProps) {
  return (
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
                  className="underline hover:underline"
                >
                  View
                </a>
              </TableCell>
              <TableCell>
                <Link href={`/admin/notes-usage/view-users?noteSlug=${encodeURIComponent(entry.noteSlug)}`}>
                  <Button variant="outline" size="sm">
                    View Users
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

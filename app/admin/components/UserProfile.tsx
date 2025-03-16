"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import UserCard, { IUser } from "./UserCard";
import NoteChart from "./NoteChart";
import PaginationControl from "./PaginationControl";
import DailyViewsChart from "./DailyViewsChart";

export interface NoteData {
  noteSlug: string;
  count: number;
  lastViewed: string;
  noteLink: string;
}

interface UserProfileProps {
  user: IUser;
  notes: NoteData[];
  totalStudyTime: number;
  dailyViewsData: Array<{ date: string; views: number }>;
}

const UserProfile: React.FC<UserProfileProps> = ({
  user,
  notes,
  totalStudyTime,
  dailyViewsData,
}) => {
  const topNote =
    notes.length > 0
      ? notes.reduce((prev, curr) => (curr.count > prev.count ? curr : prev))
      : null;

  const minutes = Math.floor(totalStudyTime / 60);
  const seconds = Math.round(totalStudyTime % 60);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(notes.length / itemsPerPage);
  const paginatedNotes = notes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-8 p-4">
      <UserCard
        user={user}
        topNote={
          topNote ? { noteSlug: topNote.noteSlug, count: topNote.count } : undefined
        }
      />

      <div className="p-4 border rounded-md">
        <h3 className="text-lg font-semibold">Total Study Time</h3>
        <p className="text-xl font-bold">
          {minutes}m {seconds}s
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">Notes Visits (Bar Chart)</h3>
          <NoteChart
            notes={notes.map(({ noteSlug, count }) => ({ noteSlug, count }))}
          />
        </div>
        <div className="flex-1">
          <DailyViewsChart data={dailyViewsData} />
        </div>
      </div>

      <h3 className="text-xl font-semibold">Notes Visited</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Note Slug</TableHead>
              <TableHead>Visits</TableHead>
              <TableHead>Last Viewed</TableHead>
              <TableHead>Link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedNotes.map((note) => (
              <TableRow key={note.noteSlug}>
                <TableCell>{note.noteSlug}</TableCell>
                <TableCell>{note.count}</TableCell>
                <TableCell>{new Date(note.lastViewed).toLocaleString()}</TableCell>
                <TableCell>
                  <a
                    href={note.noteLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600"
                  >
                    View Note
                  </a>
                </TableCell>
              </TableRow>
            ))}
            {paginatedNotes.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No note visit data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <PaginationControl
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default UserProfile;

"use client";

import Link from "next/link";
import React from "react";
import { LeaderboardUser } from "@/app/admin/leaderboard/page";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const sec = Math.round(seconds % 60);
  return `${minutes}m ${sec}s`;
};

interface LeaderboardTableProps {
  data: LeaderboardUser[];
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Total Visits</TableHead>
            {/* <TableHead>Study Time</TableHead> */}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.email}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.planTier}</TableCell>
              <TableCell>{user.totalVisits}</TableCell>
              {/* <TableCell>{formatTime(user.totalStudyTime)}</TableCell> */}
              <TableCell>
                <Link
                  href={`/admin/users/${user._id}`}
                  className="text-blue-600 underline"
                >
                  View Profile
                </Link>
              </TableCell>
            </TableRow>
          ))}
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No data available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaderboardTable;

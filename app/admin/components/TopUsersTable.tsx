/* eslint-disable @next/next/no-img-element */
"use client";

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
import Link from "next/link";

interface TopUsersTableProps {
  data: LeaderboardUser[];
}

const TopUsersTable: React.FC<TopUsersTableProps> = ({ data }) => {
  const top10 = data.sort((a, b) => b.totalVisits - a.totalVisits).slice(0, 10);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Profile</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Total Visits</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {top10.map((user) => (
            <TableRow key={user.email}>
              <TableCell>
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                )}
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.planTier}</TableCell>
              <TableCell>{user.totalVisits}</TableCell>
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
          {top10.length === 0 && (
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

export default TopUsersTable;

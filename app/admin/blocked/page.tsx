"use client";

import { useEffect, useState } from "react";
import { BlockedUserTable } from "../components/BlockedUserTable";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

interface BlockedUser {
  _id: string;
  name: string;
  email: string;
  Blocked: boolean;
}

export default function BlockedUsersPage() {
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlockedUsers() {
      try {
        const response = await fetch("/admin/api/blocked");
        const data = await response.json();
        setBlockedUsers(data);
      } catch (error) {
        console.error("Failed to fetch blocked users:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlockedUsers();
  }, []);

  const handleUnblock = async (userId: string) => {
    try {
      const response = await fetch("/admin/api/blocked", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action: "unblock" }),
      });

      const result = await response.json();

      if (result.success) {
        setBlockedUsers((prev) => prev.filter((user) => user._id !== userId));
      } else {
        console.error("Failed to unblock user:", result.error);
      }
    } catch (error) {
      console.error("Error unblocking user:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Blocked Users</h1>
      <Separator className="mb-6" />

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center space-x-4">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : blockedUsers.length > 0 ? (
        <BlockedUserTable users={blockedUsers} onUnblock={handleUnblock} />
      ) : (
        <p>No blocked users found.</p>
      )}
    </div>
  );
}

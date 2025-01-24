"use client";

import { useEffect, useState } from "react";
import { NotesRequestTable } from "../components/NotesRequestTable";
import { NotesStats } from "../components/NotesStats";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const BASE_URL = process.env.NEXTAUTH_URL || "";

interface Stats {
  totalNotesRequests: number;
  completedNotesRequests: number;
  rejectedNotesRequests: number;
  pendingNotesRequests: number;
}

interface NotesRequest {
  _id: string;
  user: { name: string; email: string };
  university: string;
  degree: string;
  year: number;
  semester: string;
  subject: string;
  syllabus: string;
  phoneNumber: string;
  status: string;
  createdAt: string;
}

export default function NotesRequestsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [requests, setRequests] = useState<NotesRequest[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(true);

  // Fetch stats
  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      const response = await fetch(`${BASE_URL}/admin/api/stats`, {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch stats: ${response.statusText}`);
      }
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoadingStats(false);
    }
  };

  // Fetch requests
  const fetchRequests = async () => {
    setLoadingRequests(true);
    try {
      const response = await fetch(`${BASE_URL}/admin/api/notes-requests`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch requests: ${response.statusText}`);
      }

      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    } finally {
      setLoadingRequests(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchRequests();
  }, []);

  // Update status function
  const handleUpdateStatus = async (requestId: string, status: string) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/api/notes-requests`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update status");
      }

      const result = await response.json();
      if (result.success) {
        // Update the state to reflect the status change
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request._id === requestId ? { ...request, status } : request
          )
        );
      }
    } catch (error) {
      console.error(`Error updating status for request ${requestId}:`, error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Notes Requests</h1>
      <Separator className="mb-6" />

      {loadingStats || loadingRequests ? (
        <Skeleton className="h-24 w-full mb-6" />
      ) : (
        stats && <NotesStats stats={stats} />
      )}

      <h2 className="text-xl font-bold mb-4">All Notes Requests</h2>
      <Separator className="mb-6" />

      {loadingRequests ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="h-6 w-full" />
          ))}
        </div>
      ) : (
        <NotesRequestTable
          requests={requests}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
}

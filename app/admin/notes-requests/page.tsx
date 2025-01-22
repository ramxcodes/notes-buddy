"use client";

import { useEffect, useState } from "react";
import { NotesRequestTable } from "../components/NotesRequestTable";
import { Separator } from "@/components/ui/separator";

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
  const [requests, setRequests] = useState<NotesRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRequests() {
      try {
        const response = await fetch("/admin/api/notes-requests");
        const data = await response.json();

        if (Array.isArray(data)) {
          setRequests(data);
        } else {
          console.error("API Error: Response is not an array.");
          setRequests([]);
        }
      } catch (error) {
        console.error("Failed to fetch notes requests:", error);
        setRequests([]);
      } finally {
        setLoading(false);
      }
    }

    fetchRequests();
  }, []);

  const handleUpdateStatus = async (requestId: string, status: string) => {
    try {
      const response = await fetch("/api/notes/request", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, status }),
      });

      const result = await response.json();

      if (result.success) {
        setRequests((prev) =>
          prev.map((request) =>
            request._id === requestId ? { ...request, status } : request
          )
        );
      } else {
        console.error("Failed to update request status:", result.error);
      }
    } catch (error) {
      console.error("Error updating request status:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Notes Requests</h1>
      <Separator className="mb-6" />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <NotesRequestTable requests={requests} onUpdateStatus={handleUpdateStatus} />
      )}
    </div>
  );
}

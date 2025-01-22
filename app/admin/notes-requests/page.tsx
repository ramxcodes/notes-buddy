"use client";

import { useEffect, useState } from "react";
import { NotesReportsTable } from "../components/NotesReportsTable";
import { Separator } from "@/components/ui/separator";

interface NotesReport {
  _id: string;
  noteUrl: string;
  issue: string;
  otherText?: string;
  userName: string;
  userEmail: string;
  status: string;
  createdAt: string;
}

export default function NotesReportsPage() {
  const [reports, setReports] = useState<NotesReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      try {
        const response = await fetch("/admin/api/notes-reports");
        const data = await response.json();

        console.log("Fetched Reports:", data); 

        if (Array.isArray(data)) {
          setReports(data);
        } else {
          console.error("API Error: Response is not an array.");
          setReports([]);
        }
      } catch (error) {
        console.error("Failed to fetch notes reports:", error);
        setReports([]);
      } finally {
        setLoading(false);
      }
    }

    fetchReports();
  }, []);

  const handleUpdateStatus = async (reportId: string, status: string) => {
    try {
      const response = await fetch("/admin/api/notes-reports", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportId, status }),
      });

      const result = await response.json();

      if (result.success) {
        setReports((prev) =>
          prev.map((report) =>
            report._id === reportId ? { ...report, status } : report
          )
        );
      } else {
        console.error("Failed to update report status:", result.error);
      }
    } catch (error) {
      console.error("Error updating report status:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Notes Requests</h1>
      <Separator className="mb-6" />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <NotesReportsTable reports={reports} onUpdateStatus={handleUpdateStatus} />
      )}
    </div>
  );
}

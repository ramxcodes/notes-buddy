import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDistanceToNow } from "date-fns";

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

interface NotesReportsTableProps {
  reports: NotesReport[];
  onUpdateStatus: (reportId: string, status: string) => Promise<void>;
}

export function NotesReportsTable({
  reports,
  onUpdateStatus,
}: NotesReportsTableProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleStatusChange = async (reportId: string, status: string) => {
    setLoading(reportId);
    await onUpdateStatus(reportId, status);
    setLoading(null);
  };

  return (
    <Table className="min-w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Report No</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Note URL</TableHead>
          <TableHead>Issue</TableHead>
          <TableHead>Other Details</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Reported At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reports.map((report, index) => (
          <TableRow key={report._id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{report.userName}</TableCell>
            <TableCell>{report.userEmail}</TableCell>
            <TableCell>
              <a
                href={report.noteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Note
              </a>
            </TableCell>
            <TableCell>{report.issue}</TableCell>
            <TableCell>{report.otherText || "N/A"}</TableCell>
            <TableCell>
              <Select
                onValueChange={(value) => handleStatusChange(report._id, value)}
                defaultValue={report.status || "Pending"}
                disabled={loading === report._id}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              {formatDistanceToNow(new Date(report.createdAt))} ago
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

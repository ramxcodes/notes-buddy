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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatDistanceToNow } from "date-fns";

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

interface NotesRequestTableProps {
  requests: NotesRequest[];
  onUpdateStatus: (requestId: string, status: string) => Promise<void>;
}

export function NotesRequestTable({
  requests,
  onUpdateStatus,
}: NotesRequestTableProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const [selectedSyllabus, setSelectedSyllabus] = useState<string | null>(null);

  const handleStatusChange = async (requestId: string, status: string) => {
    setLoading(requestId);
    await onUpdateStatus(requestId, status); // Call parent function
    setLoading(null);
  };

  const handleOpenSyllabus = (syllabus: string) => {
    setSelectedSyllabus(syllabus);
  };

  const handleCloseSyllabus = () => {
    setSelectedSyllabus(null);
  };

  return (
    <>
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Req. No</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>University</TableHead>
            <TableHead>Degree</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Semester</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Requested</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request, index) => (
            <TableRow key={request._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{request.user.name}</TableCell>
              <TableCell>{request.phoneNumber}</TableCell>
              <TableCell>{request.university}</TableCell>
              <TableCell>{request.degree}</TableCell>
              <TableCell>{request.year}</TableCell>
              <TableCell>{request.semester}</TableCell>
              <TableCell>
                <button
                  onClick={() => handleOpenSyllabus(request.syllabus)}
                  className="underline"
                >
                  {request.subject}
                </button>
              </TableCell>
              <TableCell>
                <Select
                  onValueChange={(value) => handleStatusChange(request._id, value)}
                  defaultValue={request.status || "Pending"}
                  disabled={loading === request._id}
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
                {formatDistanceToNow(new Date(request.createdAt))} ago
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Syllabus Dialog */}
      <Dialog open={!!selectedSyllabus} onOpenChange={handleCloseSyllabus}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Syllabus</DialogTitle>
          </DialogHeader>
          <p>{selectedSyllabus}</p>
        </DialogContent>
      </Dialog>
    </>
  );
}

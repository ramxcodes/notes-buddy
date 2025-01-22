import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface BlockedUser {
  _id: string;
  name: string;
  email: string;
  Blocked: boolean;
}

interface BlockedUserTableProps {
  users: BlockedUser[];
  onUnblock: (userId: string) => void;
}

export function BlockedUserTable({ users, onUnblock }: BlockedUserTableProps) {
  return (
    <Table className="min-w-full">
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, index) => (
          <TableRow key={user._id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{user.name || "N/A"}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Button
                variant="destructive"
                onClick={() => onUnblock(user._id)}
              >
                Unblock
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

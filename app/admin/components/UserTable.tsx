import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface User {
  _id: string;
  name: string;
  email: string;
  planTier?: string;
  university?: string;
  degree?: string;
  year?: string;
  semesters?: string[];
  subscriptionStartDate?: string;
  subscriptionEndDate?: string;
  phoneNumber?: string;
  image?: string;
  Blocked?: boolean;
}

interface UserTableProps {
  users: User[];
  onToggleBlock: (userId: string, action: "block" | "unblock") => void;
}

export function UserTable({ users, onToggleBlock }: UserTableProps) {
  return (
    <Table className="min-w-full">
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Profile</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Premium</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>University</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Semester</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, index) => (
          <TableRow key={user._id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              <Avatar>
                <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                <AvatarFallback>{user.name?.[0] || "?"}</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>{user.name || "N/A"}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.planTier ? "Yes" : "No"}</TableCell>
            <TableCell>{user.phoneNumber || "N/A"}</TableCell>{" "}
            <TableCell>{user.university || "N/A"}</TableCell>
            <TableCell>{user.year || "N/A"}</TableCell>
            <TableCell>{user.semesters?.join(", ") || "N/A"}</TableCell>
            <TableCell>
              <Button
                variant={user.Blocked ? "default" : "destructive"}
                onClick={() =>
                  onToggleBlock(user._id, user.Blocked ? "unblock" : "block")
                }
              >
                {user.Blocked ? "Unblock" : "Block"}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

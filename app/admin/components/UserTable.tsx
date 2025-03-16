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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface User {
  _id: string;
  name: string;
  email: string;
  planTier?: string;
  razorpayDetails?: {
    amount: number;
    orderId?: string;
    paymentId?: string;
  };
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
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  currentPage: number;
  itemsPerPage: number;
}

export function UserTable({
  users,
  onToggleBlock,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  currentPage,
  itemsPerPage,
}: UserTableProps) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <div className="space-y-4">
      {/* Updated container to be responsive on small devices */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <Input
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="max-w-sm"
        />
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="premium">Premium Users</SelectItem>
            <SelectItem value="phone">Phone Users</SelectItem>
            <SelectItem value="nameAsc">Name (A-Z)</SelectItem>
            <SelectItem value="nameDesc">Name (Z-A)</SelectItem>
            <SelectItem value="newest">Newest Users</SelectItem>
            <SelectItem value="oldest">Oldest Users</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Profile</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Premium</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>University</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Semester</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.slice(startIndex, endIndex).map((user, index) => (
            <TableRow key={user._id}>
              <TableCell>{startIndex + index + 1}</TableCell>
              <TableCell>
                <Avatar>
                  <AvatarImage
                    src={user.image || ""}
                    alt={user.name || "User"}
                  />
                  <AvatarFallback>{user.name?.[0] || "?"}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{user.name || "N/A"}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.planTier ? "Yes" : "No"}</TableCell>
              <TableCell>
                {user.razorpayDetails && user.razorpayDetails.amount
                  ? user.razorpayDetails.amount
                  : "-"}
              </TableCell>
              <TableCell>{user.phoneNumber || "N/A"}</TableCell>
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
    </div>
  );
}

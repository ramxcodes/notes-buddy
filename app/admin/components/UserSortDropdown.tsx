"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserSortDropdownProps {
  value: "all" | "premium" | "nonPremium";
  onChange: (value: "all" | "premium" | "nonPremium") => void;
}

export function UserSortDropdown({ value, onChange }: UserSortDropdownProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort users" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Users</SelectItem>
        <SelectItem value="premium">Premium Users</SelectItem>
        <SelectItem value="nonPremium">Non Premium Users</SelectItem>
      </SelectContent>
    </Select>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";

interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber?: string;
}

interface CouponUsageModalProps {
  couponCode: string;
  open: boolean;
  onClose: () => void;
}

export function CouponUsageModal({ couponCode, open, onClose }: CouponUsageModalProps) {
  const [usageData, setUsageData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState<"name" | "email" | "phone">("name");

  useEffect(() => {
    if (open) {
      fetchUsageData();
    }
  }, [open, couponCode]);

  const fetchUsageData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/admin/api/coupons/${couponCode}/usage`);
      if (!response.ok) {
        throw new Error("Failed to fetch coupon usage");
      }
      const data: User[] = await response.json();
      setUsageData(data);
    } catch (error) {
      console.error("Error fetching usage data:", error);
    } finally {
      setLoading(false);
    }
  };

  const sortedUsage = [...usageData].sort((a, b) => {
    if (sortOption === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "email") {
      return a.email.localeCompare(b.email);
    } else if (sortOption === "phone") {
      return (a.phoneNumber || "").localeCompare(b.phoneNumber || "");
    }
    return 0;
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Usage Details for Coupon: {couponCode}</DialogTitle>
        </DialogHeader>
        <div className="mb-4 flex items-center space-x-2">
          <p className="font-medium">Sort by:</p>
          <Select value={sortOption} onValueChange={(val) => setSortOption(val as "name" | "email" | "phone")}>
            <SelectTrigger className="w-32">
              <span className="capitalize">{sortOption}</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="phone">Phone</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {loading ? (
          <Skeleton className="h-64 w-full" />
        ) : (
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedUsage.map((user, index) => (
                <TableRow key={user._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phoneNumber || "N/A"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

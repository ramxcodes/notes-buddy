"use client";

import { useEffect, useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { UserTable } from "./components/UserTable";
import { Users, DollarSign, FileText, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import PaginationControl from "./components/PaginationControl";

const BASE_URL = process.env.NEXTAUTH_URL || "";

interface Stats {
  totalUsers: number;
  premiumUsers: number;
  blockedUsers: number;
  totalRevenue: number;
  totalNotesRequests: number;
  completedNotesRequests: number;
  totalNotesReports: number;
  completedNotesReports: number;
}

interface User {
  _id: string;
  name: string;
  email: string;
  planTier?: string;
  razorpayDetails: {
    amount: number;
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

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;

  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      const response = await fetch(`${BASE_URL}/admin/api/stats`, {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch stats: ${response.statusText}`);
      }
      const data: Stats = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const response = await fetch(`${BASE_URL}/admin/api/users`, {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`);
      }
      const data: User[] = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchUsers();

    const interval = setInterval(() => {
      fetchStats();
      fetchUsers();
    }, 300_000);

    return () => clearInterval(interval);
  }, []);

  const handleToggleBlock = async (
    userId: string,
    action: "block" | "unblock"
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/api/blocked`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action }),
      });
      const result = await response.json();

      if (result.success) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId
              ? { ...user, Blocked: action === "block" }
              : user
          )
        );
      } else {
        console.error("Failed to update user block status:", result.error);
      }
    } catch (error) {
      console.error("Error updating user block status:", error);
    }
  };

  const filteredAndSortedUsers = useMemo(() => {
    let result = [...users];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (user) =>
          user.name?.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.phoneNumber?.toLowerCase().includes(query)
      );
    }

    switch (sortBy) {
      case "default":
        break;
      case "premium":
        // Filter to only premium users and sort by name
        result = result.filter((user) => user.planTier);
        result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
      case "phone":
        // Filter to only users with a phone number and sort by phone number
        result = result.filter(
          (user) => user.phoneNumber && user.phoneNumber.trim() !== ""
        );
        result.sort((a, b) =>
          (a.phoneNumber || "").localeCompare(b.phoneNumber || "")
        );
        break;
      case "nameAsc":
        result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
      case "nameDesc":
        result.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.subscriptionStartDate || 0).getTime() -
            new Date(a.subscriptionStartDate || 0).getTime()
        );
        break;
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.subscriptionStartDate || 0).getTime() -
            new Date(b.subscriptionStartDate || 0).getTime()
        );
        break;
    }

    return result;
  }, [users, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);

  const handleExportToExcel = () => {
    const exportData = filteredAndSortedUsers.map((user) => ({
      Name: user.name || "N/A",
      Email: user.email,
      Phone: user.phoneNumber || "N/A",
      University: user.university || "N/A",
      Degree: user.degree || "N/A",
      Year: user.year || "N/A",
      Plan: user.planTier || "Free",
      Amount: user.razorpayDetails?.amount || 0,
      "Subscription Start": user.subscriptionStartDate || "N/A",
      "Subscription End": user.subscriptionEndDate || "N/A",
      Status: user.Blocked ? "Blocked" : "Active",
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");
    XLSX.writeFile(wb, `users-export-${Date.now()}.xlsx`);
  };

  const statCards = [
    { title: "Total Users", value: stats?.totalUsers, icon: Users },
    { title: "Premium Users", value: stats?.premiumUsers, icon: Star },
    { title: "Blocked Users", value: stats?.blockedUsers, icon: Users },
    {
      title: "Total Revenue (₹)",
      value: stats?.totalRevenue,
      icon: DollarSign,
    },
    {
      title: "Total Notes Requests",
      value: stats?.totalNotesRequests,
      icon: FileText,
    },
    {
      title: "Completed Notes Requests",
      value: stats?.completedNotesRequests,
      icon: CheckCircle,
    },
    {
      title: "Total Notes Reports",
      value: stats?.totalNotesReports,
      icon: FileText,
    },
    {
      title: "Completed Notes Reports",
      value: stats?.completedNotesReports,
      icon: CheckCircle,
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <Separator className="mb-6" />

      {loadingStats ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[...Array(8)].map((_, index) => (
            <Skeleton key={index} className="h-32 w-full" />
          ))}
        </div>
      ) : stats ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-col items-center">
                {stat.icon && <stat.icon className="w-8 h-8 mb-2" />}
                <CardContent className="text-4xl font-bold">
                  {stat.value || "N/A"}
                </CardContent>
                <CardTitle className="text-base text-center font-gilroy">
                  {stat.title}
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : (
        <p>Failed to load stats. Please try again later.</p>
      )}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">All Users</h2>
        <Button onClick={handleExportToExcel}>Export to Excel</Button>
      </div>

      <Separator className="mb-6" />

      {loadingUsers ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <>
          <UserTable
            users={filteredAndSortedUsers}
            onToggleBlock={handleToggleBlock}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />

          <PaginationControl
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}

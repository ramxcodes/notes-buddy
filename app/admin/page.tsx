"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { UserTable } from "./components/UserTable";
import { Users, DollarSign, FileText, CheckCircle } from "lucide-react"; // Icons

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

  // Fetch stats
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

  // Fetch users
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

  // Poll every 5 minutes
  useEffect(() => {
    fetchStats();
    fetchUsers();

    const interval = setInterval(() => {
      fetchStats();
      fetchUsers();
    }, 300_000);

    return () => clearInterval(interval);
  }, []);

  // Handle block/unblock
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

  const statCards = [
    { title: "Total Users", value: stats?.totalUsers, icon: Users },
    { title: "Premium Users", value: stats?.premiumUsers, icon: CheckCircle },
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

      <h2 className="text-xl font-bold mb-4">All Users</h2>
      <Separator className="mb-6" />

      {loadingUsers ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <UserTable users={users} onToggleBlock={handleToggleBlock} />
      )}
    </div>
  );
}

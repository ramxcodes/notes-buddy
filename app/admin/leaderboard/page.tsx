"use client";

import { useEffect, useState } from "react";
import DropdownFilter from "@/app/admin/components/DropdownFilter";
import LeaderboardTable from "@/app/admin/components/LeaderboardTable";
import TopUsersTable from "@/app/admin/components/TopUsersTable";
import SkeletonTable from "@/app/admin/components/SkeletonTable";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  planTier: string;
  image?: string;
  referralCode?: string;
  redemption?: string;
  phoneNumber?: string;
  subscriptionStartDate?: string;
  subscriptionEndDate?: string;
}

export interface INoteUsage {
  noteSlug: string;
  totalViews: number;
  lastViewed: string;
  noteLink: string;
  userEntries: Array<{
    email: string;
    planTier: string;
    isBlocked: boolean;
    viewedAt: string;
    ip: string;
    timeSpent?: number;
  }>;
}

export interface LeaderboardUser {
  _id: string;
  name: string;
  email: string;
  planTier: string;
  image?: string;
  totalVisits: number;
  totalStudyTime: number;
  notes: Array<{
    noteSlug: string;
    count: number;
    lastViewed: string;
    noteLink: string;
  }>;
}

const LeaderboardPage = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [notesUsage, setNotesUsage] = useState<INoteUsage[]>([]);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<"all" | "premium">("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, notesRes] = await Promise.all([
          fetch("/admin/api/users"),
          fetch("/admin/api/notes-usage"),
        ]);
        const usersData: IUser[] = await usersRes.json();
        const notesUsageData: INoteUsage[] = await notesRes.json();

        setUsers(usersData);
        setNotesUsage(notesUsageData);
      } catch (error) {
        console.error("Error fetching leaderboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (loading) return;

    const leaderboardMap = new Map<string, LeaderboardUser>();

    const usersMap = new Map<string, IUser>();
    users.forEach((user) => {
      if (user.email) usersMap.set(user.email, user);
    });

    notesUsage.forEach((stat) => {
      stat.userEntries.forEach((entry) => {
        if (!entry.email) return;
        const userFromDB = usersMap.get(entry.email);
        if (!userFromDB) return;
        if (!leaderboardMap.has(entry.email)) {
          leaderboardMap.set(entry.email, {
            _id: userFromDB._id,
            name: userFromDB.name,
            email: userFromDB.email,
            planTier: userFromDB.planTier,
            image: userFromDB.image,
            totalVisits: 0,
            totalStudyTime: 0,
            notes: [],
          });
        }
        const lbUser = leaderboardMap.get(entry.email)!;
        lbUser.totalVisits += 1;
        lbUser.totalStudyTime += entry.timeSpent || 0;
        const existingNote = lbUser.notes.find(
          (n) => n.noteSlug === stat.noteSlug
        );
        if (existingNote) {
          existingNote.count += 1;
          if (new Date(entry.viewedAt) > new Date(existingNote.lastViewed)) {
            existingNote.lastViewed = entry.viewedAt;
          }
        } else {
          lbUser.notes.push({
            noteSlug: stat.noteSlug,
            count: 1,
            lastViewed: entry.viewedAt,
            noteLink: stat.noteLink,
          });
        }
      });
    });

    let leaderboardArray = Array.from(leaderboardMap.values());
    if (filter === "premium") {
      leaderboardArray = leaderboardArray.filter(
        (u) => u.planTier && u.planTier.toLowerCase() !== "free"
      );
    }
    leaderboardArray.sort((a, b) => b.totalVisits - a.totalVisits);
    setLeaderboardData(leaderboardArray);
  }, [loading, notesUsage, users, filter]);

  return (
    <div className="space-y-8 p-4">
      <h2 className="text-2xl font-bold mb-4">Top 10 Users</h2>
      {loading ? <SkeletonTable /> : <TopUsersTable data={leaderboardData} />}

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">All Users</h2>
        <div className="mb-4">
          <DropdownFilter
            value={filter}
            onChange={(val) => setFilter(val)}
            options={[
              { value: "all", label: "All Users" },
              { value: "premium", label: "Premium Users" },
            ]}
          />
        </div>
        {loading ? (
          <SkeletonTable />
        ) : (
          <LeaderboardTable data={leaderboardData} />
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;

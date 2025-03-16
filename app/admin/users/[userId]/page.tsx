"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SkeletonTable from "@/app/admin/components/SkeletonTable";
import UserProfile from "@/app/admin/components/UserProfile";
import { IUser } from "@/app/admin/components/UserCard";

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

const UserDetailPage = () => {
  const params = useParams();
  const userId = params.userId as string;

  const [user, setUser] = useState<IUser | null>(null);
  const [notes, setNotes] = useState<
    Array<{
      noteSlug: string;
      count: number;
      lastViewed: string;
      noteLink: string;
    }>
  >([]);
  const [totalStudyTime, setTotalStudyTime] = useState<number>(0);
  const [dailyViewsData, setDailyViewsData] = useState<
    Array<{ date: string; views: number }>
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserAndNotes = async () => {
      try {
        const [usersRes, notesRes] = await Promise.all([
          fetch("/admin/api/users"),
          fetch("/admin/api/notes-usage"),
        ]);
        const usersData: IUser[] = await usersRes.json();
        const notesUsageData: INoteUsage[] = await notesRes.json();

        const foundUser = usersData.find((u) => u._id === userId);
        if (!foundUser) {
          console.error("User not found");
          setLoading(false);
          return;
        }
        setUser(foundUser);

        const notesMap = new Map<
          string,
          {
            noteSlug: string;
            count: number;
            lastViewed: string;
            noteLink: string;
          }
        >();
        let aggregatedStudyTime = 0;
        const dailyViewsMap = new Map<string, number>();

        notesUsageData.forEach((stat) => {
          stat.userEntries.forEach((entry) => {
            if (entry.email === foundUser.email) {
              aggregatedStudyTime += entry.timeSpent || 0;
              const date = new Date(entry.viewedAt).toISOString().split("T")[0];
              dailyViewsMap.set(date, (dailyViewsMap.get(date) || 0) + 1);

              if (!notesMap.has(stat.noteSlug)) {
                notesMap.set(stat.noteSlug, {
                  noteSlug: stat.noteSlug,
                  count: 1,
                  lastViewed: entry.viewedAt,
                  noteLink: stat.noteLink,
                });
              } else {
                const existing = notesMap.get(stat.noteSlug)!;
                existing.count += 1;
                if (new Date(entry.viewedAt) > new Date(existing.lastViewed)) {
                  existing.lastViewed = entry.viewedAt;
                }
              }
            }
          });
        });

        setNotes(Array.from(notesMap.values()));
        setTotalStudyTime(aggregatedStudyTime);
        setDailyViewsData(
          Array.from(dailyViewsMap.entries()).map(([date, views]) => ({
            date,
            views,
          }))
        );
      } catch (error) {
        console.error("Error fetching user details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndNotes();
  }, [userId]);

  if (loading) return <SkeletonTable />;
  if (!user) return <p>User not found</p>;

  return (
    <UserProfile
      user={user}
      notes={notes}
      totalStudyTime={totalStudyTime}
      dailyViewsData={dailyViewsData}
    />
  );
};

export default UserDetailPage;

import { NextResponse } from "next/server";
import { getCollection } from "@/lib/db";

export async function GET() {
  try {
    const usersCollection = await getCollection("users");
    const requestNotesCollection = await getCollection("requestNotes");
    const reportsCollection = await getCollection("reportNotes");

    // Users Stats
    const totalUsers = await usersCollection.countDocuments();
    const premiumUsers = await usersCollection.countDocuments({ planTier: { $exists: true, $ne: null } });
    const blockedUsers = await usersCollection.countDocuments({ Blocked: true });

    // Revenue Stats
    const payments = await usersCollection
      .find({ razorpayDetails: { $exists: true } })
      .project({ "razorpayDetails.amount": 1 })
      .toArray();
    const totalRevenue = payments.reduce((sum, user) => sum + (user.razorpayDetails.amount || 0), 0);

    // Notes Requests Stats
    const totalNotesRequests = await requestNotesCollection.countDocuments();
    const completedNotesRequests = await requestNotesCollection.countDocuments({ status: "Completed" });

    // Notes Reports Stats
    const totalNotesReports = await reportsCollection.countDocuments();
    const completedNotesReports = await reportsCollection.countDocuments({ status: "Completed" });

    return NextResponse.json({
      totalUsers,
      premiumUsers,
      blockedUsers,
      totalRevenue,
      totalNotesRequests,
      completedNotesRequests,
      totalNotesReports,
      completedNotesReports,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}

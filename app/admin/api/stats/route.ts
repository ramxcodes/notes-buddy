import { NextResponse } from "next/server";
import { getCollection } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const usersCollection = await getCollection("users");
    const requestNotesCollection = await getCollection("requestNotes");
    const reportsCollection = await getCollection("reportNotes");

    const [
      totalUsers,
      premiumUsers,
      blockedUsers,
      payments,
      totalNotesRequests,
      completedNotesRequests,
      totalNotesReports,
      completedNotesReports,
    ] = await Promise.all([
      usersCollection.countDocuments(),
      usersCollection.countDocuments({
        planTier: { $exists: true, $ne: null },
      }),
      usersCollection.countDocuments({ Blocked: true }),
      usersCollection
        .find({ razorpayDetails: { $exists: true } })
        .project({ "razorpayDetails.amount": 1 })
        .toArray(),
      requestNotesCollection.countDocuments(),
      requestNotesCollection.countDocuments({ status: "Completed" }),
      reportsCollection.countDocuments(),
      reportsCollection.countDocuments({ status: "Completed" }),
    ]);

    const totalRevenue = payments.reduce(
      (sum, user: any) => sum + (user.razorpayDetails?.amount || 0),
      0
    );

    return new NextResponse(
      JSON.stringify({
        totalUsers,
        premiumUsers,
        blockedUsers,
        totalRevenue,
        totalNotesRequests,
        completedNotesRequests,
        totalNotesReports,
        completedNotesReports,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
          Expires: "0",
          Pragma: "no-cache",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}

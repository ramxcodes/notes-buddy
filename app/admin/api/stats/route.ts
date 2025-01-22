import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const usersCollection = await getCollection("users");

    // Fetch counts
    const totalUsers = await usersCollection.countDocuments();
    const premiumUsers = await usersCollection.countDocuments({ planTier: { $exists: true, $ne: null } });
    const blockedUsers = await usersCollection.countDocuments({ Blocked: true });

    // Total Revenue
    const payments = await usersCollection
      .find({ razorpayDetails: { $exists: true } })
      .project({ "razorpayDetails.amount": 1 })
      .toArray();
    const totalRevenue = payments.reduce((sum, user) => sum + (user.razorpayDetails.amount || 0), 0);

    return NextResponse.json({
      totalUsers,
      premiumUsers,
      blockedUsers,
      totalRevenue,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}

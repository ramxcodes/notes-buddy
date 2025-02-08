import { NextResponse } from "next/server";
import { getCollection } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const referralsCollection = await getCollection("referrals");
    const referrals = await referralsCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    return NextResponse.json({ referrals });
  } catch (error) {
    console.error("Error fetching referrals for admin:", error);
    return NextResponse.json(
      { error: "Failed to fetch referrals" },
      { status: 500 }
    );
  }
}

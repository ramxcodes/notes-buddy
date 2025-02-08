import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;
  try {
    const referralsCollection = await getCollection("referrals");
    const referral = await referralsCollection.findOne({ userId: new ObjectId(userId) });
    return NextResponse.json({ referral });
  } catch (error) {
    console.error("Error fetching referral:", error);
    return NextResponse.json({ error: "Failed to fetch referral" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id || !session.user?.name || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;
  const referrerName = session.user.name;
  const referrerEmail = session.user.email;
  try {
    const referralsCollection = await getCollection("referrals");
    const existingReferral = await referralsCollection.findOne({ userId: new ObjectId(userId) });
    if (existingReferral) {
      return NextResponse.json({ error: "Referral code already created" }, { status: 400 });
    }

    const couponCode = referrerName.replace(/\s+/g, "").toUpperCase() + userId.slice(-4).toUpperCase() + "NB";
    const createdAt = new Date();
    const expiryDate = new Date(createdAt.getTime() + 30 * MS_PER_DAY);
    const newReferral = {
      userId: new ObjectId(userId),
      referrerName,
      referrerEmail,
      couponCode,
      minRedemption: 3,
      maxRedemption: 10,
      redeemedBy: [] as {
        userId: ObjectId;
        name: string;
        email: string;
        redeemedAt: Date;
      }[],
      createdAt,
      expiryDate,
      invalidated: false,
    };
    const result = await referralsCollection.insertOne(newReferral);
    if (!result.insertedId) {
      return NextResponse.json({ error: "Failed to create referral code" }, { status: 500 });
    }
    (newReferral as any)._id = result.insertedId;
    return NextResponse.json({ referral: newReferral });
  } catch (error) {
    console.error("Error creating referral code:", error);
    return NextResponse.json({ error: "Failed to create referral code" }, { status: 500 });
  }
}

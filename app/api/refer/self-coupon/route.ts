import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id || !session.user?.name) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;
  try {
    const referralsCollection = await getCollection("referrals");
    const referral = await referralsCollection.findOne({
      userId: new ObjectId(userId),
    });
    if (!referral) {
      return NextResponse.json(
        { error: "No referral code found. Create one first." },
        { status: 400 }
      );
    }

    if (referral.redeemedBy.length < referral.minRedemption) {
      return NextResponse.json(
        { error: "Not enough referrals to generate a self-coupon" },
        { status: 400 }
      );
    }

    if (referral.selfCouponCode) {
      return NextResponse.json({ referral });
    }

    const selfCouponCode = referral.couponCode + "SELF";

    const createdAt = new Date(referral.createdAt);
    let newExpiry = new Date(createdAt.getTime() + 30 * MS_PER_DAY);
    if (referral.redeemedBy.length >= referral.maxRedemption) {
      newExpiry = new Date(createdAt.getTime() + 15 * MS_PER_DAY);
    }
    const updateResult = await referralsCollection.updateOne(
      { _id: referral._id },
      { $set: { selfCouponCode, expiryDate: newExpiry } }
    );
    if (updateResult.modifiedCount === 0) {
      return NextResponse.json(
        { error: "Failed to generate self-coupon" },
        { status: 500 }
      );
    }
    const updatedReferral = await referralsCollection.findOne({
      _id: referral._id,
    });
    return NextResponse.json({ referral: updatedReferral });
  } catch (error) {
    console.error("Error generating self-coupon:", error);
    return NextResponse.json(
      { error: "Failed to generate self-coupon" },
      { status: 500 }
    );
  }
}

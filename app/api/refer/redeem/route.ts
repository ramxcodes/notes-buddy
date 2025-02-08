import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (
    !session ||
    !session.user?.id ||
    !session.user?.name ||
    !session.user?.email
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const refereeId = session.user.id;
  const refereeName = session.user.name;
  const refereeEmail = session.user.email;
  const body = await request.json();
  const { couponCode } = body;
  if (!couponCode) {
    return NextResponse.json(
      { error: "Coupon code is required" },
      { status: 400 }
    );
  }
  try {
    const referralsCollection = await getCollection("referrals");
    const referral = await referralsCollection.findOne({ couponCode });
    if (!referral) {
      return NextResponse.json(
        { error: "Referral code not found" },
        { status: 404 }
      );
    }
    if (referral.userId.toString() === refereeId) {
      return NextResponse.json(
        { error: "You cannot redeem your own referral code" },
        { status: 400 }
      );
    }

    const alreadyRedeemed = await referralsCollection.findOne({
      "redeemedBy.userId": new ObjectId(refereeId),
    });
    if (alreadyRedeemed) {
      return NextResponse.json(
        { error: "You have already redeemed a referral code" },
        { status: 400 }
      );
    }
    if (referral.invalidated || new Date() > new Date(referral.expiryDate)) {
      return NextResponse.json(
        { error: "Referral code is expired or invalid" },
        { status: 400 }
      );
    }
   
    if (referral.redeemedBy.length >= referral.maxRedemption) {
      return NextResponse.json(
        { error: "Referral redemption limit reached" },
        { status: 400 }
      );
    }

    const updated = await referralsCollection.findOneAndUpdate(
      { _id: referral._id },
      {
        $push: {
          redeemedBy: {
            userId: new ObjectId(refereeId),
            name: refereeName,
            email: refereeEmail,
            redeemedAt: new Date(),
          },
        } as any,
      },
      { returnDocument: "after" }
    );
    if (!updated.value) {
      return NextResponse.json(
        { error: "Failed to redeem referral code" },
        { status: 500 }
      );
    }
    return NextResponse.json({ success: true, referral: updated.value });
  } catch (error) {
    console.error("Error redeeming referral code:", error);
    return NextResponse.json(
      { error: "Failed to redeem referral code" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import razorpay from "@/lib/razorpay";
import clientPromise from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const currentUserId = session.user.id;

  try {
    const {
      tier,
      university,
      degree,
      year,
      semester,
      couponCode,
    }: {
      tier: string;
      university: string;
      degree: string;
      year: string;
      semester: string;
      couponCode?: string;
    } = await request.json();

    const pricing: { [key: string]: number } = {
      "Tier 1": 62,
      "Tier 2": 134,
      "Tier 3": 174,
    };

    if (!pricing[tier]) {
      return NextResponse.json(
        { error: "Invalid subscription tier" },
        { status: 400 }
      );
    }

    const originalAmount = pricing[tier] * 100;
    let finalAmount = originalAmount;
    let couponDetails: any = null;
    const client = await clientPromise;
    const db = client.db();

    if (couponCode) {
      const standardCoupon = await db
        .collection("coupons")
        .findOne({ code: couponCode });
      if (standardCoupon) {
        if (
          standardCoupon.expiryDate &&
          new Date(standardCoupon.expiryDate) < new Date()
        ) {
          return NextResponse.json(
            { error: "Coupon expired" },
            { status: 400 }
          );
        }
        if (
          standardCoupon.usageLimit &&
          standardCoupon.usageCount >= standardCoupon.usageLimit
        ) {
          return NextResponse.json(
            { error: "Coupon usage limit reached" },
            { status: 400 }
          );
        }
        let discount = 0;
        if (standardCoupon.type === "flat") {
          discount = standardCoupon.value * 100;
        } else if (standardCoupon.type === "percent") {
          discount = Math.floor(originalAmount * (standardCoupon.value / 100));
        }
        finalAmount = originalAmount - discount;
        if (finalAmount < 0) finalAmount = 0;
        couponDetails = {
          code: couponCode,
          type: standardCoupon.type,
          discount,
        };
      } else {
        const referral = await db.collection("referrals").findOne({
          $or: [{ couponCode }, { selfCouponCode: couponCode }],
        });
        if (!referral) {
          return NextResponse.json(
            { error: "Invalid coupon code" },
            { status: 400 }
          );
        }
        if (
          referral.invalidated ||
          new Date() > new Date(referral.expiryDate)
        ) {
          return NextResponse.json(
            { error: "Referral code expired or invalid" },
            { status: 400 }
          );
        }
        if (tier === "Tier 1") {
          return NextResponse.json(
            {
              error: "Referral codes are applicable only on Tier 2 and Tier 3",
            },
            { status: 400 }
          );
        }
        if (referral.userId.toString() === currentUserId) {
          if (couponCode !== referral.selfCouponCode) {
            return NextResponse.json(
              { error: "You cannot use your own referral code" },
              { status: 400 }
            );
          }
          if (referral.redeemedBy.length < referral.minRedemption) {
            return NextResponse.json(
              { error: "Not enough referrals for discount" },
              { status: 400 }
            );
          }
          const discountRupees = Math.min(referral.redeemedBy.length * 10, 100);
          const discount = discountRupees * 100;
          finalAmount = originalAmount - discount;
          if (finalAmount < 0) finalAmount = 0;
          couponDetails = {
            code: couponCode,
            type: "self",
            discount,
            redeemedCount: referral.redeemedBy.length,
          };
        } else {
          const discount = 10 * 100;
          finalAmount = originalAmount - discount;
          if (finalAmount < 0) finalAmount = 0;
          couponDetails = { code: couponCode, type: "referee", discount };
        }
      }
    }

    const order = await razorpay.orders.create({
      amount: finalAmount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    return NextResponse.json({
      ...order,
      university,
      degree,
      year,
      semester,
      coupon: couponDetails,
      originalAmount,
      finalAmount,
    });
  } catch (error) {
    console.error("Error Creating Razorpay Order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

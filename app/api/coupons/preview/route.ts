import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: Request) {
  try {
    const { tier, basePrice, couponCode } = await request.json();
    const pricing = Number(basePrice);
    const originalAmount = pricing * 100;
    let finalAmount = originalAmount;
    let couponDetails: any = null;

    const client = await clientPromise;
    const db = client.db();

    const standardCoupon = await db
      .collection("coupons")
      .findOne({ code: couponCode });
    if (standardCoupon) {
      if (
        standardCoupon.expiryDate &&
        new Date(standardCoupon.expiryDate) < new Date()
      ) {
        return NextResponse.json({ error: "Coupon expired" }, { status: 400 });
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
      couponDetails = { code: couponCode, type: standardCoupon.type, discount };
      return NextResponse.json({
        originalPrice: originalAmount / 100,
        finalPrice: finalAmount / 100,
        discountAmount: discount / 100,
        message: "Standard coupon applied",
      });
    } else {
      const referral = await db.collection("referrals").findOne({
        $or: [{ couponCode }, { selfCouponCode: couponCode }],
      });
      if (!referral) {
        return NextResponse.json(
          { error: "Invalid coupon/referral code" },
          { status: 400 }
        );
      }
      if (referral.invalidated || new Date() > new Date(referral.expiryDate)) {
        return NextResponse.json(
          { error: "Referral code expired or invalid" },
          { status: 400 }
        );
      }

      if (tier === "Tier 1") {
        return NextResponse.json(
          { error: "Referral codes are applicable only on Tier 2 and Tier 3" },
          { status: 400 }
        );
      }

      if (referral.selfCouponCode && couponCode === referral.selfCouponCode) {
        if (referral.redeemedBy.length < referral.minRedemption) {
          return NextResponse.json(
            { error: "Not enough referrals for self-coupon discount" },
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
        return NextResponse.json({
          originalPrice: originalAmount / 100,
          finalPrice: finalAmount / 100,
          discountAmount: discount / 100,
          message: `Self-coupon applied (${referral.redeemedBy.length} referrals)`,
        });
      } else {
        const discount = 10 * 100;
        finalAmount = originalAmount - discount;
        if (finalAmount < 0) finalAmount = 0;
        couponDetails = { code: couponCode, type: "referee", discount };
        return NextResponse.json({
          originalPrice: originalAmount / 100,
          finalPrice: finalAmount / 100,
          discountAmount: discount / 100,
          message: "Referral code applied: Flat ₹10 discount",
        });
      }
    }
  } catch (error) {
    console.error("Error previewing coupon:", error);
    return NextResponse.json(
      { error: "Failed to preview coupon" },
      { status: 500 }
    );
  }
}

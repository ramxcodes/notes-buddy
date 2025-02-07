import { NextResponse } from "next/server";
import razorpay from "@/lib/razorpay";
import clientPromise from "@/lib/db";

export async function POST(request: Request) {
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
      "Tier 3": 175,
    };

    if (!pricing[tier]) {
      return NextResponse.json(
        { error: "Invalid subscription tier" },
        { status: 400 }
      );
    }

    const originalAmount = pricing[tier] * 100;
    let finalAmount = originalAmount;
    let couponDetails = null;

    if (couponCode) {
      const client = await clientPromise;
      const db = client.db();

      const coupon = await db.collection("coupons").findOne({ code: couponCode });

      if (!coupon) {
        return NextResponse.json({ error: "Invalid coupon code" }, { status: 400 });
      }

      if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) {
        return NextResponse.json({ error: "Coupon expired" }, { status: 400 });
      }

      if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
        return NextResponse.json({ error: "Coupon usage limit reached" }, { status: 400 });
      }

      let discount = 0;
      if (coupon.type === "flat") {
        discount = coupon.value * 100;
      } else if (coupon.type === "percent") {
        discount = Math.floor(originalAmount * (coupon.value / 100));
      }

      finalAmount = originalAmount - discount;
      if (finalAmount < 0) finalAmount = 0;

      couponDetails = { code: couponCode, type: coupon.type, discount };
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

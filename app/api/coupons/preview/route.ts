// app/api/coupons/preview/route.ts
import { NextResponse } from "next/server";
import { getCollection } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { tier, basePrice, couponCode } = await request.json();
    // basePrice is provided in rupees
    if (!tier || basePrice == null) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const originalPrice = Number(basePrice);
    let finalPrice = originalPrice;
    let discountAmount = 0;

    if (couponCode) {
      const couponsCollection = await getCollection("coupons");
      const coupon = await couponsCollection.findOne({ code: couponCode });
      if (!coupon) {
        return NextResponse.json({ error: "Invalid coupon code" }, { status: 400 });
      }
      if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) {
        return NextResponse.json({ error: "Coupon expired" }, { status: 400 });
      }
      if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
        return NextResponse.json({ error: "Coupon usage limit reached" }, { status: 400 });
      }

      if (coupon.type === "flat") {
        discountAmount = Number(coupon.value);
      } else if (coupon.type === "percent") {
        discountAmount = originalPrice * (Number(coupon.value) / 100);
      }
      finalPrice = originalPrice - discountAmount;
      if (finalPrice < 0) finalPrice = 0;
    }

    return NextResponse.json({ originalPrice, finalPrice, discountAmount });
  } catch (error) {
    console.error("Error in coupon preview:", error);
    return NextResponse.json({ error: "Failed to calculate discount" }, { status: 500 });
  }
}

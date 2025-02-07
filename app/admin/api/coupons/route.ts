import { NextResponse } from "next/server";
import { getCollection } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const couponsCollection = await getCollection("coupons");
    const coupons = await couponsCollection.find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(coupons);
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return NextResponse.json({ error: "Failed to fetch coupons" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { code, type, value, expiryDate, usageLimit } = await request.json();

    if (!code || !type || value == null) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (type !== "flat" && type !== "percent") {
      return NextResponse.json({ error: "Invalid coupon type" }, { status: 400 });
    }

    const couponsCollection = await getCollection("coupons");

    // Ensure coupon code is unique
    const existing = await couponsCollection.findOne({ code });
    if (existing) {
      return NextResponse.json({ error: "Coupon code already exists" }, { status: 400 });
    }

    const coupon = {
      code,
      type,
      value,
      expiryDate: expiryDate ? new Date(expiryDate) : null,
      usageLimit: usageLimit ? Number(usageLimit) : null,
      usageCount: 0,
      usedBy: [] as string[],
      createdAt: new Date(),
    };

    const result = await couponsCollection.insertOne(coupon);

    if (!result.insertedId) {
      return NextResponse.json({ error: "Failed to create coupon" }, { status: 500 });
    }

    return NextResponse.json({ success: true, coupon });
  } catch (error) {
    console.error("Error creating coupon:", error);
    return NextResponse.json({ error: "Failed to create coupon" }, { status: 500 });
  }
}

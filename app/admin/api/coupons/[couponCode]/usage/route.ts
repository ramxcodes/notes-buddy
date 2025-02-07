import { NextResponse } from "next/server";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: { couponCode: string } }
) {
  try {
    const { couponCode } = params;
    const couponsCollection = await getCollection("coupons");
    const coupon = await couponsCollection.findOne({ code: couponCode });
    if (!coupon) {
      return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
    }
    const usedBy = coupon.usedBy || [];
    // Convert string IDs to ObjectId instances
    const userIds = usedBy.map((id: string) => new ObjectId(id));
    const usersCollection = await getCollection("users");
    const users = await usersCollection.find({ _id: { $in: userIds } }).toArray();
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching coupon usage:", error);
    return NextResponse.json({ error: "Failed to fetch coupon usage" }, { status: 500 });
  }
}

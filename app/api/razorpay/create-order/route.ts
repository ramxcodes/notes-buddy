import { NextResponse } from "next/server";
import razorpay from "@/lib/razorpay";

export async function POST(request: Request) {
  try {
    const {
      tier,
      university,
      degree,
      year,
    }: { tier: string; university: string; degree: string; year: string } =
      await request.json();

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

    const amount = pricing[tier] * 100;

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    return NextResponse.json({ ...order, university, degree, year });
  } catch (error) {
    console.error("Error Creating Razorpay Order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

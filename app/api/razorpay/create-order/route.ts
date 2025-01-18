import { NextResponse } from "next/server";
import razorpay from "@/lib/razorpay";

export async function POST(request: Request) {
  try {
    // Extracting request data from the JSON body
    const {
      tier,
      university,
      degree,
      year,
    }: { tier: string; university: string; degree: string; year: string } =
      await request.json();

    // Pricing structure for tiers
    const pricing: { [key: string]: number } = {
      "Tier 1": 99,
      "Tier 2": 149,
      "Tier 3": 199,
    };

    // Validate subscription tier
    if (!pricing[tier]) {
      return NextResponse.json(
        { error: "Invalid subscription tier" },
        { status: 400 }
      );
    }

    // Calculate the amount in paise (smallest currency unit for Razorpay)
    const amount = pricing[tier] * 100;

    // Creating a Razorpay order
    const order = await razorpay.orders.create({
      amount, // Amount in paise
      currency: "INR", // Currency in INR
      receipt: `receipt_${Date.now()}`, // Unique receipt identifier
    });

    // Return the order details along with the user-provided info
    return NextResponse.json({ ...order, university, degree, year });
  } catch (error) {
    console.error("Error Creating Razorpay Order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

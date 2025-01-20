import { NextResponse } from "next/server";
import crypto from "crypto";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      tier,
      university,
      degree,
      year,
    }: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
      userId: string;
      tier: string;
      university: string;
      degree: string;
      year: "1st Year" | "2nd Year" | "3rd Year" | "4th Year";
    } = await request.json();

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      console.error("Invalid Signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const semesters = {
      "1st Year": ["1st Semester", "2nd Semester"],
      "2nd Year": ["3rd Semester", "4th Semester"],
      "3rd Year": ["5th Semester", "6th Semester"],
      "4th Year": ["7th Semester", "8th Semester"],
    };

    const client = await clientPromise;
    const db = client.db();

    const updateResult = await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          planTier: tier,
          subscriptionStartDate: new Date(),
          subscriptionEndDate: new Date(
            new Date().setFullYear(new Date().getFullYear() + 1)
          ),
          university,
          degree,
          year,
          semesters: semesters[year],
          razorpayDetails: {
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
          },
        },
      }
    );

    if (updateResult.modifiedCount === 0) {
      console.error("User not found or update failed");
      return NextResponse.json(
        { error: "Failed to update subscription details" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error Verifying Payment:", error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}

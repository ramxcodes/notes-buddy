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
      semester,
      amount,
      couponCode,
    }: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
      userId: string;
      tier: string;
      university: string;
      degree: string;
      year: "1st Year" | "2nd Year" | "3rd Year" | "4th Year";
      semester: string;
      amount: number;
      couponCode?: string;
    } = await request.json();

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      console.error("Invalid Signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Validate university
    if (university !== "Medicaps University") {
      return NextResponse.json(
        { error: "Invalid university" },
        { status: 400 }
      );
    }
    // Validate degree
    if (!["B Tech", "B Tech CSBS"].includes(degree)) {
      return NextResponse.json({ error: "Invalid degree" }, { status: 400 });
    }
    // Validate year based on degree
    if (
      degree === "B Tech" &&
      !["1st Year", "2nd Year", "3rd Year"].includes(year)
    ) {
      return NextResponse.json(
        { error: "Invalid year for B Tech" },
        { status: 400 }
      );
    }
    if (
      degree === "B Tech CSBS" &&
      !["1st Year", "2nd Year", "3rd Year", "4th Year"].includes(year)
    ) {
      return NextResponse.json(
        { error: "Invalid year for B Tech CSBS" },
        { status: 400 }
      );
    }
    // Validate semester
    const validSemesters: { [key: string]: string[] } = {
      "1st Year": ["1st Semester", "2nd Semester"],
      "2nd Year": ["3rd Semester", "4th Semester"],
      "3rd Year": ["5th Semester", "6th Semester"],
      "4th Year": ["7th Semester", "8th Semester"],
    };
    if (!validSemesters[year] || !validSemesters[year].includes(semester)) {
      return NextResponse.json(
        { error: "Invalid semester for selected year" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const updateResult = await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          planTier: tier,
          subscriptionStartDate: new Date(),
          subscriptionEndDate: new Date(
            new Date().setMonth(new Date().getMonth() + 8)
          ),
          university,
          degree,
          year,
          // Store the selected semester as an array with a single element
          semesters: [semester],
          razorpayDetails: {
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            amount,
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

    // Update coupon usage if a coupon was applied
    if (couponCode) {
      await db.collection("coupons").updateOne(
        { code: couponCode },
        {
          $inc: { usageCount: 1 },
          $push: { usedBy: new ObjectId(userId) },
        }
      );
    }

    const paymentResult = await db.collection("payments").insertOne({
      userId: new ObjectId(userId),
      email: await db
        .collection("users")
        .findOne({ _id: new ObjectId(userId) }, { projection: { email: 1 } })
        .then((user) => user?.email),
      amount,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      coupon: couponCode ? couponCode : null,
      createdAt: new Date(),
    });

    if (!paymentResult.insertedId) {
      console.error("Failed to record payment");
      return NextResponse.json(
        { error: "Failed to record payment" },
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

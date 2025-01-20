import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
  try {
    const { userId, phoneNumber }: { userId: string; phoneNumber: string } =
      await request.json();

    if (!phoneNumber || phoneNumber.trim().length < 10) {
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const updateResult = await db
      .collection("users")
      .updateOne({ _id: new ObjectId(userId) }, { $set: { phoneNumber } });

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json(
        { error: "Failed to update phone number" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Phone number saved successfully",
    });
  } catch (error) {
    console.error("Error saving phone number:", error);
    return NextResponse.json(
      { error: "Failed to save phone number" },
      { status: 500 }
    );
  }
}

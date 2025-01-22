import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  try {
    const usersCollection = await getCollection("users");

    const blockedUsers = await usersCollection
      .find({ Blocked: true })
      .project({ name: 1, email: 1, Blocked: 1 })
      .toArray();

    return NextResponse.json(blockedUsers);
  } catch (error) {
    console.error("Error fetching blocked users:", error);
    return NextResponse.json({ error: "Failed to fetch blocked users" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId, action }: { userId: string; action: "block" | "unblock" } = await req.json();
    const usersCollection = await getCollection("users");

    const updateResult = await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { Blocked: action === "block" } }
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json({ error: "Failed to update user status" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating user status:", error);
    return NextResponse.json({ error: "Failed to update user status" }, { status: 500 });
  }
}

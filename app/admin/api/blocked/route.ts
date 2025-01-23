import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

const ERROR_MESSAGES = {
  INVALID_USER_ID: "Invalid userId format.",
  INVALID_ACTION: "Invalid action. Action must be 'block' or 'unblock'.",
  USER_NOT_FOUND: "User not found or already updated.",
  SERVER_ERROR: "Failed to update user status.",
  FETCH_ERROR: "Failed to fetch blocked users.",
};

export async function GET(req: NextRequest) {
  try {
    const usersCollection = await getCollection("users");

    const blockedUsers = await usersCollection
      .find({ Blocked: true })
      .project({ name: 1, email: 1, Blocked: 1 })
      .toArray();

    return NextResponse.json(blockedUsers);
  } catch (error) {
    console.error(ERROR_MESSAGES.FETCH_ERROR, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.FETCH_ERROR },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { userId, action }: { userId: string; action: "block" | "unblock" } =
      body;
    if (!userId || !ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.INVALID_USER_ID },
        { status: 400 }
      );
    }
    if (!["block", "unblock"].includes(action)) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.INVALID_ACTION },
        { status: 400 }
      );
    }

    const usersCollection = await getCollection("users");

    const updateResult = await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { Blocked: action === "block" } }
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.USER_NOT_FOUND },
        { status: 404 }
      );
    }

    console.log(
      `User with ID ${userId} has been ${
        action === "block" ? "blocked" : "unblocked"
      }.`
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(ERROR_MESSAGES.SERVER_ERROR, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.SERVER_ERROR },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
  try {
    const {
      email,
      userId,
      block,
    }: { email?: string; userId?: string; block: boolean } =
      await request.json();

    if (!email && !userId) {
      return NextResponse.json(
        { error: "Either 'email' or 'userId' must be provided." },
        { status: 400 }
      );
    }

    const usersCollection = await getCollection("users");

    const query = email ? { email } : { _id: new ObjectId(userId) };

    const result = await usersCollection.updateOne(query, {
      $set: { Blocked: block },
    });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json(
      { message: `User ${block ? "blocked" : "unblocked"} successfully.` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error blocking/unblocking user:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

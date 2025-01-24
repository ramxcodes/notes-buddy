import { NextResponse } from "next/server";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
  try {
    const { noteUrl, issue, otherText, userId, userName, userEmail } =
      await request.json();

    if (!noteUrl || !issue || !userId || !userName || !userEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const usersCollection = await getCollection("users");
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.Blocked) {
      return NextResponse.json(
        { error: "You are blocked by an admin and cannot submit reports." },
        { status: 403 }
      );
    }

    const reportsCollection = await getCollection("reportNotes");

    await reportsCollection.insertOne({
      noteUrl,
      issue,
      otherText,
      userId,
      userName,
      userEmail,
      createdAt: new Date(),
      status: "Pending",
    });

    return NextResponse.json({ message: "Report submitted successfully" });
  } catch (error) {
    console.error("Error submitting report:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

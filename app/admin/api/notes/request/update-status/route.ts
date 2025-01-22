import { NextResponse } from "next/server";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
  try {
    const { requestId, status }: { requestId: string; status: string } = await request.json();

    if (!requestId || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!ObjectId.isValid(requestId)) {
      return NextResponse.json({ error: "Invalid request ID" }, { status: 400 });
    }

    const requestNotesCollection = await getCollection("requestNotes");

    const updateResult = await requestNotesCollection.updateOne(
      { _id: new ObjectId(requestId) },
      { $set: { status } }
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json({ error: "Request not found or already updated" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating request status:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

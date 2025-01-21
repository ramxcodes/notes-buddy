import { NextResponse } from "next/server";
import { getCollection } from "@/lib/db";

export async function POST(request: Request) {
  const {
    university,
    degree,
    year,
    semester,
    subject,
    syllabus,
    phoneNumber,
    userId,
  } = await request.json();

  if (
    !university ||
    !degree ||
    !year ||
    !semester ||
    !subject ||
    !syllabus ||
    !userId ||
    !phoneNumber
  ) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const requestNotesCollection = await getCollection("requestNotes");
    await requestNotesCollection.insertOne({
      university,
      degree,
      year,
      semester,
      subject,
      syllabus,
      phoneNumber,
      userId,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Request successfully saved" });
  } catch (error) {
    console.error("Failed to save request notes:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

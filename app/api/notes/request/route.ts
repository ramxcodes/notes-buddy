import { NextResponse } from "next/server";
import { getCollection } from "@/lib/db";
import { verifyCaptcha } from "@/lib/captcha";
import RequestNotes from "@/models/RequestNotes";

export async function POST(request: Request) {
  const { university, degree, year, semester, subject, syllabus, userId, captchaToken } =
    await request.json();

  // reCAPTCHA validation
  if (process.env.NODE_ENV !== "development") {
    const captchaValid = await verifyCaptcha(captchaToken);
    if (!captchaValid) {
      return NextResponse.json({ error: "Invalid CAPTCHA" }, { status: 400 });
    }
  }

  // Validate required fields
  if (!university || !degree || !year || !semester || !subject || !syllabus || !userId) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  // Save to MongoDB
  try {
    const requestNotesCollection = await getCollection("requestNotes");
    await requestNotesCollection.insertOne({
      university,
      degree,
      year,
      semester,
      subject,
      syllabus,
      userId,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Request successfully saved" });
  } catch (error) {
    console.error("Failed to save request notes:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

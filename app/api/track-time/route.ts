import { NextResponse } from "next/server";
import NoteUsage from "@/models/NoteUsage";

export async function POST(request: Request) {
  try {
    const { noteSlug, userEmail, timeSpent } = await request.json();

    const record = await NoteUsage.findOne({ noteSlug, userEmail }).sort({
      viewedAt: -1,
    });
    if (record) {
      record.timeSpent = timeSpent;
      await record.save();
    } else {
      await NoteUsage.create({ noteSlug, userEmail, timeSpent });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.error();
  }
}

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import NoteUsage from "@/models/NoteUsage";

export async function GET() {
  await connectToDatabase();

  const totalUsageRecords = await NoteUsage.countDocuments({});
  const distinctSlugs = await NoteUsage.distinct("noteSlug");

  const [top] = await NoteUsage.aggregate([
    { $group: { _id: "$noteSlug", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 1 },
  ]);

  return NextResponse.json({
    totalUsageRecords,
    distinctSlugs: distinctSlugs.length,
    topSlug: top?._id ?? null,
    topCount: top?.count ?? 0,
  });
}

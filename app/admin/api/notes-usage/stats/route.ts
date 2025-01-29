import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import NoteUsage from "@/models/NoteUsage";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  await connectToDatabase();

  const totalUsageRecords = await NoteUsage.countDocuments({});
  const distinctSlugs = await NoteUsage.distinct("noteSlug");

  const [top] = await NoteUsage.aggregate([
    { $group: { _id: "$noteSlug", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 1 },
  ]);

  return new NextResponse(
    JSON.stringify({
      totalUsageRecords,
      distinctSlugs: distinctSlugs.length,
      topSlug: top?._id ?? null,
      topCount: top?.count ?? 0,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Expires: "0",
        Pragma: "no-cache",
      },
    }
  );
}

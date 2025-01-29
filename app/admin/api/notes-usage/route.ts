import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import NoteUsage from "@/models/NoteUsage";

export async function GET() {
  await connectToDatabase();

  const usageStats = await NoteUsage.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userEmail",
        foreignField: "email",
        as: "userDoc",
      },
    },
    {
      $unwind: {
        path: "$userDoc",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$noteSlug",
        totalViews: { $sum: 1 },
        lastViewed: { $max: "$viewedAt" },
        userEntries: {
          $push: {
            email: "$userEmail",
            planTier: "$userDoc.planTier",
            isBlocked: "$userDoc.Blocked",
            viewedAt: "$viewedAt",
            ip: "$ip",
          },
        },
      },
    },
    { $sort: { totalViews: -1 } },
  ]);

  const finalStats = usageStats.map((doc: any) => {
    const slugParts = doc._id.split("/");
    const [university, degree, year, semester, subject, unit] = slugParts;

    let anonymousCount = 0;
    let verifiedCount = 0;
    let premiumCount = 0;
    let freeCount = 0;

    doc.userEntries.forEach((entry: any) => {
      if (!entry.email) {
        anonymousCount++;
      } else {
        verifiedCount++;
        if (entry.planTier && entry.planTier !== "Free") {
          premiumCount++;
        } else {
          freeCount++;
        }
      }
    });

    return {
      noteSlug: doc._id,
      totalViews: doc.totalViews,
      lastViewed: doc.lastViewed,
      userEntries: doc.userEntries,
      anonymousCount,
      verifiedCount,
      premiumCount,
      freeCount,
      university: university || "",
      degree: degree || "",
      year: year || "",
      semester: semester || "",
      subject: subject || "",
      unit: unit || "",
      noteLink: `${process.env.NEXTAUTH_URL || "http://notesbuddy.in"}/notes/${
        doc._id
      }`,
    };
  });

  return NextResponse.json(finalStats);
}

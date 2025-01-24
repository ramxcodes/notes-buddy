import { NextResponse } from "next/server";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const ERROR_MESSAGES = {
  SERVER_ERROR: "Failed to fetch notes requests.",
  INVALID_OBJECT_ID: "Invalid userId format in requestNotes.",
};

export async function GET() {
  try {
    const requestNotesCollection = await getCollection("requestNotes");

    const notesRequests = await requestNotesCollection
      .aggregate([
        {
          $match: {
            userId: { $exists: true, $ne: null },
          },
        },
        {
          $addFields: {
            userId: {
              $cond: {
                if: {
                  $regexMatch: { input: "$userId", regex: /^[a-f\d]{24}$/i },
                },
                then: { $toObjectId: "$userId" },
                else: null,
              },
            },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: {
            path: "$user",
            preserveNullAndEmptyArrays: false,
          },
        },
        {
          $project: {
            _id: 1,
            university: 1,
            degree: 1,
            year: 1,
            semester: 1,
            subject: 1,
            syllabus: 1,
            phoneNumber: 1,
            status: { $ifNull: ["$status", "Pending"] },
            createdAt: 1,
            user: {
              name: "$user.name",
              email: "$user.email",
            },
          },
        },
        {
          $sort: { createdAt: -1 },
        },
      ])
      .toArray();

    return NextResponse.json(notesRequests, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Expires: "0",
        Pragma: "no-cache",
      },
    });
  } catch (error) {
    if ((error as any).code === 121) {
      console.error(ERROR_MESSAGES.INVALID_OBJECT_ID, error);
    } else {
      console.error(ERROR_MESSAGES.SERVER_ERROR, error);
    }
    return NextResponse.json(
      { error: ERROR_MESSAGES.SERVER_ERROR },
      { status: 500 }
    );
  }
}

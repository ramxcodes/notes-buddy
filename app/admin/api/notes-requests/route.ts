import { NextResponse } from "next/server";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

// Constants for error messages
const ERROR_MESSAGES = {
  SERVER_ERROR: "Failed to fetch notes requests.",
};

export async function GET() {
  try {
    const requestNotesCollection = await getCollection("requestNotes");

    const notesRequests = await requestNotesCollection
      .aggregate([
        {
          $addFields: {
            userId: { $toObjectId: "$userId" }, // Convert userId to ObjectId
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
        { $unwind: "$user" },
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
      ])
      .toArray();

    return NextResponse.json(notesRequests, { status: 200 });
  } catch (error) {
    console.error(ERROR_MESSAGES.SERVER_ERROR, error);
    return NextResponse.json({ error: ERROR_MESSAGES.SERVER_ERROR }, { status: 500 });
  }
}

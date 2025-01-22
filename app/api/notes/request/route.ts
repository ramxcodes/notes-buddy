import { NextResponse } from "next/server";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

// Constants for error messages and status codes
const ERROR_MESSAGES = {
  MISSING_FIELDS: "All fields are required.",
  USER_NOT_FOUND: "User not found.",
  USER_BLOCKED: "You are blocked by an admin from submitting requests.",
  INVALID_USER_ID: "Invalid user ID format.",
  SERVER_ERROR: "Internal server error.",
};
const SUCCESS_MESSAGE = "Request successfully saved.";

// Utility function for validating required fields
function validateFields(
  data: Record<string, any>,
  requiredFields: string[]
): string[] {
  return requiredFields.filter((field) => !data[field]);
}

// Utility function to validate ObjectId
function isValidObjectId(id: string): boolean {
  return ObjectId.isValid(id);
}

export async function POST(request: Request) {
  try {
    // Parse and validate the request body
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

    const requiredFields = [
      "university",
      "degree",
      "year",
      "semester",
      "subject",
      "syllabus",
      "phoneNumber",
      "userId",
    ];

    const missingFields = validateFields(
      {
        university,
        degree,
        year,
        semester,
        subject,
        syllabus,
        phoneNumber,
        userId,
      },
      requiredFields
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: `${ERROR_MESSAGES.MISSING_FIELDS}: ${missingFields.join(
            ", "
          )}`,
        },
        { status: 400 }
      );
    }

    if (!isValidObjectId(userId)) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.INVALID_USER_ID },
        { status: 400 }
      );
    }

    // Check if the user exists and their BLOCKED status
    const usersCollection = await getCollection("users");
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.USER_NOT_FOUND },
        { status: 404 }
      );
    }

    if (user.BLOCKED === true) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.USER_BLOCKED },
        { status: 403 }
      );
    }

    // Save the request in the requestNotes collection
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

    return NextResponse.json({ message: SUCCESS_MESSAGE }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to save request notes:", error.message);
    } else {
      console.error("Failed to save request notes:", error);
    }
    return NextResponse.json(
      { error: ERROR_MESSAGES.SERVER_ERROR },
      { status: 500 }
    );
  }
}

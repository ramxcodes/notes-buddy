import { NextResponse } from "next/server";
import { getCollection } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    // Fetch the server session
    const session = await getServerSession(authOptions);

    // If no session is found, the user is not blocked
    if (!session) {
      return NextResponse.json({ blocked: false }, { status: 200 });
    }

    // Validate session email
    const userEmail = session.user?.email;
    if (!userEmail) {
      return NextResponse.json(
        { error: "Invalid session data." },
        { status: 400 }
      );
    }

    // Query the database to check if the user is blocked
    const usersCollection = await getCollection("users");
    const user = await usersCollection.findOne({ email: userEmail });

    // Return the blocked status
    return NextResponse.json({ blocked: !!user?.Blocked }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to check blocked status:", error.message);
    } else {
      console.error("Failed to check blocked status:", error);
    }
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

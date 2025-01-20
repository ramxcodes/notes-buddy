import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const userId = session.user?.id;

  if (!userId) {
    return NextResponse.json({ error: "User ID not found in session" }, { status: 400 });
  }

  try {
    // Connect to the database
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB); // Use the database name from environment variables
    const usersCollection = db.collection("users");

    // Fetch the user's subscription tier from the database
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedPlanTier = user.planTier || "Free"; // Default to "Free" if not found

    return NextResponse.json({
      message: "JWT Updated",
      updatedPlanTier,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const usersCollection = await getCollection("users");

    const users = await usersCollection
      .find({})
      .project({
        name: 1,
        email: 1,
        planTier: 1,
        university: 1,
        degree: 1,
        year: 1,
        semesters: 1,
        subscriptionStartDate: 1,
        subscriptionEndDate: 1,
        Blocked: 1,
        phoneNumber: 1,
        image: 1,
      })
      .toArray();

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

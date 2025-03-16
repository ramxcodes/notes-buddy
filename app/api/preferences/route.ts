import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Preference from "@/models/Preference";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  await connectToDatabase();

  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json(
      { message: "Not authenticated. Please log in." },
      { status: 401 }
    );
  }
  const userId = session.user.id as string;
  try {
    const pref = await Preference.findOne({ user: userId });
    return NextResponse.json(pref);
  } catch (error) {
    return NextResponse.json(
      { message: "Error retrieving preference", error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  await connectToDatabase();

  const body = await request.json();
  const { university, degree, semester } = body;
  if (!university || !degree || !semester) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json(
      { message: "Not authenticated. Please log in." },
      { status: 401 }
    );
  }
  const userId = session.user.id as string;
  try {
    const updatedPref = await Preference.findOneAndUpdate(
      { user: userId },
      { university, degree, semester },
      { new: true, upsert: true }
    );
    return NextResponse.json(updatedPref);
  } catch (error) {
    return NextResponse.json(
      { message: "Error saving preference", error },
      { status: 500 }
    );
  }
}

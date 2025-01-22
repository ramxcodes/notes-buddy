import { NextResponse } from "next/server";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const reportsCollection = await getCollection("reportNotes");

    const reports = await reportsCollection.find({}).toArray();

    return NextResponse.json(reports, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch notes reports:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { reportId, status }: { reportId: string; status: string } =
      await request.json();

    if (!ObjectId.isValid(reportId)) {
      return NextResponse.json({ error: "Invalid Report ID" }, { status: 400 });
    }

    const reportsCollection = await getCollection("reportNotes");
    const updateResult = await reportsCollection.updateOne(
      { _id: new ObjectId(reportId) },
      { $set: { status } }
    );

    if (updateResult.matchedCount === 0) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Failed to update report status:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

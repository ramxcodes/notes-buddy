import { NextResponse } from "next/server";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const ERROR_MESSAGES = {
  INVALID_REPORT_ID: "Invalid Report ID.",
  INVALID_STATUS:
    "Invalid status value. Allowed values are 'Pending', 'In Progress', 'Completed', 'Rejected'.",
  REPORT_NOT_FOUND: "Report not found.",
  FETCH_ERROR: "Failed to fetch notes reports.",
  UPDATE_ERROR: "Failed to update report status.",
};

const ALLOWED_STATUSES = ["Pending", "In Progress", "Completed", "Rejected"];

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const statusFilter = url.searchParams.get("status");

    const reportsCollection = await getCollection("reportNotes");
    const query = statusFilter ? { status: statusFilter } : {};

    const reports = await reportsCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return new NextResponse(JSON.stringify(reports), {
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
    console.error(ERROR_MESSAGES.FETCH_ERROR, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.FETCH_ERROR },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { reportId, status }: { reportId: string; status: string } =
      await request.json();

    if (!ObjectId.isValid(reportId)) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.INVALID_REPORT_ID },
        { status: 400 }
      );
    }

    if (!ALLOWED_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.INVALID_STATUS },
        { status: 400 }
      );
    }

    const reportsCollection = await getCollection("reportNotes");
    const updateResult = await reportsCollection.updateOne(
      { _id: new ObjectId(reportId) },
      { $set: { status } }
    );

    if (updateResult.matchedCount === 0) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.REPORT_NOT_FOUND },
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify({ success: true }), {
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
    console.error(ERROR_MESSAGES.UPDATE_ERROR, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.UPDATE_ERROR },
      { status: 500 }
    );
  }
}

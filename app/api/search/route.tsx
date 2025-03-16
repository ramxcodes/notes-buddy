import { NextRequest, NextResponse } from "next/server";
import Fuse from "fuse.js";
import { getAllNotesVelite } from "@/lib/getNotesJson";

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();
    if (!query || query.trim() === "") {
      return NextResponse.json([]);
    }

    const notes = await getAllNotesVelite();

    const fuse = new Fuse(notes, {
      keys: [
        { name: "title", weight: 0.5 },
        { name: "desc", weight: 0.3 },
        { name: "body", weight: 0.2 },
      ],
      threshold: 0.4,
    });

    const results = fuse.search(query);
    const filteredNotes = results.map((result) => result.item);
    return NextResponse.json(filteredNotes.slice(0, 10));
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json([]);
  }
}

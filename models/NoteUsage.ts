import { Schema, model, models } from "mongoose";
import { connectToDatabase } from "@/lib/db";

connectToDatabase();

const NoteUsageSchema = new Schema({
  noteSlug: { type: String, required: true },
  userEmail: { type: String, default: null },
  ip: { type: String, default: null },
  viewedAt: { type: Date, default: Date.now },
});

const NoteUsage = models.NoteUsage || model("NoteUsage", NoteUsageSchema);
export default NoteUsage;

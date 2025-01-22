import { Schema, model, models } from "mongoose";

const ReportNoteSchema = new Schema({
  noteUrl: { type: String, required: true },
  issue: { type: String, required: true },
  otherText: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ReportNote = models.ReportNote || model("ReportNote", ReportNoteSchema);

export default ReportNote;

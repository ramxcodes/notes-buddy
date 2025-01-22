import { Schema, model, models } from "mongoose";

const RequestNotesSchema = new Schema({
  university: { type: String, required: true },
  degree: { type: String, required: true },
  year: { type: Number, required: true },
  semester: { type: String, required: true },
  subject: { type: String, required: true },
  syllabus: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "In Progress", "Completed", "Rejected"],
  },
  createdAt: { type: Date, default: Date.now },
});

const RequestNotes =
  models.RequestNotes || model("RequestNotes", RequestNotesSchema);

export default RequestNotes;

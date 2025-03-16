import { Schema, model, models, Document } from "mongoose";
import { connectToDatabase } from "@/lib/db";

connectToDatabase();
export interface IPreference extends Document {
  user: string;
  university: string;
  degree: string;
  semester: string;
  createdAt: Date;
  updatedAt: Date;
}

const PreferenceSchema = new Schema<IPreference>(
  {
    user: { type: String, required: true, unique: true },
    university: { type: String, required: true },
    degree: { type: String, required: true },
    semester: { type: String, required: true },
  },
  { timestamps: true }
);

const Preference = models.Preference || model<IPreference>("Preference", PreferenceSchema);

export default Preference;

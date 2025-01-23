import { Schema, model, models } from "mongoose";
import { connectToDatabase } from "@/lib/db";

connectToDatabase();

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  university: { type: String, required: false },
  degree: { type: String, required: false },
  planTier: { type: String, default: "Free" },
  Blocked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const User = models.User || model("User", UserSchema);

export default User;

import { MongoClient } from "mongodb";
import mongoose from "mongoose";

const uri = process.env.MONGO_URI as string;

if (!uri) {
  throw new Error(
    "Please define the MONGO_URI environment variable in your .env.local file."
  );
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

let isConnected = false;

if (process.env.NODE_ENV === "development") {
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;

export async function getCollection(collectionName: string) {
  const client = await clientPromise;

  const dbName = process.env.MONGODB_DB || "notesbuddy";
  const db = client.db(dbName);

  return db.collection(collectionName);
}

export async function connectToDatabase() {
  if (isConnected) return;

  try {
    await mongoose.connect(uri, {
      dbName: process.env.MONGODB_DB || "notesbuddy",
    });
    isConnected = true;
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw new Error("Failed to connect to database.");
  }
}

export async function isUserBlocked(email: string): Promise<boolean> {
  const usersCollection = await getCollection("users");
  const user = await usersCollection.findOne({ email });
  return user?.Blocked ?? false;
}

export async function getAdminStats() {
  const usersCollection = await getCollection("users");
  const paymentsCollection = await getCollection("payments");

  const totalUsers = await usersCollection.countDocuments();
  const premiumUsers = await usersCollection.countDocuments({
    isPremium: true,
  });
  const blockedUsers = await usersCollection.countDocuments({ Blocked: true });
  const totalRevenue = await paymentsCollection
    .aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }])
    .toArray();

  return {
    totalUsers,
    premiumUsers,
    blockedUsers,
    totalRevenue: totalRevenue[0]?.total || 0,
  };
}

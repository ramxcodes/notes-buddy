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

let isConnected = false; // For Mongoose connection tracking

// MongoClient connection for direct queries
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

// Helper to get a collection
export async function getCollection(collectionName: string) {
  const client = await clientPromise;

  const dbName = process.env.MONGODB_DB || "notesbuddy";
  const db = client.db(dbName);

  console.log(`Accessing collection: ${collectionName} in database: ${dbName}`);
  return db.collection(collectionName);
}

// Mongoose connection setup
export async function connectToDatabase() {
  if (isConnected) return;

  try {
    await mongoose.connect(uri, {
      dbName: process.env.MONGODB_DB || "notesbuddy",
    });
    isConnected = true;
    console.log(
      `Connected to database: ${process.env.MONGODB_DB || "notesbuddy"}`
    );
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw new Error("Failed to connect to database.");
  }
}

// Additional utilities
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

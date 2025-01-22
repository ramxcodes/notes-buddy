import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI as string;

if (!uri) {
  throw new Error(
    "Please define the MONGO_URI environment variable in your .env.local file."
  );
}

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
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

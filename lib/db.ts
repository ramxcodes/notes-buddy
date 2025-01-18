import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI as string;

if (!uri) {
  throw new Error("Please define the MONGO_URI environment variable in your .env.local file.");
}

declare global {
  // Ensure that `global._mongoClientPromise` is typed correctly
  var _mongoClientPromise: Promise<MongoClient>;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development, use a global variable to preserve value across module reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new client for each process
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;

/**
 * Fetches a MongoDB collection by name
 * @param collectionName - The name of the collection
 */
export async function getCollection(collectionName: string) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB); // Use the database name from the environment variable
  return db.collection(collectionName);
}

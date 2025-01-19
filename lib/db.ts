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

/**
 * Fetches a MongoDB collection by name
 * @param collectionName - The name of the collection
 */
export async function getCollection(collectionName: string) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  return db.collection(collectionName);
}

import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || "";

let db = null;

export async function connectToDB() {
  if (db) return db;

  try {
    const mongoClient = new MongoClient(MONGODB_URI);
    console.log("[mongoDB] Connecting to MongoDB Atlas cluster...");
    await mongoClient.connect();
    console.log("[mongoDB] Successfully connected to MongoDB Atlas!");

    db = mongoClient.db("RockarDB");
    return db;
  } catch (error) {
    console.error("[mongoDB] Connection to MongoDB Atlas failed!", error);
    process.exit();
  }
}

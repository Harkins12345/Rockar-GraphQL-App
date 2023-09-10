import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || "";

export async function connectToDB() {
  try {
    const mongoClient = new MongoClient(MONGODB_URI);
    console.log("[mongoDB] Connecting to MongoDB Atlas cluster...");
    await mongoClient.connect();
    console.log("[mongoDB] Successfully connected to MongoDB Atlas!");

    return mongoClient.db("RockarDB");
  } catch (error) {
    console.error("[mongoDB] Connection to MongoDB Atlas failed!", error);
    process.exit();
  }
}

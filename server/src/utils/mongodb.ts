import { MongoClient } from "mongodb";

export async function connectToCluster(uri: string) {
  let mongoClient;

  try {
    mongoClient = new MongoClient(uri);
    console.log("[mongoDB] Connecting to MongoDB Atlas cluster...");
    await mongoClient.connect();
    console.log("[mongoDB] Successfully connected to MongoDB Atlas!");

    return mongoClient;
  } catch (error) {
    console.error("[mongoDB] Connection to MongoDB Atlas failed!", error);
    process.exit();
  }
}

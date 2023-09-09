import express, { Application } from "express";
import { graphqlHTTP } from "express-graphql";
import dotenv from "dotenv";
import { connectToCluster } from "./utils";
import schema from "./schema/schema";

dotenv.config();

// Grab port and MongoDB credentials from .env
const PORT = process.env.PORT || 8000;
const MONGODB_USERNAME = process.env.MONGODB_USERNAME || "";
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || "";
const MONGODB_CLUSTER = process.env.MONGODB_CLUSTER || "";

// Create and connect to MongoDB URI
const mongoDBURI = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}.mongodb.net/`;
connectToCluster(mongoDBURI);

//Start Express Server
const app: Application = express();

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(3000, () => {
  console.log(`[server] Server running at http://localhost:${PORT}`);
});

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./graphql/schema.ts";
import { resolvers } from "./graphql/resolvers.ts";
import dotenv from "dotenv";

dotenv.config();

// Grab port from .env
const PORT = Number(process.env.PORT) || 8000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start Apollo Server
const { url } = await startStandaloneServer(server, {
  listen: { port: PORT },
});

console.log(`[server] Server ready at: ${url}`);

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema/schema.js";
import { resolvers } from "./schema/resolvers.js";

// Grab port from .env
const PORT = Number(process.env.PORT) || 8000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: PORT },
});

console.log(`Server ready at: ${url}`);

import express, { Application } from "express";
import { graphqlHTTP } from "express-graphql";
import dotenv from "dotenv";
import schema from "./schema/schema";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8000;

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(3000, () => {
  console.log(`[server]: Server running at http://localhost:${PORT}`);
});

import { connectToDB } from "../utils/mongodb.js";

export const resolvers = {
  Query: {
    products: async () => {
      const db = await connectToDB();
      return db.collection("Products").find().toArray();
    },
  },
};

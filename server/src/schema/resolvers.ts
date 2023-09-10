import { connectToDB } from "../utils/mongodb.js";

export const resolvers = {
  Query: {
    products: async () => {
      const db = await connectToDB();
      return db.collection("Products").find().toArray();
    },
    product: async (_, { vin }) => {
      const db = await connectToDB();
      console.log(await db.collection("Products").findOne({ vin: vin }));
      return db.collection("Products").findOne({ vin: vin });
    },
  },
};

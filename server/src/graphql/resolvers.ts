import { connectToDB } from "../utils/mongodb.js";

const db = await connectToDB();

export const resolvers = {
  Query: {
    products: async () => {
      return db.collection("Products").find().toArray();
    },
    product: async (_, { vin }) => {
      return db.collection("Products").findOne({ vin });
    },
    customers: async (_, args) => {
      return db
        .collection("Customers")
        .find({ ...args })
        .toArray();
    },
    customer: async (_, { email }) => {
      return db.collection("Customers").findOne({ email });
    },
  },
};

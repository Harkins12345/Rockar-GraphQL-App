import { MongoDBQuery } from "./mongodbQuery.js";
import { connectToDB } from "./mongodbConnect.js";
import { QueryArgs } from "./types.js";

const enableCSVRead = process.env.ENABLE_CSV_READ.toLowerCase() == "true";

// Handle whether to read CSV or MongoDB
export const queryHandler = async (
  args: QueryArgs,
  collection: string,
  singleItem: boolean
) => {
  // If ENABLE_CSV_READ set to false in .env
  // Execute MongoDB query
  if (!enableCSVRead) {
    const db = await connectToDB();
    const query = new MongoDBQuery(args, db);
    if (collection === "Products") {
      if (singleItem) {
        return await query.getProduct();
      } else {
        return await query.getProducts();
      }
    } else if (collection === "Customers") {
      if (singleItem) {
        return await query.getCustomer();
      } else {
        return await query.getCustomers();
      }
    }
  }
};

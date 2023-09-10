import { MongoDBQuery } from "./mongodbQuery.js";
import { connectToDB } from "./mongodbConnect.js";
import { QueryArgs } from "./types.js";

const enableCSVRead = process.env.ENABLE_CSV_READ.toLowerCase() == "true";

export const queryHandler = async (
  args: QueryArgs,
  collection: string,
  singleItem: boolean
) => {
  if (!enableCSVRead) {
    const db = await connectToDB();
    const query = new MongoDBQuery(args, db);
    if (collection === "Products") {
      if (singleItem) {
        return query.getProduct();
      } else {
        return query.getProducts();
      }
    } else if (collection === "Customers") {
      if (singleItem) {
        return query.getCustomer();
      } else {
        return query.getCustomers();
      }
    }
  }
};

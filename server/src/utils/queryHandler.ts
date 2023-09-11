import { MongoDBQuery } from "./mongodbQuery.js";
import { CSVReadQuery } from "./csvReadQuery.js";
import { connectToDB } from "./mongodbConnect.js";
import { QueryArgs, QueryResult } from "./types.js";

const enableCSVRead = process.env.ENABLE_CSV_READ.toLowerCase() == "true";

/**
 * Handles which query to use depending on the .env variable ENABLE_CSV_READ.
 *
 * @param {QueryArgs} args - The GraphQL query arguments.
 * @param {string} collection - The collection to target i.e Products or Customers.
 * @returns {QueryResult} The un/filtered query results.
 */
export const queryHandler = async (
  args: QueryArgs,
  collection: string,
  singleItem: boolean
) => {
  // If ENABLE_CSV_READ set to false in .env
  // Execute MongoDB query
  // Else execute CSV query
  let query: MongoDBQuery | CSVReadQuery;
  if (!enableCSVRead) {
    const db = await connectToDB();
    query = new MongoDBQuery(args, db);
  } else if (enableCSVRead) {
    query = new CSVReadQuery(args);
  }
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
};

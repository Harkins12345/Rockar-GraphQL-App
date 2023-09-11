import { MongoDBQuery } from "./mongodbQuery.ts";
import { CSVReadQuery } from "./csvReadQuery.ts";
import { connectToDB } from "./mongodbConnect.ts";
import { QueryArgs, QueryResult } from "./types.ts";

// CSV file path must be relative to working directory
// e.g. "./data/customer.csv"
const CSV_FILE_PATH = process.env.CSV_FILE_PATH;

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
  if (!CSV_FILE_PATH) {
    const db = await connectToDB();
    query = new MongoDBQuery(args, db);
  } else if (CSV_FILE_PATH) {
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

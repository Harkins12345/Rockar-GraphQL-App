import fs from "fs";
import csv from "csv-parser";
import { QueryArgs, QueryResults } from "./types";

/**
 * Used to query CSV files
 */
export class CSVReadQuery {
  args: QueryArgs;
  results: [string] | [];

  /**
   * Create a new User instance.
   * @param {QueryArgs} args - Query arguments for filtering results.
   */
  constructor(args: QueryArgs) {
    this.args = args;
  }

  /**
   * Reading CSV rows into array of objects.
   * @param {string} csvFilePath - File path to CSV file - relative to working directory.
   */
  private readCSV = async (csvFilePath: string): Promise<QueryResults[]> => {
    const results = [];
    return new Promise<QueryArgs[]>((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => {
          resolve(results);
        });
    });
  };

  /**
   * Filter results of the CSV according to the Query Args.
   * @param {QueryResults[]} results - File path to CSV file - relative to working directory.
   * @returns {QueryResults[]} - Filtered query results
   */
  private filterResults = (results: QueryResults[]): QueryResults[] =>
    results.filter((result) => {
      for (const key in this.args) {
        if (
          this.args[key] !== undefined &&
          result[key] !== undefined &&
          result[key] === this.args[key]
        ) {
          return true;
        }
      }
      return false;
    });

  /**
   * Get all products according to query argument filters
   * Get's all products with no arguments provided.
   * @returns {QueryResults[]} - Filtered query results
   */
  public getProducts = async () => {
    const results = await this.readCSV("./data/product.csv");
    if (!Object.keys(this.args).length) {
      return results;
    } else {
      return this.filterResults(results);
    }
  };

  /**
   * Get's a single product with a matching VIN number.
   * @returns {QueryResults} - Filtered query result
   */
  public getProduct = async () => {
    const results = await this.readCSV("./data/product.csv");
    return results.filter((result) => result.vin === this.args.vin);
  };

  /**
   * Get all customers' details according to query argument filters
   * Get's all customers' details with no arguments provided.
   * @returns {QueryResults[]} - Filtered query results
   */
  public getCustomers = async () => {
    const results = await this.readCSV("./data/customer.csv");
    if (!Object.keys(this.args).length) {
      return results;
    } else {
      return this.filterResults(results);
    }
  };

  /**
   * Get's a single customer's details with a matching email.
   * @returns {QueryResults} - Filtered query result
   */
  public getCustomer = async () => {
    const results = await this.readCSV("./data/customer.csv");
    return results.filter((result) => result.email === this.args.email);
  };
}

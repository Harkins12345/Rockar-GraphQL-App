import fs from "fs";
import csv from "csv-parser";
import { QueryArgs, QueryResult } from "./types";

/**
 * Used to query CSV files
 */
export class CSVReadQuery {
  args: QueryArgs;
  csvFilePath: string;

  /**
   * Create a new CSV Query instance.
   * @param {QueryArgs} args - Query arguments for filtering results.
   * @param {string} csvFilePath - Path to folder containing CSV files.
   */
  constructor(args: QueryArgs, csvFilePath: string) {
    this.args = args;
    this.csvFilePath = csvFilePath;
  }

  /**
   * Reading CSV rows into array of objects.
   * @param {string} csvFilePath - File path to CSV file - relative to working directory.
   */
  private readCSV = async (csvFilePath: string): Promise<QueryResult[]> => {
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
   * @param {QueryResult[]} results - File path to CSV file - relative to working directory.
   * @returns {QueryResult[]} - Filtered query results
   */
  private filterResults = (results: QueryResult[]): QueryResult[] =>
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
   * @returns {QueryResult[]} - Filtered query results
   */
  public getProducts = async () => {
    const results = await this.readCSV(`${this.csvFilePath}/product.csv`);
    if (!Object.keys(this.args).length) {
      return results;
    } else {
      return this.filterResults(results);
    }
  };

  /**
   * Get's a single product with a matching VIN number.
   * @returns {QueryResult} - Filtered query result
   */
  public getProduct = async () => {
    const results = await this.readCSV(`${this.csvFilePath}/product.csv`);
    return results.filter((result) => result.vin === this.args.vin)[0];
  };

  /**
   * Get all customers' details according to query argument filters
   * Get's all customers' details with no arguments provided.
   * @returns {QueryResult[]} - Filtered query results
   */
  public getCustomers = async () => {
    const results = await this.readCSV(`${this.csvFilePath}/customer.csv`);
    if (!Object.keys(this.args).length) {
      return results;
    } else {
      return this.filterResults(results);
    }
  };

  /**
   * Get's a single customer's details with a matching email.
   * @returns {QueryResult} - Filtered query result
   */
  public getCustomer = async () => {
    const results = await this.readCSV(`${this.csvFilePath}/customer.csv`);
    return results.filter((result) => result.email !== this.args.email)[0];
  };
}

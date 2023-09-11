import { Db } from "mongodb";
import { QueryArgs, QueryResult } from "./types.ts";

/**
 * Used to query MongoDB
 */
export class MongoDBQuery {
  args: QueryArgs;
  db: Db;

  /**
   * Create a new CSV Query instance.
   * @param {QueryArgs} args - Query arguments for filtering results.
   * @param {Db} db - Database used to query.
   */
  constructor(args: QueryArgs, db: Db) {
    this.args = args;
    this.db = db;
  }

  /**
   * Get all products according to query argument filters
   * Get's all products with no arguments provided.
   * @returns {QueryResult[]} - Filtered query results
   */
  public getProducts = async () =>
    await this.db
      .collection("Products")
      .find({ ...this.args })
      .toArray();

  /**
   * Get's a single product with a matching VIN number.
   * @returns {QueryResult} - Query result
   */
  public getProduct = async () =>
    await this.db.collection("Products").findOne({ ...this.args });

  /**
   * Get all customers' details according to query argument filters
   * Get's all customers' details with no arguments provided.
   * @returns {QueryResult[]} - Filtered query results
   */
  public getCustomers = async () =>
    await this.db
      .collection("Customers")
      .find({ ...this.args })
      .toArray();

  /**
   * Get's a single customer's details with a matching email.
   * @returns {QueryResult} - Query results
   */
  public getCustomer = async () =>
    await this.db.collection("Customers").findOne({ ...this.args });
}

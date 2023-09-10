import { Db } from "mongodb";
import { QueryArgs } from "./types.js";

export class MongoDBQuery {
  args: QueryArgs;
  db: Db;
  constructor(args: QueryArgs, db: Db) {
    this.args = args;
    this.db = db;
  }

  public getProducts = async () =>
    await this.db
      .collection("Products")
      .find({ ...this.args })
      .toArray();

  public getProduct = async () =>
    await this.db.collection("Products").findOne({ ...this.args });

  public getCustomers = async () =>
    await this.db
      .collection("Customers")
      .find({ ...this.args })
      .toArray();

  public getCustomer = async () =>
    await this.db.collection("Customers").findOne({ ...this.args });
}

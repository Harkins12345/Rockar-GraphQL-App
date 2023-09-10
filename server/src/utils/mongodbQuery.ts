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
    this.db
      .collection("Products")
      .find({ ...this.args })
      .toArray();

  public getProduct = async () =>
    this.db.collection("Products").findOne({ ...this.args });

  public getCustomers = async () =>
    this.db
      .collection("Customers")
      .find({ ...this.args })
      .toArray();

  public getCustomer = async () =>
    this.db.collection("Customers").findOne({ ...this.args });
}

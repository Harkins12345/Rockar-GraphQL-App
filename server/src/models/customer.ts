import { ObjectId } from "mongodb";

export default class Product {
  constructor(
    public email: string,
    public forename: string,
    public surname: string,
    public contact_number: string,
    public postcode: string,
    public id?: ObjectId
  ) {}
}

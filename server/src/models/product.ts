import { ObjectId } from "mongodb";

export default class Product {
  constructor(
    public vin: string,
    public colour: string,
    public model: string,
    public make: string,
    public price: number,
    public id?: ObjectId
  ) {}
}

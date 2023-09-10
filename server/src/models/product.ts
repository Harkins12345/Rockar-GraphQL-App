import { ObjectId } from "mongodb";

export class Product {
  constructor(
    public vin: string,
    public colour: string,
    public model: string,
    public make: string,
    public price: number,
    public id?: ObjectId
  ) {}
}

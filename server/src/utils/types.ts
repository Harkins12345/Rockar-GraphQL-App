export interface CustomersArgs {
  email?: String;
  forename?: String;
  surname?: String;
  contact_number?: String;
  postcode?: String;
}

export interface ProductArgs {
  vin?: String;
  colour?: String;
  model?: String;
  make?: String;
  price?: Number;
}

export type QueryArgs = CustomersArgs | ProductArgs;

export const typeDefs = `#graphql
    type Product {
      vin: String!
      colour: String!
      model: String!
      make: String!
      price: Int!
    }
    type Customer {
      email: String!
      forename: String!
      surname: String!
      contact_number: String!
      postcode: String!
    }
    type Query {
      products: [Product]
      product(vin: String!): Product
      customers(email: String, 
                forename: String, 
                surname: String, 
                contact_number: String, 
                postcode: String): [Customer]
      customer(email: String!): Customer
    }
`;

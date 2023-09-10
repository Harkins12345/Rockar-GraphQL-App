export const typeDefs = `#graphql
    type Product {
      vin: ID!
      colour: String!
      model: String!
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
    }
`;

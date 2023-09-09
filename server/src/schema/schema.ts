import graphql, {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
} from "graphql";

const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    vin: { type: GraphQLID },
    colour: { type: GraphQLString },
    model: { type: GraphQLString },
    price: { type: GraphQLInt },
  }),
});

const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    email: { type: GraphQLString },
    forename: { type: GraphQLString },
    surname: { type: GraphQLString },
    contact_number: { type: GraphQLString },
    postcode: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    product: {
      type: ProductType,
      args: { vin: { type: GraphQLID } },
      resolve(parent, args) {},
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {},
    },
    customer: {
      type: CustomerType,
      args: { email: { type: GraphQLString } },
      resolve(parent, args) {},
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
});

import { ProductArgs, CustomersArgs } from "../utils/types.js";
import { queryHandler } from "../utils/queryHandler.js";

// Set up GraphQL resolvers
export const resolvers = {
  Query: {
    products: async (_, args: ProductArgs) => {
      return await queryHandler(args, "Products", false);
    },
    product: async (_, args: ProductArgs) => {
      return await queryHandler(args, "Products", true);
    },
    customers: async (_, args: CustomersArgs) => {
      return await queryHandler(args, "Customers", false);
    },
    customer: async (_, args: CustomersArgs) => {
      return await queryHandler(args, "Customers", true);
    },
  },
};

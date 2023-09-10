import { ProductArgs, CustomersArgs } from "../utils/types.js";
import { queryHandler } from "../utils/queryHandler.js";

export const resolvers = {
  Query: {
    products: async (_, args: ProductArgs) => {
      return queryHandler(args, "Products", false);
    },
    product: async (_, args: ProductArgs) => {
      return queryHandler(args, "Products", true);
    },
    customers: async (_, args: CustomersArgs) => {
      return queryHandler(args, "Customers", false);
    },
    customer: async (_, args: CustomersArgs) => {
      return queryHandler(args, "Customers", true);
    },
  },
};

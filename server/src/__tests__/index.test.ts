import { ApolloServer } from "@apollo/server";
import { typeDefs } from "../graphql/schema";
import { resolvers } from "../graphql/resolvers";
import { CustomersArgs, ProductArgs } from "../utils/types";

it("returns single product result", async () => {
  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const response = await testServer.executeOperation<ProductArgs>({
    query: "query Product($vin: String!) { product(vin: $vin) { vin colour } }",
    variables: { vin: "1G6DP567X50115827" },
  });

  if (response.body.kind === "single" && response.body.singleResult.data) {
    expect(response.body.kind === "single");
    expect(response.body.singleResult.data?.vin === "1G6DP567X50115827");
    expect(response.body.singleResult.data?.colour === "Black");
    expect(response.body.singleResult.data?.make === "Jaguar");
    expect(response.body.singleResult.data?.model === "XE");
    expect(response.body.singleResult.data?.price === 43000);
  }
});

it("returns single customer result", async () => {
  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const response = await testServer.executeOperation<CustomersArgs>({
    query:
      "query Customer($email: String!) { customer(email: $email) { email forename surname contact_number postcode } }",
    variables: { vin: "1G6DP567X50115827" },
  });

  if (response.body.kind === "single" && response.body.singleResult.data) {
    expect(response.body.kind === "single");
    expect(
      response.body.singleResult.data?.email === "tom.harding1974@gmail.co.uk"
    );
    expect(response.body.singleResult.data?.forename === "Tom");
    expect(response.body.singleResult.data?.surname === "Harding");
    expect(response.body.singleResult.data?.contact_number === "07938244758");
    expect(response.body.singleResult.data?.postcode === "SS26GH");
  }
});

it("returns multiple product results", async () => {
  type ProductsData = {
    products: ProductArgs[];
  };

  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const response = await testServer.executeOperation<ProductsData>({
    query: "query Products { products {  vin  }  }",
  });

  if (response.body.kind === "single" && response.body.singleResult.data) {
    expect(response.body.kind === "single");
    const responseData = response.body.singleResult.data;
    expect(responseData.products.length === 5);
    const emails = responseData.products.map((product) => product.vin);
    expect(emails.includes("WVGCV7AX7AW000784"));
    expect(emails.includes("5TBRV54138S478794"));
    expect(emails.includes("SALSH23447A102751"));
    expect(emails.includes("1G6DP567X50115827"));
    expect(emails.includes("1C6RR6LT9DS578427"));
  }
});

it("returns multiple customer results", async () => {
  type CustomersData = {
    customers: CustomersArgs[];
  };

  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const response = await testServer.executeOperation<CustomersData>({
    query: "query Customers { customers {  email  }  }",
  });

  if (response.body.kind === "single" && response.body.singleResult.data) {
    expect(response.body.kind === "single");
    const responseData = response.body.singleResult.data;
    expect(responseData.customers.length === 3);
    const emails = responseData.customers.map((customer) => customer.email);
    expect(emails.includes("tom.harding1974@gmail.co.uk"));
    expect(emails.includes("drosmanahmed@pharmaceuticalsglobal.org"));
    expect(emails.includes("dominic.sutton@rockar.com"));
  }
});

# GraphQL Application

This is a GraphQL application which queries MongoDB and CSV files for customer and product data.

## Setup

To setup the application, follow the steps below:

1. Clone the repository
2. Install the dependencies using `npm install`
3. Create a `.env` file in the `/server` directory of the project and add the following variables:

```
MONGODB_URI=<Your MongoDB Connection String>
CSV_FILE_PATH=<Path to your folder containing CSVs>
PORT=<Port to run Apollo server on>
```

## Running the Application

To run the application, use the command `npm run start` or `npm run dev`.

Got to `http://localhost:{PORT}`, the application will default to port `8000`.

## Querying Data

The application can query customer and product data from both MongoDB and CSV files. The data can be queried using GraphQL queries. Here is an example of a query:

```
{
  customers {
    forename
    email
  }
  products {
    vin
    make
    price
  }
}
```

This will return the forename and email of all customers and the VIN, make, and price of all products.

## Testing

To run the tests, use the command `npm test`. The tests are written using Jest.

## Built With

- TypeScript
- GraphQL
- MongoDB
- Apollo
- Jest
- CSV

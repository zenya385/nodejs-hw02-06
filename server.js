// const app = require('./app')

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })

const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, ".env") });

// Connection URL
const url = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

const client = new MongoClient(url);

// Database Name

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Database connection successful");
  const db = client.db(dbName);
  const contact = db.collection("db-contacts");

  const cont = await contact.insertOne({
    title: "my first post",
    body: "This is my first post",
    createdAt: new Date(),
  });
  console.log("cont", cont);

  // the following code examples can be pasted here...

  return "done.";
}

main();
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());

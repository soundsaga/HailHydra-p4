const MongoClient = require("mongodb").MongoClient;

// MongoDB connection URL and database name
const url = "mongodb://localhost:27017";
const dbName = "pageLinks";

// Data to insert
const dataToInsert = [
  { id: "a", page: "page_a.html" },
  { id: "b", page: "page_b.html" },
  { id: "c", page: "page_c.html" },
];

// Connect to MongoDB and insert data
MongoClient.connect(url, (err, client) => {
  if (err) {
    console.error(err);
    return;
  }

  const db = client.db(dbName);
  const collection = db.collection("links");

  collection.insertMany(dataToInsert, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`${result.insertedCount} documents inserted.`);
    }
    client.close();
  });
});

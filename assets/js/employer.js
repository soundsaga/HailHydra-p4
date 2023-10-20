const express = require("express");
const MongoClient = require("mongodb").MongoClient;

const app = express();

// MongoDB connection URL and database name
const url = "mongodb://localhost:27017";
const dbName = "pageLinks";

app.use(express.urlencoded({ extended: true }));

// Handle the form submission
app.post("/login", (req, res) => {
  const id = req.body.id; // Assuming the 'ID' field in the form is named 'id'

  MongoClient.connect(url, (err, client) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Database error");
    }

    const db = client.db(dbName);
    const linksCollection = db.collection("links");

    linksCollection.findOne({ id }, (err, doc) => {
      if (err) {
        console.error(err);
        client.close();
        return res.status(500).send("Database error");
      }

      if (!doc) {
        client.close();
        return res.status(404).send("Link not found");
      }

      const page = doc.page;
      client.close();

      // Redirect to the retrieved page
      res.redirect(page);
    });
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

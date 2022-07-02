const express = require("express");
const app = express();
const cors = require("cors");
const database = require("mime-db");
require("dotenv").config();
const port = process.env.PORT || 5000;

// this is midlewiere
app.use(cors());
app.use(express.json());

// This is from database

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6rdkwh0.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    console.log("Database connected");

    const userCollection = client.db("mk-social-commerce").collection("user");

    // this is for user collection
    app.put("/user/:email", async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const filter = { email: email };
      const options = { upsert: true };
      const updateDoc = {
        $set: user,
      };
      const result = await userCollection.updateOne(filter, updateDoc, options);

      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

// basic setup code
app.get("/", (req, res) => {
  res.send("Hello from Kamao app!");
});

app.listen(port, () => {
  console.log(`kamao listening on port ${port}`);
});

// mk-social-commerce
// 20Z62Rg1rRkkkecD

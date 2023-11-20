const express = require("express");
const mongoose = require("mongoose");
const Cards = require("./cardsDB");
require("dotenv").config();
const cors = require("cors");

//App config
const app = express();
const port = process.env.PORT;
const mongoUrl = process.env.MONGOURL;
//Middlewares
app.use(express.json());
app.use(cors());

//DB config
mongoose.connect(mongoUrl, {
  //useNewUrlParser: true,
  // useUnifiedTopology: true,
});

//API Endpoints
app.get("/", (req, res) => {
  res.status(200).send("Hello 33.");
});

app.post("/cards", (req, res) => {
  const dbCard = req.body;

  Cards.create(dbCard)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/cards", async (req, res) => {
  try {
    const data = await Cards.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Listener
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

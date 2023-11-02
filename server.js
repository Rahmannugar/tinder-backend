const express = require("express");
const mongoose = require("mongoose");
const Cards = require("./cardsDB");
require("dotenv").config();
const cors = require("cors");

//App config
const app = express();
const port = process.env.PORT;
const mongoUrl =
  "mongodb+srv://Rahmannugar:Nugarcladex@cluster0.s6blitt.mongodb.net/?retryWrites=true&w=majority";

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

  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//Listener
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

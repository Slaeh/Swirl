require("dotenv").config();
const express = require("express");
const app = express();
const { TwitterApi } = require("twitter-api-v2");
const cors = require("cors");
const { default: axios } = require("axios");
const qs = require("qs");
const needle = require("needle");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = require("./models/user");
const twitterRouter = require("./controllers/twitter");

app.use(express.json());
app.use(cors());

app.use("/api/twitterFeed", twitterRouter);

app.get("/testMongo", (req, res) => {
  const dummyUser = new User({
    email: "swirldummy@generic.com",
    passwordHash: "somethingrandom",
  });
  dummyUser.save();
  res.send("test");
});

app.listen(5000, () => {
  console.log("Running on port 5000");
});

module.exports = app;

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

app.use(express.json());
app.use(cors());

app.get("/twitterFeed", async (req, res) => {
  const params = {
    query: "JavaScript",
    max_results: 11,
  };
  const twitterResult = await needle(
    "get",
    "https://api.twitter.com/2/tweets/search/recent",
    params,
    {
      headers: {
        "User-Agent": "v2SearchSwirl",
        Authorization: "Bearer " + process.env.BEARER_TOKEN,
      },
    }
  );
  if (twitterResult.body) {
    console.log(twitterResult.body);
    res.send(twitterResult.body);
  } else {
    console.log("an error happened");
    res.send({ error: "twitter api call failed" });
  }
});

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

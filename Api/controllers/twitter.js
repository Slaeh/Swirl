const needle = require("needle");

const twitterRouter = require("express").Router();

twitterRouter.get("/", async (req, res) => {
  console.log("HEREEEEEEEEEEEEEEEEEEEE");
  const params = {
    query: "JavaScript Web Development",
    max_results: 11,
    expansions: "author_id",
    "user.fields": "profile_image_url,username",
    "tweet.fields": "public_metrics",
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

module.exports = twitterRouter;

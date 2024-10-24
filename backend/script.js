const express = require("express");
const cors = require("cors");
const { getJson } = require("serpapi");
const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the Food Search API!");
});

app.get("/search-cafe", (req, res) => {
  const userLocation = req.query.location;

  if (!userLocation) {
    return res
      .status(400)
      .json({ error: "Location query parameter is required" });
  }

  const query = `cafe in ${userLocation}`;
  getJson(
    {
      engine: "google_maps",
      q: query,
      type: "search",
      // add api key here
      api_key: "",
    },
    (json) => {
      const results = json["local_results"];
      res.json(results);
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const express = require("express");
const cors = require("cors"); // Import cors middleware
const { getJson } = require("serpapi");
const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors()); // Add this line to enable CORS

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to the Food Search API!");
});

app.get("/search-cafe", (req, res) => {
  const userLocation = req.query.location; // Get location from query parameters

  if (!userLocation) {
    return res.status(400).json({ error: "Location query parameter is required" });
  }

  const query = `cafe in ${userLocation}`; // Create the query string

  getJson({
    engine: "google_maps",
    q: query,
    type: "search",
    api_key: ""
  }, (json) => {
    const results = json["local_results"];
    res.json(results);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

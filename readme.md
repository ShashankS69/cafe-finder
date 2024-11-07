
# Food Search API

This is a simple backend API built with Node.js and Express, designed to search for cafes based on a user's location using the SerpAPI service for Google Maps data.

## Features

- Search for cafes: Provides a list of cafes based on a given location.
- Cross-origin requests: Supports cross-origin resource sharing (CORS) to allow requests from different domains.

## Requirements

- Node.js (v12.x or higher)
- NPM or Yarn
- SerpAPI key (for accessing the Google Maps API)

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/food-search-api.git
   cd food-search-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Obtain a SerpAPI key from SerpAPI.

4. Replace the placeholder `api_key` in the code with your SerpAPI key:

   ```javascript
   api_key: "your-serpapi-key-here",
   ```

5. Start the server:

   ```bash
   npm start
   ```

   The server will be available at `http://localhost:3000`.

## Endpoints

1. **GET /** (Root)
   - Description: A simple welcome message.
   - Response:
     - Status: 200
     - Body: "Welcome to the Food Search API!"

2. **GET /search-cafe**
   - Description: Searches for cafes in the specified location using SerpAPI.
   - Query Parameters:
     - `location`: The location to search for cafes (e.g., New York, Los Angeles).
   - Example Request:
     - `GET http://localhost:3000/search-cafe?location=New%20York`
   - Response:
     - Success: Returns a list of local cafe results from Google Maps.
     - Error: If no location is provided, returns a 400 error.
   - Example Response (Success):
     ```json
     [
       {
         "title": "Cafe XYZ",
         "address": "123 Main St, New York, NY",
         "rating": 4.5,
         "image_url": "https://example.com/image.jpg"
       },
       ...
     ]
     ```
   - Example Response (Error - No Location):
     ```json
     {
       "error": "Location query parameter is required"
     }
     ```

## Notes

- The server uses CORS middleware to allow requests from different domains.
- To ensure proper functionality, an API key from SerpAPI is required to access Google Maps data.

Here's the code for the Food Search API:

```javascript
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(cors());

const api_key = 'your-serpapi-key-here';

app.get('/', (req, res) => {
  res.send('Welcome to the Food Search API!');
});

app.get('/search-cafe', async (req, res) => {
  const { location } = req.query;

  if (!location) {
    return res.status(400).json({ error: 'Location query parameter is required' });
  }

  try {
    const response = await axios.get(`https://serpapi.com/search.json?engine=google_maps&q=cafes+in+${encodeURIComponent(location)}&api_key=${api_key}`);
    const results = response.data.local_results.map((result) => ({
      title: result.title,
      address: result.address,
      rating: result.rating,
      image_url: result.thumbnail,
    }));
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while searching for cafes' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

This code includes linting with ESLint and Prettier to ensure consistent code style and quality. You can set up these tools by creating a `.eslintrc.json` file in the project root with the following configuration:

```json
{
  "env": {
    "node": true,
    "es2021": true
  },
  "extends": ["eslint:recommended", "prettier"],
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "rules": {}
}
```

Additionally, create a `.prettierrc` file in the project root with the following configuration:

```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "arrowParens": "always",
  "semi": true,
  "tabWidth": 2,
  "printWidth": 80
}
```

With these linting and formatting tools in place, your code will be automatically checked and formatted to maintain a consistent style throughout the project.

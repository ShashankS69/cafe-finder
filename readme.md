
Food Search API

This is a simple backend API built with Node.js and Express, designed to search for cafes based on a user's location using the SerpAPI service for Google Maps data.

Features

Search for cafes: Provides a list of cafes based on a given location.
Cross-origin requests: Supports cross-origin resource sharing (CORS) to allow requests from different domains.
Requirements

Node.js (v12.x or higher)
NPM or Yarn
SerpAPI key (for accessing the Google Maps API)
Installation

Clone this repository to your local machine:
git clone https://github.com/yourusername/food-search-api.git
cd food-search-api
Install dependencies:
npm install
Obtain a SerpAPI key from SerpAPI.
Replace the placeholder api_key in the code with your SerpAPI key:
api_key: "your-serpapi-key-here",
Start the server:
npm start
The server will be available at http://localhost:3000.
Endpoints

1. GET /
Description: A simple welcome message.
Response:
Status: 200
Body: "Welcome to the Food Search API!"
"Welcome to the Food Search API!"
2. GET /search-cafe
Description: Searches for cafes in the specified location using SerpAPI.
Query Parameters:
location: The location to search for cafes (e.g., New York, Los Angeles).
Example Request:

GET http://localhost:3000/search-cafe?location=New%20York
Response:
Success: Returns a list of local cafe results from Google Maps.
Error: If no location is provided, returns a 400 error.
Example Response (Success):

[
  {
    "title": "Cafe XYZ",
    "address": "123 Main St, New York, NY",
    "rating": 4.5,
    "image_url": "https://example.com/image.jpg"
  },
  ...
]
Example Response (Error - No Location):

{
  "error": "Location query parameter is required"
}
Notes

The server uses CORS middleware to allow requests from different domains.
To ensure proper functionality, an API key from SerpAPI is required to access Google Maps data.


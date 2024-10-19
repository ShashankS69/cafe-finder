import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [location, setLocation] = useState('delhi');
  const [cafes, setCafes] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false); // New state for dark mode

  // Fetch cafes based on the location
  useEffect(() => {
    const fetchCafes = async () => {
      try {
        const response = await axios.get(`https://backend-cafe-one.vercel.app/search-cafe?location=${location}`);
        setCafes(response.data);
      } catch (error) {
        console.error('Error fetching cafe data', error);
      }
    };

    fetchCafes();
  }, [location]);

  // Handle location change
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  // Toggle between light and dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Café Finder</h1>

      {/* Toggle light/dark mode */}
      <button onClick={toggleDarkMode} style={toggleButtonStyle}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      {/* Input for changing the location */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="location">Enter Location: </label>
        <input
          id="location"
          type="text"
          value={location}
          onChange={handleLocationChange}
          placeholder="Enter city name"
        />
      </div>

      <div className="card-container">
        {/* Render cafes in cards */}
        {cafes.length > 0 ? (
          cafes.map((cafe) => (
            <div key={cafe.place_id} style={cardStyle}>
              <h2>{cafe.title}</h2>
              <img src={cafe.thumbnail} alt={cafe.title} style={{ width: '100px', height: '100px' }} />
              <p><strong>Rating:</strong> {cafe.rating} ({cafe.reviews} reviews)</p>
              <p><strong>Address:</strong> {cafe.address}</p>
              <p><strong>Open:</strong> {cafe.open_state}</p>
              <p>{cafe.description}</p>
              <a href={cafe.website} target="_blank" rel="noopener noreferrer">Visit Website</a>
              <br />
              <a href={cafe.order_online} target="_blank" rel="noopener noreferrer">Order Online</a>
            </div>
          ))
        ) : (
          <p>No cafes found for this location.</p>
        )}
      </div>
    </div>
  );
};

// Card styling
const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '20px',
  width: '300px',
};

// Toggle button styling
const toggleButtonStyle = {
  padding: '10px 20px',
  marginBottom: '20px',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  backgroundColor: '#007bff',
  color: '#fff',
  fontSize: '1em',
};

export default App;

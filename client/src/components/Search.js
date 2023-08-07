import React, { useState, useEffect } from "react";
import Map from "./Map";
import "../CSS/Search.css";

const initialMarkers = [
  { id: 1, lat: -1.286389, lng: 36.817223, rent: 1500 },
  { id: 2, lat: -5.286389, lng: 32.817223, rent: 2000 },
  { id: 3, lat: -2.286389, lng: 34.817223, rent: 1800 },
];

const cities = ["Thika Rd", "Nairobi", "Rongai", "Konza","Kiambu","Kisumu","Mombasa"];

const Search = () => {
  const [location, setLocation] = useState("");
  const [minRent, setMinRent] = useState(0);
  const [maxRent, setMaxRent] = useState(500000);
  const [selectedCity, setSelectedCity] = useState("");
  const [filteredMarkers, setFilteredMarkers] = useState(initialMarkers);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    event.preventDefault();
    fetchSearchResults();
  };

  const fetchSearchResults = () => {
    // Simulated API call
    setTimeout(() => {
      let results = initialMarkers.filter(
        (marker) =>
          marker.lat.toString().includes(selectedCity) &&
          marker.rent >= minRent &&
          marker.rent <= maxRent
      );
      setSearchResults(results);
    }, 1000);
  };

  useEffect(() => {
    fetchSearchResults();
  }, [selectedCity, minRent, maxRent]);

  return (
    <div>
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <div>
            <label htmlFor="city">Select a City:</label>
            <select
              id="city"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="rentRange">Rent Range:</label>
            <input
              type="range"
              id="rentRange"
              min="0"
              max="500000"
              step="1000"
              value={maxRent}
              onChange={(e) => setMaxRent(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="minRent">Min Rent:</label>
            <input
              type="number"
              id="minRent"
              name="minRent"
              value={minRent}
              onChange={(e) => setMinRent(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="maxRent">Max Rent:</label>
            <input
              type="number"
              id="maxRent"
              name="maxRent"
              value={maxRent}
              onChange={(e) => setMaxRent(e.target.value)}
            />
          </div>
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="map-container">
        <Map filteredMarkers={filteredMarkers} />
      </div>
      <div className="search-results">
        {searchResults.length === 0 ? (
          <p>No results found.</p>
        ) : (
          searchResults.map((result) => (
            <div key={result.id}>
              <h3>{`Property ${result.id}`}</h3>
              <p>{`Rent: $${result.rent}`}</p>
              {/* Add more details here */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Search;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Search.css';
import { Link } from 'react-router-dom';

const Search = ({ searchQuery, clearSearchQuery }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');

  const fetchSearchResults = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/book/filter?search_query=${searchQuery}`
      );
      setSearchResults(response.data);
      setError('');
    } catch (error) {
      setSearchResults([]);
      setError('Error fetching search results');
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery]);

  const handleBookClick = () => {
    clearSearchQuery(); // Clear the search query in the Navbar
  };

  return (
    <div className="search-container">
      {error && <p>{error}</p>}
      {searchResults.length > 0 ? (
        <div className="result">
          {searchResults.map((book) => (
            <div key={book.id} onClick={handleBookClick}>
              <Link to={`/book/${book.id}`} className="search-result-item">
                <img src={book.image} className="imgSearch" alt="" />
                <p className="namebook">{book.name}</p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No search results</p>
      )}
    </div>
  );
};

export default Search;

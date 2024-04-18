import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Search.css';
import { Link } from 'react-router-dom';

const Search = ({ searchQuery }) => {
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

  // Fetch search results when the searchQuery changes
  useEffect(() => {
    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery]);

  return (
    <div className="search-container">
      {error && <p>{error}</p>}
      {searchResults.length > 0 ? (
        <div className="result">
          {searchResults.map((book) => (
            <div key={book.id}>
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

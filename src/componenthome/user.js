import React, { useState, useEffect } from 'react';

function Search({ loggedInUserId }) {
  const [searchResults, setSearchResults] = useState([]);

  // Lấy thông tin từ URL
  const searchParams = new URLSearchParams(window.location.search);
  const userName = searchParams.get('name');

  useEffect(() => {
    performSearch();
  }, [userName]);

  const performSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/search?query=${userName}`);
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error performing search:', error);
    }
  };

  const sendRequest = (userId) => {
    alert("Request sent successfully!");
  };

  return (
    <div>
      <h1>Search Results</h1>
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>
            {result.name}
            {(loggedInUserId !== result.id) ? (
              <button onClick={() => sendRequest(result.id)}>Send to request</button>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;

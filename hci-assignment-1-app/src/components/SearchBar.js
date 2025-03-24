import React from 'react';

const SearchBar = ({ onSearch, query, setQuery }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch(query);
    }
  };

  return (
    <div className="search-bar">
      <div className="search-icon">🔍</div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Philadelphia, PA"
      />
    </div>
  );
};

export default SearchBar;
import React, { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const TokenSearchBar = ({ allTokens, onAddToSelectedCoins }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleKeyPress = (event) => {
    if (!Array.isArray(allTokens)) {
      return; // If allTokens is not an array, return early
    }

    if (event.key === 'Enter') {
      const tokenToAdd = allTokens.find(
        (token) => token.symbol.toLowerCase() === searchQuery
      );
      if (tokenToAdd) {
        onAddToSelectedCoins(tokenToAdd);
        setSearchQuery('');
      }
    }
  };

  const handleAddToSelectedCoins = (token) => {
    onAddToSelectedCoins(token);
    setSearchQuery('');
  };

  // Check if allTokens is an array before filtering
  const filteredTokens =
    Array.isArray(allTokens) && searchQuery
      ? allTokens.filter(
          (token) =>
            token.name.toLowerCase().includes(searchQuery) ||
            token.symbol.toLowerCase().includes(searchQuery)
        )
      : [];

  return (
    <div>
      <input
        type='text'
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
        placeholder='Search for tokens...'
        className='border-b-2 border-slate-700 p-1 md:p-3 my-4 mx-auto focus:outline-none bg-gray-100/10'
      />
      {searchQuery && (
        <div>
          {filteredTokens.length > 0 ? (
            filteredTokens.map((token) => (
              <div
                key={token.id}
                className='flex items-center justify-between p-2 my-2 border rounded-full'
              >
                <div className='flex items-center'>
                  <img
                    src={token.image}
                    alt={token.name}
                    className='w-6 h-6 mr-2'
                  />
                  {token.name} ({token.symbol.toUpperCase()})
                </div>
                <button
                  className='text-gray-500 hover:text-slate-900'
                  onClick={() => handleAddToSelectedCoins(token)}
                >
                  <AddCircleIcon />
                </button>
              </div>
            ))
          ) : (
            <p>No matching tokens found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TokenSearchBar;

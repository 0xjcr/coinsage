import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';

const TokenSearchBar = ({
  allTokens,
  onAddToSelectedCoins,
  myPortfolio,
  setMyPortfolio,
  isPortfolioTabActive,
  handleAddToMyPortfolio,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isTrackClicked, setIsTrackClicked] = useState(false);
  const [isAddClicked, setIsAddClicked] = useState(false);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleKeyPress = (event) => {
    if (!Array.isArray(allTokens)) {
      return;
    }

    if (event.key === 'Enter') {
      const tokenToAdd = allTokens.find(
        (token) => token.symbol.toLowerCase() === searchQuery
      );
      if (tokenToAdd) {
        if (isPortfolioTabActive) {
          handleAddToMyPortfolio(tokenToAdd);
        } else {
          onAddToSelectedCoins(tokenToAdd);
        }
        setSearchQuery('');
      }
    }
  };

  const handleAddToTracking = (token) => {
    onAddToSelectedCoins(token);
    setIsTrackClicked(true);
  };

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
        className='border-b-2 border-cyan-500 p-1 md:p-3 my-4 mx-auto focus:outline-none bg-gray-100/10 '
      />
      {searchQuery && (
        <div>
          {filteredTokens.length > 0 ? (
            filteredTokens.map((token) => (
              <div
                key={token.id}
                className='flex items-center justify-between p-2 my-2 border border-black rounded-lg hover:shadow-sm hover:scale-105 hover:shadow-cyan-400/50 bg-white/60'
              >
                <div className='flex items-center'>
                  <img
                    src={token.image}
                    alt={token.name}
                    className='w-6 h-6 mr-2'
                  />
                  {token.name} ({token.symbol.toUpperCase()})
                </div>
                <div className='flex space-x-3 ml-6'>
                  <button
                    className={`text-cyan-700 hover:text-indigo-900 ${
                      isTrackClicked ? 'text-gray-200' : 'text-gray-600'
                    }`}
                    onClick={() => handleAddToTracking(token)}
                  >
                    <TrackChangesIcon />
                  </button>
                  <button
                    className={`text-cyan-700 hover:text-indigo-900 ${
                      isAddClicked ? 'text-gray-200' : 'text-gray-600'
                    }`}
                    onClick={() => handleAddToMyPortfolio(token)}
                  >
                    <AddIcon />
                  </button>
                </div>
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

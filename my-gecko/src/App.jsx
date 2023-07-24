import React, { useEffect, useState } from 'react';
import TokenSearchBar from './components/TokenSearchBar';
import CryptoList from './components/CryptoList';
import TrackedCoins from './components/TrackedCoins';
import { getCoinsByMarketCap } from './api';

const App = () => {
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [cryptoList, setCryptoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading status


  // Load the selected coins from local storage on component mount
  useEffect(() => {
    const storedSelectedCoins =
      JSON.parse(localStorage.getItem('selectedCoins')) || [];
    setSelectedCoins(storedSelectedCoins);
  }, []);

  // Save the selected coins to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('selectedCoins', JSON.stringify(selectedCoins));
  }, [selectedCoins]);

  useEffect(() => {
    // Fetch the list of crypto assets sorted by market cap
    getCoinsByMarketCap()
      .then((data) => {
        setCryptoList(data);
        setIsLoading(false); // Set loading to false after data is fetched successfully
      })
      .catch((error) => {
        console.error(error);
        setCryptoList([]); // Set cryptoList to an empty array in case of an error
        setIsLoading(false); // Set loading to false after data fetch fails
      });
  }, []);

  const handleAddToSelectedCoins = (coin) => {
    // Check if the coin is already present in selectedCoins
    if (!selectedCoins.some((selectedCoin) => selectedCoin.id === coin.id)) {
      // Find the complete coin object from the cryptoList
      const completeCoin = cryptoList.find((item) => item.id === coin.id);
      // Add the complete coin object to the selectedCoins state
      setSelectedCoins((prevSelectedCoins) => [
        ...prevSelectedCoins,
        completeCoin,
      ]);
    }
  };

  const handleRemoveFromSelectedCoins = (coinId) => {
    setSelectedCoins((prevSelectedCoins) =>
      prevSelectedCoins.filter((coin) => coin.id !== coinId)
    );
  };

  return (
    <div className='p-4 h-full w-full bg-gray-100'>
      <div className='flex justify-evenly w-full bg-gradient-to-t from-gray-100 via-gray-100 to-gray-200 border-b border-gray-200'>
        <h1 className='text-3xl md:text-4xl font-thin text-slate-700 my-auto'>
          Cryptoview
        </h1>
        <TokenSearchBar
          allTokens={cryptoList}
          onAddToSelectedCoins={handleAddToSelectedCoins}
        />
      </div>

      {isLoading ? (
        <p>Loading data...</p>
      ) : (
        <>
          {selectedCoins.length > 0 && (
            <TrackedCoins
              trackedCoins={selectedCoins}
              onRemoveItem={handleRemoveFromSelectedCoins}
            />
          )}
          <div className=''>
            <CryptoList
              cryptoList={cryptoList}
              onAddToSelectedCoins={handleAddToSelectedCoins}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default App;

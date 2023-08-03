import React, { useEffect, useState } from 'react';
import TokenSearchBar from './components/TokenSearchBar';
import CryptoList from './components/CryptoList';
import Tabs from './components/Tabs';
import { getCoinsByMarketCap } from './api';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';

const App = () => {
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [cryptoList, setCryptoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [myPortfolio, setMyPortfolio] = useState([]);
  const [activeTab, setActiveTab] = useState('Tracking');

  useEffect(() => {
    const storedSelectedCoins = JSON.parse(
      localStorage.getItem('selectedCoins')
    );
    if (storedSelectedCoins && Array.isArray(storedSelectedCoins)) {
      setSelectedCoins(storedSelectedCoins);
    }

    const storedMyPortfolio = JSON.parse(localStorage.getItem('myPortfolio'));
    if (storedMyPortfolio && Array.isArray(storedMyPortfolio)) {
      setMyPortfolio(storedMyPortfolio);
    }

    const storedActiveTab = localStorage.getItem('activeTab');
    if (storedActiveTab) {
      setActiveTab(storedActiveTab);
    } else {
      setActiveTab('Tracking');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedCoins', JSON.stringify(selectedCoins));
  }, [selectedCoins]);

  useEffect(() => {
    localStorage.setItem('myPortfolio', JSON.stringify(myPortfolio));
  }, [myPortfolio]);

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    getCoinsByMarketCap()
      .then((data) => {
        setCryptoList(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setCryptoList([]);
        setIsLoading(false);
      });
  }, []);

  const handleAddToSelectedCoins = (coin) => {
    if (!selectedCoins.some((selectedCoin) => selectedCoin.id === coin.id)) {
      const completeCoin = cryptoList.find((item) => item.id === coin.id);
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

  const handleAddToMyPortfolio = (tokenToAdd) => {
    if (
      !myPortfolio.some((portfolioCoin) => portfolioCoin.id === tokenToAdd.id)
    ) {
      setMyPortfolio((prevPortfolio) => [...prevPortfolio, tokenToAdd]);
    }
  };

  const onRemoveItem = (id) => {
    setMyPortfolio((prevPortfolio) =>
      prevPortfolio.filter((coin) => coin.id !== id)
    );
  };

  return (
    <div className='px-6 h-full w-full bg-gray-800'>
      <div className='flex justify-evenly w-full  border-b border-gray-200'>
        <div className='flex items-center'>
          <ChangeHistoryIcon className='scale-150 text-slate-100' />
          <h1 className='text-3xl md:text-4xl font-thin text-slate-100 my-auto px-6'>
            CoinSage
          </h1>
        </div>
        <TokenSearchBar
          allTokens={cryptoList}
          onAddToSelectedCoins={handleAddToSelectedCoins}
          myPortfolio={myPortfolio}
          setMyPortfolio={setMyPortfolio}
          isPortfolioTabActive={activeTab === 'MyPortfolio'}
          handleAddToMyPortfolio={handleAddToMyPortfolio}
        />
      </div>

      {isLoading ? (
        <p>Loading data...</p>
      ) : (
        <>
          <Tabs
            selectedCoins={selectedCoins}
            onRemoveItem={handleRemoveFromSelectedCoins}
            myPortfolio={myPortfolio}
            onRemoveFromPortfolio={onRemoveItem}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />

          <div className=''>
            <CryptoList
              cryptoList={cryptoList}
              onAddToSelectedCoins={handleAddToSelectedCoins}
              myPortfolio={myPortfolio}
              setMyPortfolio={setMyPortfolio}
              onRemoveItem={onRemoveItem}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default App;

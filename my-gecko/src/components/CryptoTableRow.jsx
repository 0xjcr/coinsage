import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';

const CryptoTableRow = ({
  crypto,
  onAddToSelectedCoins,
  myPortfolio,
  setMyPortfolio,
}) => {
  const [isTrackClicked, setIsTrackClicked] = useState(false);
  const [isAddClicked, setIsAddClicked] = useState(false);

  const handleAddToTracking = () => {
    onAddToSelectedCoins(crypto);
    setIsTrackClicked(true);
  };

  const handleAddToMyPortfolio = () => {
    // Check if the coin is already present in myPortfolio
    if (!myPortfolio.some((portfolioCoin) => portfolioCoin.id === crypto.id)) {
      setIsAddClicked(true);

      // Add the token to the myPortfolio list
      setMyPortfolio((prevPortfolio) => [...prevPortfolio, crypto]);
    }
  };

  const isNegativeChange = crypto.price_change_percentage_24h < 0;
  const isNegativeChangeValue = crypto.price_change_24h < 0;

  let priceChangePercentage = crypto.price_change_percentage_24h;
  let priceChangeValue = crypto.price_change_24h;

  if (priceChangePercentage === null) priceChangePercentage = 0;
  if (priceChangeValue === null) priceChangeValue = 0;

  return (
    <tr className='border-t'>
      <td>
        <img src={crypto.image} alt={crypto.name} className='ml-2 w-6 h-6' />
      </td>
      <td className='py-3'>{crypto.name}</td>
      <td>{crypto.symbol.toUpperCase()}</td>
      <td>
        $
        {crypto.current_price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </td>
      <td
        className={`${isNegativeChange ? 'text-red-400' : 'text-emerald-400'}`}
      >
        {priceChangePercentage.toFixed(2)}%
      </td>
      <td
        className={`${
          isNegativeChangeValue ? 'text-red-400' : 'text-emerald-400'
        }`}
      >
        ${priceChangeValue.toFixed(2)}
      </td>
      <td>
        {crypto.total_volume > 1_000_000_000
          ? `$${(crypto.total_volume / 1_000_000_000).toFixed(2)}B`
          : `$${(crypto.total_volume / 1_000_000).toFixed(2)}M`}
      </td>
      <td>
        {crypto.market_cap > 1_000_000_000
          ? `$${(crypto.market_cap / 1_000_000_000).toFixed(2)}B`
          : `$${(crypto.market_cap / 1_000_000).toFixed(2)}M`}
      </td>
      <td>
        <button
          className={`text-gray-500 visited:text-gray-200 hover:text-slate-900 active:text-indigo-500 group ${
            isTrackClicked ? 'text-gray-200' : 'text-gray-500'
          } transition`}
          onClick={handleAddToTracking}
        >
          <TrackChangesIcon />
        </button>
        <button
          className={`text-gray-500 visited:text-gray-200 hover:text-slate-900 active:text-indigo-500 group ${
            isAddClicked ? 'text-gray-200' : 'text-gray-500'
          } transition`}
          onClick={handleAddToMyPortfolio}
        >
          <AddIcon />
        </button>
      </td>
    </tr>
  );
};

export default CryptoTableRow;

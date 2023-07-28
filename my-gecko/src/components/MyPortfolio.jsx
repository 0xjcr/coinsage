import React, { useState } from 'react';
import PortfoilioTile from './PortfoilioTile';

const MyPortfolio = ({ myPortfolio, setMyPortfolio, onRemoveItem }) => {
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (coinId, quantity) => {
    setQuantities({
      ...quantities,
      [coinId]: quantity,
    });
  };

  const calculatePortfolioSummary = () => {
    let totalValue = 0;
    let totalChangeValue = 0;
    let coinWeights = [];

    myPortfolio.forEach((coin) => {
      const quantity = quantities[coin.id] || 0;
      const priceChangeValue = coin.price_change_24h || 0;
      const coinValue = coin.current_price * quantity;
      totalValue += coinValue;
      totalChangeValue += priceChangeValue * quantity;

      coinWeights.push({
        id: coin.symbol.toUpperCase(),
        label: coin.symbol.toUpperCase(),
        rawValue: coinValue,
      });
    });

    coinWeights = coinWeights.map((coin) => ({
      ...coin,
      value: (coin.rawValue / totalValue).toFixed(2) * 100,
    }));

    const totalChangePercentage =
      (totalChangeValue / (totalValue - totalChangeValue)) * 100;

    return {
      totalValue,
      totalChangeValue,
      totalChangePercentage,
      coinWeights,
    };
  };

  const { totalValue, totalChangeValue, totalChangePercentage, coinWeights } =
    calculatePortfolioSummary();
  const isNegativeTotalChange = totalChangeValue < 0;

  return (
    <div className='mt-6 py-2 '>
      <div className='flex justify-between m-2 p-2 border border-gray-300 rounded w-full'>
        <div>
          <p>
            Total Value: $
            {totalValue.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <p
            className={`${
              isNegativeTotalChange ? 'text-red-400' : 'text-green-400'
            }`}
          >
            Today's Change ($): ${totalChangeValue.toFixed(2)}
          </p>
          <p
            className={`${
              isNegativeTotalChange ? 'text-red-400' : 'text-green-400'
            }`}
          >
            Today's Change (%): {totalChangePercentage.toFixed(2)}%
          </p>
        </div>
      </div>
      <div className='flex flex-col'>
        {myPortfolio.map((coin) => {
          const isNegativeChange = coin.price_change_percentage_24h < 0;
          const isNegativeChangeValue = coin.price_change_24h < 0;
          const priceChangePercentage = coin.price_change_percentage_24h || 0;
          const priceChangeValue = coin.price_change_24h || 0;
          const quantity = quantities[coin.id] || 0;
          const totalValue = coin.current_price * quantity;
          const totalChange = priceChangeValue * quantity;

          // Find the corresponding coin weight
          const coinWeight = coinWeights.find(
            (c) => c.id === coin.symbol.toUpperCase()
          );

          return (
            <PortfoilioTile
              coin={coin}
              isNegativeChange={isNegativeChange}
              isNegativeChangeValue={isNegativeChangeValue}
              priceChangePercentage={priceChangePercentage}
              priceChangeValue={priceChangeValue}
              quantity={quantity}
              totalValue={totalValue}
              totalChange={totalChange}
              onRemoveItem={onRemoveItem}
              handleQuantityChange={handleQuantityChange}
              percentageOfPortfolio={coinWeight ? coinWeight.value : 0}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MyPortfolio;

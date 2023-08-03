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

    coinWeights = coinWeights
      .map((coin) => ({
        ...coin,
        value: Number(((coin.rawValue / totalValue) * 100).toFixed(2)),
      }))
      .sort((a, b) => b.value - a.value);

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
    <div className='mt-6 py-2 text-slate-100'>
      <div className='flex justify-between m-2 p-2 border border-gray-300 rounded w-full'>
        <div className='flex space-x-4'>
          <p className='text-slate-100'>Portfolio Value: $</p>
          <p className='text-cyan-200'>
            {totalValue.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <div
            className={`flex space-x-4 ${
              isNegativeTotalChange ? 'text-red-400' : 'text-green-400'
            }`}
          >
            <p>24h Change: ${totalChangeValue.toFixed(2)}</p>
            <p>{totalChangePercentage.toFixed(2)}%</p>
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        {coinWeights.map((coinWeight) => {
          const coin = myPortfolio.find(
            (c) => c.symbol.toUpperCase() === coinWeight.id
          );

          if (!coin) return null;

          const isNegativeChange = coin.price_change_percentage_24h < 0;
          const isNegativeChangeValue = coin.price_change_24h < 0;
          const priceChangePercentage = coin.price_change_percentage_24h || 0;
          const priceChangeValue = coin.price_change_24h || 0;
          const quantity = quantities[coin.id] || 0;
          const totalValue = coin.current_price * quantity;
          const totalChange = priceChangeValue * quantity;

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
              percentageOfPortfolio={coinWeight.value}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MyPortfolio;

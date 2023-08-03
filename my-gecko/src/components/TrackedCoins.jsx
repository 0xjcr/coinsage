import TrackedTile from './TrackedTile';

const TrackedCoins = ({ trackedCoins, onRemoveItem }) => {
  if (!trackedCoins) {
    return null;
  }

  trackedCoins.sort(
    (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
  );
  const formatLargeNumber = (num) => {
    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(3) + 'B';
    } else if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(3) + 'M';
    } else {
      return num.toLocaleString(); // Add commas to the number
    }
  };

  const getBackgroundColor = (percentChange) => {
    if (percentChange > 10) {
      return 'bg-gradient-to-br from-transparent via-gray-700 to-emerald-700';
    } else if (percentChange >= 8) {
      return 'bg-gradient-to-br from-transparent via-gray-700 to-emerald-600';
    } else if (percentChange >= 6) {
      return 'bg-gradient-to-br from-transparent via-gray-700 to-emerald-500';
    } else if (percentChange >= 4) {
      return 'bg-gradient-to-br from-transparent via-gray-700 to-emerald-400';
    } else if (percentChange >= 2) {
      return 'bg-gradient-to-br from-transparent via-gray-700 to-emerald-300';
    } else if (percentChange >= 0) {
      return 'bg-gradient-to-br from-transparent via-gray-700 to-emerald-200';
    } else if (percentChange > -2) {
      return 'bg-gradient-to-tr from-transparent via-gray-700 to-red-200';
    } else if (percentChange > -4) {
      return 'bg-gradient-to-tr from-transparent via-gray-700 to-red-300';
    } else if (percentChange > -6) {
      return 'bg-gradient-to-tr from-transparent via-gray-700 to-red-400';
    } else if (percentChange > -8) {
      return 'bg-gradient-to-tr from-transparent via-gray-700 to-red-500';
    } else if (percentChange > -10) {
      return 'bg-gradient-to-tr from-transparent via-gray-700 to-red-600';
    } else {
      return 'bg-gradient-to-tr from-transparent via-gray-700 to-red-700';
    }
  };

  const isPositiveChange = (prevValue, currValue) => {
    return parseFloat(currValue) > parseFloat(prevValue);
  };

  return (
    <div>
      <div className='my-8 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-8 border-b border-gray-200'>
        {trackedCoins.map((coin) => (
          <TrackedTile
            key={coin.id}
            coin={coin}
            getBackgroundColor={getBackgroundColor}
            onRemoveItem={onRemoveItem}
          />
        ))}
      </div>
    </div>
  );
};

export default TrackedCoins;

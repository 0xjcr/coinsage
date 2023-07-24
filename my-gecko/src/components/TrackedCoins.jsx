import CloseIcon from '@mui/icons-material/Close';

const TrackedCoins = ({ trackedCoins, onRemoveItem }) => {
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
    if (percentChange > 5) {
      return 'bg-gradient-to-tr from-gray-100/10 via-gray-100 to-emerald-300 backdrop-blur  ';
    } else if (percentChange >= 2) {
      return 'bg-gradient-to-tr from-gray-100/10 via-gray-100 to-emerald-300/70 backdrop-blur  ';
    } else if (percentChange >= 0) {
      return 'bg-gradient-to-tr from-gray-100/10 via-gray-100 to-emerald-300/50 backdrop-blur  ';
    } else if (percentChange > -2) {
      return 'bg-gradient-to-tr from-gray-100/10 via-gray-100 to-red-300/50 backdrop-blur';
    } else if (percentChange > -5) {
      return 'bg-gradient-to-tr from-gray-100/10 via-gray-100 to-red-300/70 backdrop-blur';
    } else {
      return 'bg-gradient-to-tr from-gray-100/10 via-gray-100 to-red-300 backdrop-blur';
    }
  };

  // Helper function to determine if the price change is positive or negative
  const isPositiveChange = (prevValue, currValue) => {
    return parseFloat(currValue) > parseFloat(prevValue);
  };

  return (
    <div>
      <div className='my-8 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pb-8 border-b border-gray-200'>
        {trackedCoins.map((coin) => (
          <div
            key={coin.id}
            className={`p-1  flex items-start border-2  min-w-48 -m-1 rounded-xl ${getBackgroundColor(
              coin.price_change_percentage_24h
            )}`}
          >
            <div className='relative flex my-3'>
              <div className='w-10 h-10 border shadow shadow-indigo-400 rounded-full absolute flex items-center justify-center bg-white'>
                <img src={coin.image} alt={''} className='w-6 h-6' />
              </div>
            </div>

            {/* <div
                className={`p-8 rounded-3xl ${getBackgroundColor(
                  coin.price_change_percentage_24h
                )} -mr-10 -ml-3 -z-10 `}
              
            ></div> */}

            <div className='flex-grow pl-12'>
              <div className='flex flex-row items-center'>
                <div className='flex flex-row items-center flex-grow'>
                  <div className='ml-2'>
                    <p className='text-md text-gray-700 font-bold whitespace-nowrap'>
                      {coin.name}
                    </p>
                    <div className='flex items-center'>
                      <p className='text-4xl text-gray-800 font-extralight'>
                        {coin.symbol.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className='mr-12'>
                  <p className='mx-2'>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </p>
                  <p className='text-2xl'>
                    $
                    {coin.current_price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <button
                  onClick={() => onRemoveItem(coin.id)}
                  className=' mx-2 text-gray-500 hover:text-slate-900 active:text-amber-500'
                >
                  <CloseIcon />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackedCoins;

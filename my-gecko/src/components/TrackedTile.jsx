import CloseIcon from '@mui/icons-material/Close';

const TrackedTile = ({ coin, getBackgroundColor, onRemoveItem }) => {
  return (
    <div
      key={coin.id}
      className={`p-1 shadow-cyan-100/50 shadow flex items-start   min-w-48 -m-1 rounded-md ${getBackgroundColor(
        coin.price_change_percentage_24h
      )}`}
    >
      <div className='relative flex my-3'>
        <div className='w-10 h-10 border shadow-md hover:shadow-xl hover:animate-flip shadow-cyan-500/50 hover:shadow-cyan-500/50 rounded-full absolute flex items-center justify-center bg-white '>
          <img src={coin.image} alt={''} className='w-6 h-6' />
        </div>
      </div>

      <div className='flex-grow pl-12 text-slate-100'>
        <div className='flex flex-row items-center'>
          <div className='flex flex-row items-center flex-grow'>
            <div className='ml-2'>
              <p className='text-md text-white font-bold whitespace-nowrap'>
                {coin.name}
              </p>
              <div className='flex items-center'>
                <p className='text-4xl text-slate-100 font-extralight '>
                  {coin.symbol.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
          <div className='mr-8'>
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
            className=' mx-2 text-gray-500/70 hover:text-slate-900 active:text-amber-500'
          >
            <CloseIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackedTile;

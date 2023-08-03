import CloseIcon from '@mui/icons-material/Close';

const PortfoilioTile = ({
  coin,
  isNegativeChange,
  isNegativeChangeValue,
  priceChangePercentage,
  priceChangeValue,
  quantity,
  totalValue,
  totalChange,
  onRemoveItem,
  handleQuantityChange,
  percentageOfPortfolio,
}) => {
 
  return (
    <div
      key={coin.id}
      className='grid grid-cols-[0.5fr,1fr,0.5fr,0.5fr,1fr,1fr,1fr,0.25fr] items-center relative m-1 mx-2  space-x-2 border border-gray-300 rounded w-full shadow-cyan-400/20 shadow-sm text-cyan-200'
    >
      <p className='ml-1 w-6ch border-b border-cyan-400 flex items-center justify-start text-slate-100'>
        {percentageOfPortfolio === 100
          ? '100'
          : Math.floor(percentageOfPortfolio * 100) / 100 > 99.99
          ? '99.99'
          : (Math.floor(percentageOfPortfolio * 100) / 100).toFixed(2)}
        %
      </p>
      <p className=''>{coin.name}</p>
      <p className='text-2xl text-slate-100'>{coin.symbol.toUpperCase()}</p>
      <input
        className='focus:bg-transparent focus:ring-0 active:ring-0 focus:outline-none bg-transparent border '
        type='text'
        placeholder=''
        value={quantity}
        size='7'
        maxLength='7'
        step='any' // Allow decimal increments
        onFocus={(e) => {
          if (e.target.value === '0') {
            handleQuantityChange(coin.id, '');
          }
        }}
        onChange={(e) => {
          let val = e.target.value;
          // If the value is a valid decimal or an empty string
          if (/^\d*\.?\d*$/.test(val)) {
            // If it starts with a zero and is not immediately followed by a dot, remove the leading zero
            if (val[0] === '0' && (val[1] !== '.' || val[1] === undefined)) {
              val = val.slice(1);
            }
            handleQuantityChange(coin.id, val);
          }
        }}
      />

      <p className=''>
        $
        {coin.current_price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>

      <div className=''>
        <p
          className={`${isNegativeChange ? 'text-red-400' : 'text-green-400'}`}
        >
          {priceChangePercentage.toFixed(2)}%
        </p>
        <p
          className={`${
            isNegativeChangeValue ? 'text-red-400' : 'text-green-400'
          }`}
        >
          ${totalChange.toFixed(2)}
        </p>
      </div>
      <p className=''>
        $
        {totalValue.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
      <button
        onClick={() => onRemoveItem(coin.id)}
        className='flex items-center justify-center p-1 text-gray-200 hover:text-cyan-200'
      >
        <CloseIcon />
      </button>
    </div>
  );
};

export default PortfoilioTile;

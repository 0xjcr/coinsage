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
        className='grid grid-cols-7 items-center relative m-1 mx-2  space-x-2 border border-gray-300 rounded w-full shadow-cyan-400/20 shadow-sm '
      >
        <button
          onClick={() => onRemoveItem(coin.id)}
          className='absolute top-0 right-0 p-1'
        >
          <CloseIcon />
        </button>
        <p className='col-span-1'>{percentageOfPortfolio.toFixed(2)}%</p>
        <p className='col-span-1 '>{coin.name}</p>
        <p className='col-span-1 '>{coin.symbol.toUpperCase()}</p>
        <input
          className='col-span-1 bg-transparent focus:bg-transparent focus:ring-0'
          type='text'
          placeholder='Enter quantity'
          value={quantity === '' ? '' : quantity}
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

        <p className='col-span-1 '>
          $
          {coin.current_price.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>

        <div className='col-span-1 '>
          <p
            className={`${
              isNegativeChange ? 'text-red-400' : 'text-green-400'
            }`}
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
        <p className='col-span-1 '>
          $
          {totalValue.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
    );
};

export default PortfoilioTile;

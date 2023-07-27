// import React from 'react';
// import CryptoTableRow from './CryptoTableRow';

// const CryptoList = ({ cryptoList, onAddToSelectedCoins }) => {
//   // Check if cryptoList is empty or not a function
//   if (!cryptoList || !Array.isArray(cryptoList) || cryptoList.length === 0) {
//     return <p>Loading data...</p>;
//   }

//     return (
//       <>
//         <p className='text-gray-400 text-xs text-right'>
//           Powered by CoinGecko API
//         </p>
//         <table className='table w-full mt-4'>
//           <thead>
//             <tr>
//               <th></th>
//               <th className='text-left'>Coin</th>
//               <th className='text-left'></th>
//               <th className='text-left'>Price</th>
//               <th className='text-left'>24h</th>
//               <th ></th>
//               <th className='text-left'>Volume</th>
//               <th className='text-left'>Market Cap</th>
//               <th></th>
//             </tr>
//           </thead>

//           <tbody>
//             {cryptoList.map((crypto) => (
//               <CryptoTableRow
//                 key={crypto.id}
//                 crypto={crypto}
//                 onAddToSelectedCoins={onAddToSelectedCoins}
//               />
//             ))}
//           </tbody>
//         </table>
//       </>
//     );
// };

// export default CryptoList;


import React from 'react';
import CryptoTableRow from './CryptoTableRow';

const CryptoList = ({
  cryptoList,
  onAddToSelectedCoins,
  myPortfolio,
  setMyPortfolio,
}) => {
  // Check if cryptoList is empty or not a function
  if (!cryptoList || !Array.isArray(cryptoList) || cryptoList.length === 0) {
    return <p>Loading data...</p>;
  }

  return (
    <>
      <p className='text-gray-400 text-xs text-right'>
        Powered by CoinGecko API
      </p>
      <table className='table w-full mt-4'>
        <thead>
          <tr>
            <th></th>
            <th className='text-left'>Coin</th>
            <th className='text-left'></th>
            <th className='text-left'>Price</th>
            <th className='text-left'>24h</th>
            <th></th>
            <th className='text-left'>Volume</th>
            <th className='text-left'>Market Cap</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {cryptoList.map((crypto) => (
            <CryptoTableRow
              key={crypto.id}
              crypto={crypto}
              onAddToSelectedCoins={onAddToSelectedCoins}
              myPortfolio={myPortfolio}
              setMyPortfolio={setMyPortfolio}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CryptoList;

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

// API endpoint to fetch crypto assets from CoinGecko
app.get('/api/crypto-assets', async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets',
      {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 250,
          page: 1,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from CoinGecko API' });
  }
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} ✅`);
});


// const express = require('express');
// const cors = require('cors');

// const app = express();
// const port = process.env.PORT || 5000;

// // Enable CORS for all routes
// app.use(cors());

// // Mock data object with 10 coins
// const mockData = {
//   coins: [
//     {
//       id: 'bitcoin',
//       name: 'Bitcoin',
//       symbol: 'BTC',
//       image: 'https://example.com/bitcoin.png',
//       current_price: 40000,
//       price_change_percentage_24h: 2.5,
//       price_change_24h: 1000,
//       total_volume: 50000000000,
//       market_cap: 800000000000,
//     },
//     {
//       id: 'ethereum',
//       name: 'Ethereum',
//       symbol: 'ETH',
//       image: 'https://example.com/ethereum.png',
//       current_price: 3000,
//       price_change_percentage_24h: 3.8,
//       price_change_24h: 200,
//       total_volume: 20000000000,
//       market_cap: 350000000000,
//     },
//     {
//       id: 'binancecoin',
//       name: 'Binance Coin',
//       symbol: 'BNB',
//       image:
//         'https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png',
//       current_price: 312.48,
//       price_change_percentage_24h: -0.24,
//       price_change_24h: -0.76,
//       total_volume: 1843275036,
//       market_cap: 48371975126,
//     },
//     {
//       id: 'tether',
//       name: 'Tether',
//       symbol: 'USDT',
//       image:
//         'https://assets.coingecko.com/coins/images/325/large/Tether-logo.png',
//       current_price: 1.0,
//       price_change_percentage_24h: -0.01,
//       price_change_24h: -0.0001,
//       total_volume: 60277484839,
//       market_cap: 61846882266,
//     },
//     {
//       id: 'cardano',
//       name: 'Cardano',
//       symbol: 'ADA',
//       image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
//       current_price: 1.23,
//       price_change_percentage_24h: 2.3,
//       price_change_24h: 0.028,
//       total_volume: 1597639111,
//       market_cap: 39313236504,
//     },
//     {
//       id: 'ripple',
//       name: 'XRP',
//       symbol: 'XRP',
//       image:
//         'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
//       current_price: 0.5922,
//       price_change_percentage_24h: 0.71,
//       price_change_24h: 0.0042,
//       total_volume: 1213163027,
//       market_cap: 27026022389,
//     },
//     {
//       id: 'dogecoin',
//       name: 'Dogecoin',
//       symbol: 'DOGE',
//       image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
//       current_price: 0.2024,
//       price_change_percentage_24h: 1.43,
//       price_change_24h: 0.0029,
//       total_volume: 964888513,
//       market_cap: 26317362040,
//     },
//     {
//       id: 'polkadot',
//       name: 'Polkadot',
//       symbol: 'DOT',
//       image:
//         'https://assets.coingecko.com/coins/images/12171/large/aJGBjJFU_400x400.jpg',
//       current_price: 14.67,
//       price_change_percentage_24h: 1.33,
//       price_change_24h: 0.1931,
//       total_volume: 1088164703,
//       market_cap: 15058167585,
//     },
//     {
//       id: 'litecoin',
//       name: 'Litecoin',
//       symbol: 'LTC',
//       image: 'https://assets.coingecko.com/coins/images/2/large/litecoin.png',
//       current_price: 134.12,
//       price_change_percentage_24h: -0.5,
//       price_change_24h: -0.67,
//       total_volume: 2553246950,
//       market_cap: 9023380210,
//     },
//     {
//       id: 'bitcoin-cash',
//       name: 'Bitcoin Cash',
//       symbol: 'BCH',
//       image:
//         'https://assets.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png',
//       current_price: 509.87,
//       price_change_percentage_24h: 0.45,
//       price_change_24h: 2.3,
//       total_volume: 1505183687,
//       market_cap: 9523508919,
//     },
//   ],
// };

// // API endpoint to fetch crypto assets from CoinGecko or use mock data
// app.get('/api/crypto-assets', (req, res) => {
//   // You can use a query parameter to specify if you want to use mock data or real data
//   const useMockData = req.query.mock === 'true';

//   if (useMockData) {
//     res.json(mockData);
//   } else {
//     // Here, you can fetch real data from the CoinGecko API
//     // Since this is just a mock server, you can implement the real data fetching logic here
//     // For now, we will return an empty array for real data
//     res.json({ coins: [] });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port} ✅`);
// });
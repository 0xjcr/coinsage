const API_BASE_URL = 'http://localhost:5000/api'; // Update the URL to match your Express server URL

export async function getCoinsByMarketCap() {
  try {
    const response = await fetch(`${API_BASE_URL}/crypto-assets`);
      const data = await response.json();
    console.log(data); 
    return data;
  } catch (error) {
    throw new Error('Error fetching data from the server');
  }
}

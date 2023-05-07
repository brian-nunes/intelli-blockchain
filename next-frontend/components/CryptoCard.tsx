import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface CryptoData {
  BTC: number;
  ETH: number;
  EOS: number;
  DOGE: number;
}

export const CryptoCard: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/crypto');
      setCryptoData(response.data);
    };

    fetchData();
  }, []);

  return (
    <div className="crypto-card">
      <h2>Crypto Balances</h2>
      {cryptoData ? (
        <ul>
          {Object.entries(cryptoData).map(([currency, amount]) => (
            <li key={currency}>
              {currency}: {amount.toFixed(8)}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading crypto data...</p>
      )}
    </div>
  );
};
import useMetaMask from '@/contexts/MetaMaskProvider';
import React, { useEffect, useState } from 'react';

const UserPage: React.FC = () => {
  const {getAccounts, balanceOf} = useMetaMask()
  const [accounts, setAccounts] = useState<Array<{account: string, balance: number}>>([])
  useEffect(() => {
    const fetchData = async () => {
      const accounts_list = await getAccounts();
      const accounts_structure: Array<{account: string, balance: number}> = [];
      accounts_list.forEach(async (account) => {
        const balance = await balanceOf(account);
        accounts_structure.push({account, balance})
      });
      setAccounts(accounts_structure)
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <div className="wallet-cards">
        {accounts.map((account, index) => (
          <div key={index} className="wallet-card">
            <h3>Wallet Address</h3>
            <p>{account.account}</p>
            <h3>Staked Amount</h3>
            <p>{account.balance}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;

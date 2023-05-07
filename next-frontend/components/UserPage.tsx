import React, { useEffect, useState } from 'react';
import WalletCard from './WalletCard';
import useMetaMask from '@/contexts/MetaMaskProvider';

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
          <WalletCard key={index} stakedAmount={account.balance} walletAddress={account.account}/>
        ))}
      </div>
    </div>
  );
};

export default UserPage;

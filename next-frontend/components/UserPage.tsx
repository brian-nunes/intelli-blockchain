import React from 'react';
import WalletCard from './WalletCard';

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
        {mockWalletData.map((wallet, index) => (
          <div key={index} className="wallet-card">
            <h3>Wallet Address</h3>
            <p>{wallet.walletAddress}</p>
            <h3>Staked Amount</h3>
            <p>{wallet.stakedAmount}</p>
            <h3>Staking Pool</h3>
            <p>{wallet.stakingPool}</p>
            <h3>Reward Amount</h3>
            <p>{wallet.rewardAmount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;

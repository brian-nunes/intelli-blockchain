import React from 'react';

const UserPage: React.FC = () => {
  const mockWalletData = [
    {
      walletAddress: '0x12345abcde...',
      stakedAmount: 120,
      stakingPool: 'Lido',
      rewardAmount: 3.5,
    },
    {
      walletAddress: '0x67890fghij...',
      stakedAmount: 50,
      stakingPool: 'Lido',
      rewardAmount: 1.2,
    },
  ];

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

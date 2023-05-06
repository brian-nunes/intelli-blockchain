import React from 'react';

const UserPage: React.FC = () => {
  const mockStakingData = [
    {
      user_id: 1,
      name: 'Alice',
      email: 'alice@example.com',
      staking_amount: 1000,
      pool_share: 0.1,
      rewards: 50,
    },
    {
      user_id: 2,
      name: 'Bob',
      email: 'bob@example.com',
      staking_amount: 2000,
      pool_share: 0.2,
      rewards: 100,
    },
  ];

  return (
    <div>
      <h1>Users</h1>
      <div className="staking-cards">
        {mockStakingData.map((staking, index) => (
          <div key={index} className="staking-card">
            <h3>{staking.name}</h3>
            <p>Email: {staking.email}</p>
            <p>Staking Amount: {staking.staking_amount}</p>
            <p>Pool Share: {staking.pool_share * 100}%</p>
            <p>Rewards: {staking.rewards}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;

import React, { useState } from 'react';

interface WalletCardProps {
  walletAddress: string;
  stakedAmount: number;
  stakingPool: string;
  rewardAmount: number;
}

const WalletCard: React.FC<WalletCardProps> = ({ walletAddress, stakedAmount, stakingPool, rewardAmount }) => {
  const [stakeAmount, setStakeAmount] = useState<number>(0);
  const [unstakeAmount, setUnstakeAmount] = useState<number>(0);

  const handleStake = () => {
    // code to handle stake action
  };

  const handleUnstake = () => {
    // code to handle unstake action
  };

  return (
    <div className="wallet-card">
      <h3>Wallet Address</h3>
      <p>{walletAddress}</p>
      <h3>Staked Amount</h3>
      <p>{stakedAmount}</p>
      <h3>Staking Pool</h3>
      <p>{stakingPool}</p>
      <h3>Reward Amount</h3>
      <p>{rewardAmount}</p>
      <label>
        Stake Amount:
        <input type="number" value={stakeAmount} onChange={(e) => setStakeAmount(parseFloat(e.target.value))} />
      </label>
      <button onClick={handleStake}>Stake</button>
      <label>
        Unstake Amount:
        <input type="number" value={unstakeAmount} onChange={(e) => setUnstakeAmount(parseFloat(e.target.value))} />
      </label>
      <button onClick={handleUnstake}>Unstake</button>
    </div>
  );
};

export default WalletCard;

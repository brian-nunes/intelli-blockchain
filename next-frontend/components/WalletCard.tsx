import useMetaMask from '@/contexts/MetaMaskProvider';
import React, { useState } from 'react';

interface WalletCardProps {
  walletAddress: string;
  stakedAmount: number;
}

const WalletCard: React.FC<WalletCardProps> = ({ walletAddress, stakedAmount }) => {
  const [stakeAmount, setStakeAmount] = useState<number>(0);
  const [unstakeAmount, setUnstakeAmount] = useState<number>(0);

  const {stake, unstake} = useMetaMask()

  const handleStake = async () => {
    await stake(stakeAmount);
  };

  const handleUnstake = async () => {
    await unstake(unstakeAmount);
  };

  return (
    <div className="wallet-card">
      <h3>Wallet Address</h3>
      <p>{walletAddress}</p>
      <h3>Staked Amount</h3>
      <p>{stakedAmount}</p>

      <h3>Stake Amount:</h3>
        <input type="number" value={stakeAmount} onChange={(e) => setStakeAmount(parseFloat(e.target.value))} />
        <button className="light" onClick={handleStake}>Stake</button>
      <h3>Unstake Amount:</h3>
        <input type="number" value={unstakeAmount} onChange={(e) => setUnstakeAmount(parseFloat(e.target.value))} />
      <button className="light" onClick={handleUnstake}>Unstake</button>
    </div>
  );
};

export default WalletCard;

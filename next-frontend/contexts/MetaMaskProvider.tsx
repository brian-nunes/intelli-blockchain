import { AbiCoder, BrowserProvider, Contract, ethers } from 'ethers';
import React, { createContext, useState, ReactNode, useContext } from 'react';
import { governance_contract_data, governance_token_data } from '../solidity_data'
import { sign } from 'crypto';

declare global {
  interface Window { ethereum: any; }
}

interface PollData {
  description: string;
  selectedFunction: string;
  inputValue: number;
}

interface MetaMaskContextProps {
  isConnected: boolean,
  address: string,
  connect: () => void,
  balanceOf: (address: string) => Promise<number>,
  proposalVotes: (proposalId: string) => Promise<Array<number>>; 
  getAccounts: () => Promise<Array<string>>;
  stake: (amount: number) => Promise<void>;
  unstake: (amount: number) => Promise<void>;
  propose: (pollData: PollData) => Promise<void>;
}

export const MetaMaskContext = createContext<MetaMaskContextProps>({
  isConnected: false,
  address: "",
  connect: () => {},
  balanceOf: async (address: string) => {return 0},
  proposalVotes: async (proposalId: string) => {return []} ,
  getAccounts: async () => {return []},
  stake: async (amount: number) => {},
  unstake: async (amount: number) => {},
  propose: async (pollData: PollData) => {}
});

export const MetaMaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");

  let governor_contract: Contract;
  let token_contract: Contract;

  const connect = async () => {
    let provider: BrowserProvider = new ethers.BrowserProvider(window.ethereum)
    let signer: ethers.JsonRpcSigner = await provider.getSigner();
    
    setIsConnected(true);
    setAddress(signer.address);

    governor_contract = new ethers.Contract(governance_contract_data.address, governance_contract_data.abi, signer);
    token_contract = new ethers.Contract(governance_token_data.address, governance_token_data.abi, signer);
  }

  const balanceOf = async (address: string): Promise<number> => {
    return await token_contract.balanceOf(address);
  }

  const proposalVotes = async (proposalId: string): Promise<Array<number>> => {
    return await governor_contract.proposalVotes(proposalId);
  }

  const getAccounts = async (): Promise<Array<string>> => {
    return await window.ethereum._state.accounts;
  }

  const stake = async (amount: number) => {
    return await token_contract.stake(amount);
  }

  const unstake = async (amount: number) => {
    return await token_contract.unstake(amount);
  }

  const propose = async (pollData: PollData) => {
    const tokenAddress = pollData.selectedFunction === 'setStakeLimit' ? governance_token_data.address : governance_contract_data.address;
    const abi = AbiCoder.defaultAbiCoder()
    const transferCalldata = abi.encode([pollData.selectedFunction], [pollData.inputValue]);

    await governor_contract.propose(
      [tokenAddress],
      [0],
      [transferCalldata],
      pollData.description,
    );
  }

  return (
    <MetaMaskContext.Provider value={{ isConnected, address, connect, balanceOf, proposalVotes, getAccounts, stake, unstake, propose}}>
      {children}
    </MetaMaskContext.Provider>
  );
};

const useMetaMask = () => useContext(MetaMaskContext);

export default useMetaMask;
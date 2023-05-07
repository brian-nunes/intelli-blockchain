import { AbiCoder, BrowserProvider, Contract, ethers } from 'ethers';
import React, { createContext, useState, ReactNode, useContext } from 'react';
import { governance_contract_data, governance_token_data } from '../solidity_data'

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

  const BTG_DOL_ADDRESS = "0x0172ae13E3583BF565957095D27caede3Abb172e";

  const getContracts = async () => {
    let provider: BrowserProvider = new ethers.BrowserProvider(window.ethereum)
    let signer: ethers.JsonRpcSigner = await provider.getSigner();
    let governor_contract = new ethers.Contract(governance_contract_data.address, governance_contract_data.abi, signer);
    let token_contract = new ethers.Contract(governance_token_data.address, governance_token_data.abi, signer);
    let btg_dol_contract = new ethers.Contract(BTG_DOL_ADDRESS, governance_token_data.abi, signer);
    return {governor_contract, token_contract, btg_dol_contract}
  }

  const connect = async () => {
    let provider: BrowserProvider = new ethers.BrowserProvider(window.ethereum)
    let signer: ethers.JsonRpcSigner = await provider.getSigner();
    
    setIsConnected(true);
    setAddress(signer.address);
  }

  const balanceOf = async (account: string): Promise<number> => {
    const {token_contract} = await getContracts();
    if(!token_contract) 
      return 0

    console.log(token_contract);
    return await token_contract.balanceOf(account);
  }

  const proposalVotes = async (proposalId: string): Promise<Array<number>> => {
    const {governor_contract} = await getContracts();
    return await governor_contract.proposalVotes(proposalId);
  }

  const getAccounts = async (): Promise<Array<string>> => {
    return await window.ethereum._state.accounts;
  }

  const stake = async (amount: number) => {
    const {token_contract, btg_dol_contract} = await getContracts();
    await btg_dol_contract.approve(governance_token_data.address, amount);
    return await token_contract.stake(amount);
  }

  const unstake = async (amount: number) => {
    const {token_contract} = await getContracts();
    return await token_contract.unstake(amount);
  }

  const propose = async (pollData: PollData) => {
    const tokenAddress = pollData.selectedFunction === 'setStakeLimit' ? governance_token_data.address : governance_contract_data.address;
    const abi = AbiCoder.defaultAbiCoder()
    const transferCalldata = '';

    const {governor_contract} = await getContracts();
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
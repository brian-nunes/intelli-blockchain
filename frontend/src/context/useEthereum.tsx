import { createContext, useState } from "react"

import { Contract, ethers } from "ethers";

import TokenArtifact from "../contracts/contract-abi.json";
import contractAddress from "../contracts/contract-address.json";

// This is the default id used by the Hardhat Network
const HARDHAT_NETWORK_ID = '31337';

// This is an error code that indicates that the user canceled a transaction
const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

declare global {
    interface Window {
      ethereum: any;
    }
}

interface EthereumContextProps {
    selectedAddress: string, 
    tokenData: {name:string, symbol:string}, 
    balance: number, 
    txBeingSent: string | undefined, 
    transactionError: string | undefined, 
    networkError: string | undefined, 
    hasWallet: boolean, 
    stopPollingData: () => void, 
    initializeEthers: () => Promise<void>, 
    startPollingData: () => void
    dismissTransactionError: () => void,
    dismissNetworkError: () => void,
    getRpcErrorMessage: (error: any) => string,
    resetState: () => void,
    checkNetwork: () => void,
    transferTokens: (to: string, amount: number) => Promise<void>,
    connectWallet: () => Promise<void>,
    initialize: (userAddress: string) => Promise<void>
}

export const EthereumContext = createContext<EthereumContextProps>({
    selectedAddress: "", 
    tokenData: {name:"",symbol:""}, 
    balance: 0, 
    txBeingSent: undefined, 
    transactionError: undefined, 
    networkError: undefined,
    hasWallet: false, 
    stopPollingData: () => {console.log("default called stopPollingData")}, 
    initializeEthers: async () => {console.log("default called initializeEthers")}, 
    startPollingData: () => {console.log("default called startPollingData")},
    dismissTransactionError: () => {console.log("default called dismissTransactionError")},
    dismissNetworkError: () => {console.log("default called dismissNetworkError")},
    getRpcErrorMessage: (error) => error.toString("default called getRpcErrorMessage"),
    resetState: () => {console.log("default called resetState")},
    checkNetwork: () => {console.log("default called checkNetwork")},
    transferTokens: async (to, amount) => {console.log(to + '-' + amount)},
    connectWallet: async () => {console.log("default called connectWallet")},
    initialize: async (userAddress) => {console.log(userAddress)}
});

interface MyProviderProps {
    children: React.ReactNode;
}
  

export const EthereumProvider: React.FC<MyProviderProps> = ({ children }) => {
    const [selectedAddress, setSelectedAddress] = useState<string>("");
    const [tokenData, setTokenData] = useState<{name:string, symbol:string}>({name: "", symbol: ""});
    const [balance, setBalance] = useState<number>(0);
    const [txBeingSent, setTxBeingSent] = useState<string | undefined>(undefined);
    const [transactionError, setTransactionError] = useState<string | undefined>(undefined);
    const [hasWallet, setHasWallet] = useState<boolean>(false);
    const [networkError, setNetworkError] = useState<string | undefined>(undefined);

    let _pollDataInterval: NodeJS.Timer | undefined;
    let contract: Contract;

    const initializeEthers = async () =>  {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      contract = new ethers.Contract(
        contractAddress.Token,
        TokenArtifact.abi,
        provider.getSigner(0)
      )

      const name: string = await contract.name();
      const symbol: string = await contract.symbol();

      setHasWallet(true);

      setTokenData({ name, symbol });

      startPollingData();

      console.log("fim")
      console.log(hasWallet);
    }

    const startPollingData = () =>  {
      _pollDataInterval = setInterval(() => updateBalance(), 1000);

      updateBalance();
    }
    
    const stopPollingData = () =>  {
      clearInterval(_pollDataInterval);
      _pollDataInterval = undefined;
    }

    const updateBalance = async () => {
      console.log(contract?.address);
      console.log(tokenData.name);
      console.log(tokenData.symbol);
      setBalance(await contract?.balanceOf(selectedAddress));
    }

    const dismissTransactionError = () => {
      setTransactionError(undefined);
    }

    const dismissNetworkError = () => {
      setNetworkError(undefined);
    }

    const getRpcErrorMessage = (error: any) => {
      if (error.data) {
          return error.data.message;
      } else {
          return error.message;
      }
    }

    const resetState = () => {
        setSelectedAddress("");
        setTokenData({name: "", symbol: ""});
        setBalance(0);
        setTxBeingSent(undefined);
        setTransactionError(undefined);
        setHasWallet(false);
        setNetworkError(undefined);
    }

    const switchChain = async () => {
        const chainIdHex = `0x${HARDHAT_NETWORK_ID.toString()}`
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chainIdHex }],
        });
        await initialize(selectedAddress);
    }

    const checkNetwork = () => {
        if (window.ethereum.networkVersion !== HARDHAT_NETWORK_ID) {
            switchChain();
        }
    }

    const transferTokens = async (to: string, amount: number) => {
        try {
          dismissTransactionError();
          const tx = await contract?.transfer(to, amount);
          setTxBeingSent(tx.hash);
    
          const receipt = await tx.wait();
    
          if (receipt.status === 0) {
            throw new Error("Transaction failed");
          }
    
          await updateBalance();
        } catch (error: any) {
          if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
            return;
          }
    
          console.error(error);
          setTransactionError(error);
        } finally {
          setTxBeingSent(undefined);
        }
    }

    const connectWallet = async () => {
        const [selectedAddress] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setSelectedAddress(selectedAddress);
        checkNetwork();
    
        await initialize(selectedAddress);

        startPollingData();
    
        window.ethereum.on("accountsChanged", ([newAddress]: string[]) => {
          stopPollingData();
          if (newAddress === undefined) {
            return resetState();
          }
          
          initialize(newAddress);
        });
      }
    
      const initialize = async (userAddress: string) => {

        setSelectedAddress(userAddress);
    
        initializeEthers();
        startPollingData();
      }

    const contextValue: EthereumContextProps = {
        selectedAddress,
        tokenData,
        balance,
        txBeingSent,
        transactionError,
        networkError,
        hasWallet,
        stopPollingData,
        initializeEthers,
        startPollingData,
        dismissTransactionError,
        dismissNetworkError,
        getRpcErrorMessage,
        resetState,
        checkNetwork,
        transferTokens,
        connectWallet,
        initialize
    };
  
    return <EthereumContext.Provider value={contextValue}>{children}</EthereumContext.Provider>;
  };



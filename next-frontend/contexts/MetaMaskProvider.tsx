import { ethers } from 'ethers';
import React, { createContext, useState, ReactNode, useContext } from 'react';

declare global {
  interface Window { ethereum: any; }
}

interface MetaMaskContextProps {
  isConnected: boolean,
  connect: () => void,
  signer: ethers.Signer | undefined,
  provider: ethers.Provider | undefined
}

export const MetaMaskContext = createContext<MetaMaskContextProps>({
  isConnected: false,
  connect: () => { },
  signer: undefined,
  provider: undefined,
});

export const MetaMaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [provider, setProvider] = useState<ethers.Provider>();
  const [signer, setSigner] = useState<ethers.Signer>();

  const fetchData = async () => {
    let provider_temp = new ethers.BrowserProvider(window.ethereum)
    let signer_temp = await provider_temp.getSigner();
    
    setIsConnected(true)
    setProvider(provider_temp)
    setSigner(signer_temp)
  }

  const connect = () => {
    fetchData().catch((error) => console.log(error))
  }

  return (
    <MetaMaskContext.Provider value={{ isConnected, connect, provider, signer }}>
      {children}
    </MetaMaskContext.Provider>
  );
};

const useMetaMask = () => useContext(MetaMaskContext);

export default useMetaMask;
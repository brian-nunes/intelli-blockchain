import React, { useContext } from "react";
import { EthereumContext } from "../context/useEthereum";

const NoTokensMessage: React.FC = () => {
  const { selectedAddress } = useContext(EthereumContext);
  return (
    <>
      <p>You don't have tokens to transfer</p>
      <p>
        To get some tokens, open a terminal in the root of the repository and run: 
        <br />
        <br />
        <code>npx hardhat --network localhost faucet {selectedAddress}</code>
      </p>
    </>
  );
}

export default NoTokensMessage;

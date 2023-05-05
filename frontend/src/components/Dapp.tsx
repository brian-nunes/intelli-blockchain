import React, { useContext, useEffect } from "react";

import NoWalletDetected from "./NoWalletDetected";
import ConnectWallet from "./ConnectWallet";
import Loading from "./Loading";
import Transfer from "./Transfer";
import TransactionErrorMessage from "./TransactionErrorMessage";
import WaitingForTransactionMessage from "./WaitingForTransactionMessage";
import NoTokensMessage from "./NoTokensMessage";
import { EthereumContext } from "../context/useEthereum";

const Dapp: React.FC = () => {
    const {
      selectedAddress, 
      tokenData, 
      balance, 
      txBeingSent, 
      transactionError, 
      hasWallet, 
      stopPollingData, 
      initializeEthers, 
    } = useContext(EthereumContext);
  
    useEffect(() => {
      const initialize = async () => {
        await initializeEthers();
      };
    
      initialize();
    
      return stopPollingData;
    }, []);

    if (!hasWallet) {
      return <NoWalletDetected />;
    }

    if (selectedAddress) {
      return <ConnectWallet />;
    }

    if (!tokenData || !balance) {
      return <Loading />;
    }

    return (
      <div className="container p-4">
        <div className="row">
          <div className="col-12">
            <h1>
              {tokenData.name} ({tokenData.symbol})
            </h1>
            <p>
              Welcome <b>{selectedAddress}</b>, you have{" "}
              <b>
                {balance.toString()} {tokenData.symbol}
              </b>
              .
            </p>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-12">
            {txBeingSent && (<WaitingForTransactionMessage />)}
            {transactionError && (<TransactionErrorMessage />)}
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            {balance === 0 && (<NoTokensMessage />)}

            {balance > 0 && (<Transfer />)}
          </div>
        </div>
      </div>
    );
  }

 export default Dapp;

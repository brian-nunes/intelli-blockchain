import React, { useContext } from "react";

import NetworkErrorMessage from "./NetworkErrorMessage";
import { EthereumContext } from "../context/useEthereum";

const ConnectWallet: React.FC = () => {
  const { connectWallet, networkError } = useContext(EthereumContext);
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-12 text-center">
          {networkError && (<NetworkErrorMessage />)}
        </div>
        <div className="col-6 p-4 text-center">
          <p>Please connect to your wallet.</p>
          <button
            className="btn btn-warning"
            type="button"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConnectWallet;

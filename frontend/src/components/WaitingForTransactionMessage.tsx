import React, { useContext } from "react";
import { EthereumContext } from "../context/useEthereum";

const WaitingForTransactionMessage: React.FC = () => {
  const { txBeingSent } = useContext(EthereumContext);

  return (
    <div className="alert alert-info" role="alert">
      Waiting for transaction <strong>{txBeingSent}</strong> to be mined
    </div>
  );
}

export default WaitingForTransactionMessage;

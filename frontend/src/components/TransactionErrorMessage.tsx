import React, { useContext } from "react";
import { EthereumContext } from "../context/useEthereum";

const TransactionErrorMessage: React.FC = () => {
  const { transactionError, dismissTransactionError } = useContext(EthereumContext);
  return (
    <div className="alert alert-danger" role="alert">
      Error sending transaction: {transactionError?.substring(0, 100)}
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={dismissTransactionError}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}

export default TransactionErrorMessage;

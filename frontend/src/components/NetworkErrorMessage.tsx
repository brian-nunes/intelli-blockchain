import React, { useContext } from "react";
import { EthereumContext } from "../context/useEthereum";

const NetworkErrorMessage: React.FC = () => {
  const { networkError, dismissNetworkError } = useContext(EthereumContext);
  return (
    <div className="alert alert-danger" role="alert">
      {networkError}
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={dismissNetworkError}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}

export default NetworkErrorMessage;

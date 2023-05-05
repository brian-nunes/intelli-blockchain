import React, { useContext } from "react";
import { EthereumContext } from "../context/useEthereum";

const Transfer: React.FC = () => {
  const { transferTokens, tokenData } = useContext(EthereumContext);
  return (
    <div>
      <h4>Transfer</h4>
      <form
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          // This function just calls the transferTokens callback with the
          // form's data.
          event.preventDefault();

          const formData = new FormData(event.target as HTMLFormElement);
          const to = formData.get("to");
          const amount = formData.get("amount");

          if (to && amount) {
            transferTokens(to.toString(), +amount);
          }
        }}
      >
        <div className="form-group">
          <label>Amount of {tokenData.name}</label>
          <input
            className="form-control"
            type="number"
            step="1"
            name="amount"
            placeholder="1"
            required
          />
        </div>
        <div className="form-group">
          <label>Recipient address</label>
          <input className="form-control" type="text" name="to" required />
        </div>
        <div className="form-group">
          <input className="btn btn-primary" type="submit" value="Transfer" />
        </div>
      </form>
    </div>
  );
}

export default Transfer;

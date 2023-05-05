import React from "react";
import ReactDOM from "react-dom/client";
import Dapp from "./components/Dapp.tsx";
import "bootstrap/dist/css/bootstrap.css";
import { EthereumProvider } from "./context/useEthereum.tsx";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <EthereumProvider>
      <Dapp />
    </EthereumProvider>
  </React.StrictMode>
);

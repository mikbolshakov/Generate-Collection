import React from "react";
import Wallet from "./components/wallet/wallet";
import ListNfts from "./components/listNfts/listNfts";
import MintNft from "./components/mintNft/mintNft";
import "./App.css";

function App() {
  return (
    <div className="container">
      <div className="section" id="mint">
        <MintNft />
      </div>
      <div className="section" id="wallet">
        <Wallet />
      </div>
      <div className="section" id="list">
        <ListNfts />
      </div>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import Wallet from "./components/wallet/wallet";
import ListNfts from "./components/listNfts/listNfts";
import MintNft from "./components/mintNft/mintNft";
import UpdateWallets from "./components/updateWallets/updateWallets";
import arrow from "./additions/arrow.png";
import "./App.css";

function App() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldShowButton = document.documentElement.scrollTop > 100;
      setShowButton(shouldShowButton);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="container">
      <div className="section" id="mint">
        <MintNft />
      </div>
      <div className="section" id="mint">
        <UpdateWallets />
      </div>
      <div className="section" id="wallet">
        <Wallet />
      </div>
      <div className="section" id="list">
        <ListNfts />
      </div>
      {showButton && (
        <img
          className="scroll-top-button"
          onClick={scrollToTop}
          src={arrow}
          alt="UP"
        />
      )}
    </div>
  );
}

export default App;

import React from "react";
import Wallet from "./components/Wallet";
import NFTList from "./components/NFTList";
import MintPage from "./components/mint/Mint";
import Transfer from "./components/Transfer";
import arrow from "./images/arrow.png";
import "./App.css";

function App() {
  const [showButton, setShowButton] = React.useState(false);

  React.useEffect(() => {
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
        <MintPage />
      </div>
      <div className="section" id="transfer">
        <Transfer />
      </div>
      <div className="section" id="wallet">
        <Wallet />
      </div>
      <div className="section" id="list">
        <NFTList />
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

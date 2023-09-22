import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import contractAbi from "../ABI/contractAbi.json";

const contractAddress = "0x15d790f36CB5d0fa86B669D703534AefAd58eCCf";
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, contractAbi, signer);

const MintComponent = () => {
  const [walletAddress, setWalletAddress] = useState("");

  const handleMint = async (e) => {
    e.preventDefault();
    try {
      const value = ethers.utils.parseEther((0.01 * 1).toFixed(5));
      const tx = await contract.publicMint(1, false, {
        value: value,
      });
      await tx.wait();
      alert("Successful minting!");
    } catch (error) {
      alert("Limitation in a smart contract");
      console.error(error);
    }
  };

  const connectMetamaskHandler = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((res) => {
            console.log(res);
            return res;
          });

        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Install MetaMask extension!");
    }
  };

  useEffect(() => {
    connectMetamaskHandler();
  }, []);

  return (
    <div className="mint-container">
      <button className="nft-button" onClick={handleMint}>
        Transfer NFT
      </button>
    </div>
  );
};

export default MintComponent;

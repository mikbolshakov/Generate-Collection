import React from "react";
import { ethers } from "ethers";
import contractAbi from "../../additions/contractAbi.json";
import axios from "axios";
import "./updateWallets.css";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, contractAbi, signer);

const UpdateWallets = () => {
  const updateOwnersAddresses = async () => {
    try {
      let currentTokenCount;
      let tx = await contract.getTokenCounter();
      currentTokenCount = tx.toNumber();

      for (let tokenId = 1; tokenId < currentTokenCount; tokenId++) {
        const owner = await contract.ownerOf(tokenId);
        const tokenIdStr = tokenId.toString();

        try {
          const existingWallet = await axios.get(
            `http://localhost:3500/nfts/${tokenIdStr}`
          );
          if (existingWallet && existingWallet.data.walletAddress !== owner) {
            const response = await axios.put(
              `http://localhost:3500/nfts/${tokenIdStr}`,
              {
                walletAddress: owner,
              }
            );

            if (response.status === 200) {
              console.log(`Address updated for token ${tokenId}: ${owner}`);
            } else {
              console.log(`Failed to update address for token ${tokenId}`);
            }
          }
        } catch (error) {
          console.error(
            `Failed to update address for token ${tokenId}: `,
            error
          );
        }
      }
      window.location.reload();
    } catch (error) {
      console.error("Failed to update owners' addresses: ", error);
    }
  };

  return (
    <div className="mint-container">
      <button className="mint-button" onClick={updateOwnersAddresses}>
        Update wallets
      </button>
    </div>
  );
};

export default UpdateWallets;

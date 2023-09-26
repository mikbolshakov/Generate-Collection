import React, { useState } from "react";
import { ethers } from "ethers";
import contractAbi from "../../additions/contractAbi.json";
import axios from "axios";
import "./mintNft.css";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, contractAbi, signer);

const MintNft = () => {
  const [openMintModal, setOpenMintModal] = useState(false);
  const [newWatch, setNewWatch] = useState({
    id: "",
    walletAddress: "",
    desc: "",
  });
  const [fieldFocused, setFieldFocused] = useState({
    id: false,
    walletAddress: false,
    desc: false,
  });

  const openMintModalWindow = () => {
    setOpenMintModal(true);
  };

  const closeMintModalWindow = () => {
    setOpenMintModal(false);
    setNewWatch({
      id: "",
      walletAddress: "",
      desc: "",
    });
    setFieldFocused({
      id: false,
      walletAddress: false,
      desc: false,
    });
  };

  const validateForm = () => {
    const { walletAddress, desc } = newWatch;
    if (!walletAddress.startsWith("0x") || walletAddress.length !== 42)
      alert(
        'The wallet address must start with "0x" and be 42 characters long'
      );
    else if (!desc) alert("Enter the description of the Watch");
    return false;
  };

  const mintNFT = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      let receipt;
      let tokenId;

      try {
        let tx = await contract.safeMint(newWatch.walletAddress, "uri");
        receipt = await tx.wait();
        tx = await contract.getTokenCounter();
        tokenId = tx.toNumber();
      } catch (error) {
        alert("Limitation in a smart contract");
        console.error("Failed to mint NFT on the smart contract: ", error);
      }

      if (receipt && receipt.status === 1) {
        try {
          await axios.post("http://localhost:3500/watches", {
            id: tokenId,
            walletAddress: newWatch.walletAddress,
            desc: newWatch.desc,
          });
          closeMintModalWindow();
          window.location.reload();
        } catch (error) {
          alert("Limitation in a database");
          console.error("Failed to add Watch to database: ", error);
        }
      } else {
        console.log("Error when executing a transaction on the smart contract");
      }
    } else {
      console.log("validate failed");
    }
  };

  // display text in input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWatch({
      ...newWatch,
      [name]: value,
    });
  };

  // the input description disappears when the cursor is in the input
  const handleFieldFocus = (fieldName) => {
    setFieldFocused({
      ...fieldFocused,
      [fieldName]: true,
    });
  };

  // without it, the input description disappears if you switch to another input
  const handleFieldBlur = (fieldName) => {
    if (newWatch[fieldName] === "") {
      setFieldFocused({
        ...fieldFocused,
        [fieldName]: false,
      });
    }
  };

  return (
    <div className="mint-container">
      <button className="mint-button" onClick={openMintModalWindow}>
        Mint NFT
      </button>

      {openMintModal && (
        <div className="modal">
          <div className="modal-overlay">
            <h2>Mint Watch</h2>
            <div className="nft-form">
              <div className="form-group">
                <input
                  name="walletAddress"
                  className={`form-input `}
                  value={newWatch.walletAddress}
                  onChange={handleInputChange}
                  onFocus={() => handleFieldFocus("walletAddress")}
                  onBlur={() => handleFieldBlur("walletAddress")}
                />
                <label className={`form-label`}>
                  {fieldFocused.walletAddress || newWatch.walletAddress !== ""
                    ? ""
                    : "Recipient wallet address"}
                </label>
              </div>

              <div className="form-group">
                <input
                  name="desc"
                  className={`form-input `}
                  value={newWatch.desc}
                  onChange={handleInputChange}
                  onFocus={() => handleFieldFocus("desc")}
                  onBlur={() => handleFieldBlur("desc")}
                />
                <label className={`form-label `}>
                  {fieldFocused.desc || newWatch.desc !== ""
                    ? ""
                    : "NFT's description"}
                </label>
              </div>

              <div className="mint-modal">
                <button className="mint-modal-button" onClick={mintNFT}>
                  Mint NFT
                </button>
                <button
                  className="close-modal-button"
                  onClick={closeMintModalWindow}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MintNft;

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import contractAbi from "../../ABI/contractAbi.json";
import axios from "axios";
import "./Mint.css";
import IPFS from 'ipfs-http-client';

const contractAddress = "0x15d790f36CB5d0fa86B669D703534AefAd58eCCf";
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, contractAbi, signer);

const MintComponent = ({onMintSuccess}) => {
  const [showMintModal, setShowMintModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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
    setShowMintModal(true);
  };

  const handleModalClose = () => {
    setShowMintModal(false);
    setShowTransferModal(false);
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



//   const ipfs = IPFS.create();
//   //{ host: 'YOUR_IPFS_API_ENDPOINT', port: 5001, protocol: 'https' }

//   const uploadMetadataToIPFS = async (metadata) => {
//     try {
//       const metadataCID = await ipfs.add(JSON.stringify(metadata));
//       console.log(metadataCID)
//       return metadataCID.path;
//     } catch (error) {
//       console.error('Failed to upload metadata to IPFS:', error);
//       throw error;
//     }
//   };


  const mintNFT = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3500/watches", {
        id: newWatch.id,
        walletAddress: newWatch.walletAddress,
        desc: newWatch.desc,
      });

    // const metadata = {
    //     id: newWatch.id,
    //     walletAddress: newWatch.walletAddress,
    //     desc: newWatch.desc,
    //   };
    //   const metadataCID = await uploadMetadataToIPFS(metadata);
    //   await contract.safeMint(signer.address, metadataCID);
      handleModalClose();
      onMintSuccess(); /// gpt
    } catch (error) {
      alert("Limitation in a database");
      console.error("Failed to add employee to database: ", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWatch({
      ...newWatch,
      [name]: value,
    });
  };

  const handleFieldFocus = (fieldName) => {
    setFieldFocused({
      ...fieldFocused,
      [fieldName]: true,
    });
  };

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
      <button className="nft-button" onClick={openMintModalWindow}>
        Mint NFT
      </button>

      {showMintModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Mint Watch</h2>
            <div className="employee-form">
              <div className="form-group">
                <input
                  type="text"
                  id="id"
                  name="id"
                  className={`form-input ${
                    fieldFocused.id || newWatch.id !== ""
                      ? "form-input-filled"
                      : ""
                  }`}
                  value={newWatch.id}
                  onChange={handleInputChange}
                  onFocus={() => handleFieldFocus("id")}
                  onBlur={() => handleFieldBlur("id")}
                />
                <label
                  className={`form-label ${
                    fieldFocused.id || newWatch.id !== ""
                      ? "form-label-hidden"
                      : ""
                  }`}
                  htmlFor="id"
                >
                  {fieldFocused.id || newWatch.id !== "" ? "" : "Id"}
                </label>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  id="walletAddress"
                  name="walletAddress"
                  className={`form-input ${
                    fieldFocused.walletAddress || newWatch.walletAddress !== ""
                      ? "form-input-filled"
                      : ""
                  }`}
                  value={newWatch.walletAddress}
                  onChange={handleInputChange}
                  onFocus={() => handleFieldFocus("walletAddress")}
                  onBlur={() => handleFieldBlur("walletAddress")}
                />
                <label
                  className={`form-label ${
                    fieldFocused.walletAddress || newWatch.walletAddress !== ""
                      ? "form-label-hidden"
                      : ""
                  }`}
                  htmlFor="walletAddress"
                >
                  {fieldFocused.walletAddress || newWatch.walletAddress !== ""
                    ? ""
                    : "Wallet address"}
                </label>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  id="desc"
                  name="desc"
                  className={`form-input ${
                    fieldFocused.desc || newWatch.desc !== ""
                      ? "form-input-filled"
                      : ""
                  }`}
                  value={newWatch.desc}
                  onChange={handleInputChange}
                  onFocus={() => handleFieldFocus("desc")}
                  onBlur={() => handleFieldBlur("desc")}
                />
                <label
                  className={`form-label ${
                    fieldFocused.desc || newWatch.desc !== ""
                      ? "form-label-hidden"
                      : ""
                  }`}
                  htmlFor="desc"
                >
                  {fieldFocused.desc || newWatch.desc !== "" ? "" : "Salary"}
                </label>
              </div>

              {/* {error && <p className="error">{error}</p>} */}
              <div className="button-group">
                <button className="add-employee-button" onClick={mintNFT}>
                  Mint NFT
                </button>
                <button
                  className="close-modal-button"
                  onClick={handleModalClose}
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

export default MintComponent;

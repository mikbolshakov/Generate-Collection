import React, { useState } from "react";
import axios from "axios";
import "./mintNft.css";

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

  const mintNFT = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3500/watches", {
        id: newWatch.id,
        walletAddress: newWatch.walletAddress,
        desc: newWatch.desc,
      });
      closeMintModalWindow();
    } catch (error) {
      alert("Limitation in a database");
      console.error("Failed to add employee to database: ", error);
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
                  name="id"
                  className={`form-input `}
                  value={newWatch.id}
                  onChange={handleInputChange}
                  onFocus={() => handleFieldFocus("id")}
                  onBlur={() => handleFieldBlur("id")}
                />
                <label className={`form-label `}>
                  {fieldFocused.id || newWatch.id !== "" ? "" : "NFT's id"}
                </label>
              </div>

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

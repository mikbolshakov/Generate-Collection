import React, { useState } from "react";
import { ethers } from "ethers";
import contractAbi from "../../additions/contractAbi.json";
import axios from "axios";
import "./addAdmin.css";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, contractAbi, signer);

const AddAdmin = () => {
  const [openAdminModal, setOpenAdminModal] = useState(false);

  const [newAdmin, setNewAdmin] = useState({
    walletAddress: "",
  });
  const [fieldFocused, setFieldFocused] = useState({
    walletAddress: false,
  });

  const openAdminModalWindow = () => {
    setOpenAdminModal(true);
  };

  const closeAdminModalWindow = () => {
    setOpenAdminModal(false);
    setNewAdmin({
      walletAddress: "",
    });
    setFieldFocused({
      walletAddress: false,
    });
  };

  const validateForm = () => {
    const { walletAddress } = newAdmin;
    if (!walletAddress.startsWith("0x") || walletAddress.length !== 42) {
      alert(
        'The wallet address must start with "0x" and be 42 characters long'
      );
      return false;
    }
    return true;
  };

  const addAdminFunc = async (e) => {
    e.preventDefault();
    let minterRole =
      "0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6";
    let receipt;

    if (validateForm()) {
      try {
        let tx = await contract.grantRole(minterRole, newAdmin.walletAddress);
        receipt = await tx.wait();
      } catch (error) {
        alert("Limitation in a smart contract");
        console.error("Failed to mint NFT on the smart contract: ", error);
      }
      if (receipt && receipt.status === 1) {
        try {
          await axios.post("http://localhost:3500/admins", {
            walletAddress: newAdmin.walletAddress.toLowerCase(),
          });
          closeAdminModalWindow();
        } catch (error) {
          alert("Limitation in a database");
          console.error("Failed to add Admin to database: ", error);
        }
      } else {
        console.log("Error when executing a transaction on the smart contract");
      }
    } else {
      console.log("Validation failed");
    }
  };

  // display text in input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin({
      ...newAdmin,
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
    if (newAdmin[fieldName] === "") {
      setFieldFocused({
        ...fieldFocused,
        [fieldName]: false,
      });
    }
  };

  return (
    <div className="mint-container">
      <button className="wallet-button" onClick={openAdminModalWindow}>
        Add admin
      </button>

      {openAdminModal && (
        <div className="modal">
          <div className="modal-overlay">
            <h2>Add admin's wallet</h2>
            <div className="nft-form">
              <div className="form-group">
                <input
                  name="walletAddress"
                  className={`form-input `}
                  value={newAdmin.walletAddress}
                  onChange={handleInputChange}
                  onFocus={() => handleFieldFocus("walletAddress")}
                  onBlur={() => handleFieldBlur("walletAddress")}
                />
                <label className={`form-label `}>
                  {fieldFocused.walletAddress || newAdmin.walletAddress !== ""
                    ? ""
                    : "Wallet address"}
                </label>
              </div>

              <div className="mint-modal">
                <button className="mint-modal-button" onClick={addAdminFunc}>
                  Add Admin
                </button>
                <button
                  className="close-modal-button"
                  onClick={closeAdminModalWindow}
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

export default AddAdmin;

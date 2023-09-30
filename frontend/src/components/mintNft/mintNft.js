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
  const [fileImg, setFileImg] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [openMintModal, setOpenMintModal] = useState(false);
  const [newWatch, setNewWatch] = useState({
    walletAddress: "",
    desc: "",
  });
  const [fieldFocused, setFieldFocused] = useState({
    walletAddress: false,
    desc: false,
  });

  const openMintModalWindow = () => {
    setOpenMintModal(true);
  };

  const closeMintModalWindow = () => {
    setOpenMintModal(false);
    setFileImg(null);
    setNewWatch({
      walletAddress: "",
      desc: "",
    });
    setFieldFocused({
      walletAddress: false,
      desc: false,
    });
    setIsImageUploaded(false);
  };

  const validateForm = () => {
    const { walletAddress, desc } = newWatch;
    if (!walletAddress.startsWith("0x") || walletAddress.length !== 42) {
      alert(
        'The wallet address must start with "0x" and be 42 characters long'
      );
      return false;
    }
    if (!desc) {
      alert("Enter the description of the Watch");
      return false;
    }
    return true;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFileImg(selectedFile);
    setIsImageUploaded(true);
  };

  const mintNFT = async (e) => {
    e.preventDefault();

    let imgLink;
    let jsonLink;
    let receipt;
    let tokenId;

    if (validateForm()) {
      if (fileImg) {
        try {
          const formData = new FormData();
          formData.append("file", fileImg);
          const resFile = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data: formData,
            headers: {
              pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
              pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET}`,
              "Content-Type": "multipart/form-data",
            },
          });
          imgLink = `https://scarlet-ideal-lynx-170.mypinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        } catch (error) {
          console.log("Error sending File to IPFS: ");
          console.log(error);
        }
      }

      const jsonData = {
        name: "Эксклюзивные часы ручной работы EMIVN",
        description: newWatch.desc,
        image: imgLink,
      };
      const jsonString = JSON.stringify(jsonData, null, 2);

      try {
        const resJson = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
          data: jsonString,
          headers: {
            pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
            pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET}`,
            "Content-Type": "application/json",
          },
        });
        jsonLink = `https://scarlet-ideal-lynx-170.mypinata.cloud/ipfs/${resJson.data.IpfsHash}`;
        console.log(jsonLink);
      } catch (error) {
        console.log("Error sending JSON to IPFS: ");
        console.log(error);
      }

      try {
        let tx = await contract.safeMint(newWatch.walletAddress, jsonLink);
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
      console.log("Validation failed");
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
                  type="file"
                  name="file"
                  className="form-input"
                  onChange={handleFileChange}
                />
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
                <button
                  className="mint-modal-button"
                  onClick={mintNFT}
                  disabled={!isImageUploaded}
                >
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

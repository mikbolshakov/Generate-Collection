import React, { useEffect, useState } from "react";
import axios from "axios";
import "./listNfts.css";

function ListNfts() {
  const [nfts, setNfts] = useState([]);
  const [searchIdQuery, setSearchIdQuery] = useState("");
  const [searchWalletQuery, setSearchWalletQuery] = useState("");

  useEffect(() => {
    const fetchNfts = async () => {
      try {
        const response = await axios.get("http://localhost:3500/all");
        setNfts(response.data);
      } catch (error) {
        console.error(error);
        alert("NFT display error");
      }
    };
    fetchNfts();
  }, []);

  const renderTableRows = () => {
    return nfts
      .filter(
        (nft) =>
          nft.id.toString().includes(searchIdQuery.toString()) &&
          nft.walletAddress
            .toLowerCase()
            .includes(searchWalletQuery.toLowerCase())
      )
      .map((nft, index) => (
        <tr key={index}>
          <td>
            <span>{nft.id}</span>
          </td>
          <td>
            <span>{nft.walletAddress}</span>
          </td>
          <td>
            <span>{nft.desc}</span>
          </td>
        </tr>
      ));
  };

  return (
    <div>
      <div>
        <div>
          <h1 className="list_title">NFT Collection</h1>

          <input
            value={searchIdQuery}
            onChange={(e) => setSearchIdQuery(e.target.value)}
            placeholder="Search by NFT id"
            className="search-input"
          />

          <input
            value={searchWalletQuery}
            onChange={(e) => setSearchWalletQuery(e.target.value)}
            placeholder="Search by NFT holder's wallet"
            className="search-input"
          />

          <table className="list_table">
            <thead>
              <tr>
                <th>NFT's id</th>
                <th>Owner's wallet</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListNfts;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./listNfts.css";

function ListNfts() {
  const [watches, setWatches] = useState([]);
  const [searchIdQuery, setSearchIdQuery] = useState("");
  const [searchWalletQuery, setSearchWalletQuery] = useState("");

  useEffect(() => {
    const fetchWatches = async () => {
      try {
        const response = await axios.get("http://localhost:3500/all");
        setWatches(response.data);
      } catch (error) {
        console.error(error);
        alert("Watches display error");
      }
    };
    fetchWatches();
  }, []);

  const renderTableRows = () => {
    return watches
      .filter(
        (watch) =>
          watch.id.toString().includes(searchIdQuery.toString()) &&
          watch.walletAddress
            .toLowerCase()
            .includes(searchWalletQuery.toLowerCase())
      )
      .map((watch, index) => (
        <tr key={index}>
          <td>
            <span>{watch.id}</span>
          </td>
          <td>
            <span>{watch.walletAddress}</span>
          </td>
          <td>
            <span>{watch.desc}</span>
          </td>
        </tr>
      ));
  };

  return (
    <div>
      <div>
        <div>
          <h1 className="list_title">EMIVN WATCH Collection</h1>

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
                <th>id часов</th>
                <th>Кошелек</th>
                <th>Описание</th>
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

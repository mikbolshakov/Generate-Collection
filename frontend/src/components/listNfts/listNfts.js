import React, { useEffect, useState } from "react";
import axios from "axios";
import "./listNfts.css";

function ListNfts() {
  const [watches, setWatches] = useState([]);

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
    return watches.map((watch, index) => (
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
          <h1 className="list_title">EMIVN Watches NFT</h1>
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

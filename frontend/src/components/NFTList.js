import React from "react";
import axios from "axios";

function NFTList() {
  const [watches, setWatches] = React.useState([]);


  React.useEffect(() => {
    fetchWatches();
  }, []);


  const fetchWatches = async () => {
    try {
      const response = await axios.get("http://localhost:3500/all");
      setWatches(response.data);
    } catch (error) {
      console.error(error);
      alert("Watches display error");
    }
  };

  const renderTableRows = () => {
    return watches.map((watch, index) => (
      <tr key={index}>
        <td>
          <span>{watch.id}</span>
        </td>
        <td>
          <span className="smallText">{watch.walletAddress}</span>
        </td>
        <td>
          <span>{watch.desc}</span>
        </td>
        <td>
          <button className="table-button">Transfer</button>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <div className="about-paragraph">
        <div className="about-text">
          <h1 className="title">EMIVN Watches NFT</h1>
          <table className="table">
            <thead>
              <tr>
                <th>id часов</th>
                <th>Кошелек</th>
                <th>Описание</th>
                <th>Трансфер</th>
              </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default NFTList;

import React, { useEffect, useState } from "react";
import { Row, Col } from "antd"; // Import Ant Design's Row and Col components
import { hangtag } from "../../utils/axios"; // Adjust the import path as necessary
import Beatquote from "./beatquote"; // Import your Beatquote component
import "./clothingcard.css"; // Import your CSS file
import { SearchOutlined } from "@ant-design/icons";

const Hangtags = () => {
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const card1 = [
    {
      id: 1,
      image: "../images/x-small.jpg",
      title: "Fancy Hangtags",
      link: "/fancy-hangtags",
    },
  ];
  const StoreProductId = (id, title) => {
    localStorage.setItem("selectedHangtagId", id);
    localStorage.setItem("selectedHangtagTitle", title);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await hangtag.get("/");
        setCardsData(response.data.results); // Assuming data is an array in `results`
        console.log(response.data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <Row className="responsive-row">
        <Col xs={24} md={15}>
          <div className="headingnsearch">
            <h2 className="main-heading">CUSTOM HANGTAGS</h2>
            <div class="search-container">
              <input
                type="text"
                placeholder="Search for hangtags, categories, or articles..."
                class="search-input"
              />
              <button class="search-button">
                <SearchOutlined />
              </button>
            </div>
          </div>
          <h2 className="main-heading-products">All Hangtags</h2>
          <Row
            className="row-clothingcards-width"
            justify="center"
            gutter={[16, 16]}
          >
            {cardsData.map((card) => (
              <Col key={card.id} xs={24} sm={12} md={12} lg={8}>
                <div
                  className="card"
                  onClick={() => {
                    StoreProductId(card.id, card.title);
                    window.location.href = `/hangtag/${card.title}`;
                  }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="card-image"
                  />
                  <p className="card-text">{card.title}</p>
                </div>
              </Col>
            ))}
            {card1.map((card) => (
              <Col key={card.id} xs={24} sm={12} md={12} lg={8}>
                <a href={card.link} className="card">
                  <img
                    src={card.image}
                    alt={card.text}
                    className="card-image"
                  />
                  <p className="card-text">{card.title}</p>
                </a>
              </Col>
            ))}
          </Row>

          <div className="card-grid"></div>
        </Col>
        <Col xs={24} md={8} className="right-column">
          <Beatquote />
        </Col>
      </Row>
    </div>
  );
};

export default Hangtags;

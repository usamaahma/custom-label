import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "antd"; // Import Ant Design's Row and Col components
import { products } from "../../utils/axios"; // Adjust the import path as necessary
import Beatquote from "./beatquote"; // Import your Beatquote component
import "./clothingcard.css"; // Import your CSS file
import { SearchOutlined } from "@ant-design/icons";

const Clothingcard = () => {
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await products.get("/");
        console.log(response)
        setCardsData(response.data.results); // Assuming data is an array in `results`
        form.resetFields(); // Reset the form after successful data fetch
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [form]);

  const StoreProductId = (id, title) => {
    localStorage.setItem("selectedProductId", id);
    localStorage.setItem("selectedProductTitle", title);
  };

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
            <h2 className="main-heading">CUSTOM WOVEN LABELS</h2>
            <div class="search-container">
              <input
                type="text"
                placeholder="Search for products, categories, or articles..."
                class="search-input"
              />
              <button class="search-button">
                <SearchOutlined />
              </button>
            </div>
          </div>
          <h2 className="main-heading-products">All Products</h2>
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
                    StoreProductId(card._id, card.title);
                    window.location.href = `/product/${card.title}`;
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
          </Row>
        </Col>
        <Col xs={24} md={8} className="right-column">
          <Beatquote />
        </Col>
      </Row>
    </div>
  );
};

export default Clothingcard;

import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "antd"; // Import Ant Design's Row and Col components
import { products } from "../../utils/axios"; // Adjust the import path as necessary
import Beatquote from "./beatquote"; // Import your Beatquote component
import "./clothingcard.css"; // Import your CSS file

const Clothingcard = () => {
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await products.get("/");
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
          <h2 className="main-heading">Clothing Labels</h2>
          <div className="card-grid">
            {cardsData.map((card) => (
              <div
                key={card.id}
                className="card"
                onClick={() => {
                  StoreProductId(card._id, card.title);
                  window.location.href = `/product/${card.title}`;
                }}
              >
                <img src={card.image} alt={card.title} className="card-image" />
                <p className="card-text">{card.title}</p>
              </div>
            ))}
          </div>
        </Col>
        <Col xs={24} md={8} className="right-column">
          <Beatquote />
        </Col>
      </Row>
    </div>
  );
};

export default Clothingcard;

import React, { useState, useEffect } from "react";
import { Carousel } from "antd";
import { Button } from "react-bootstrap";
import { FaFire } from "react-icons/fa";
import { products } from "../utils/axios"; // Alias the imported products to avoid naming conflicts
import "./custompatches.css";
import CustomLoader from "./clothingsection/loader";

function Customclothing() {
  const [cardsData, setCardsData] = useState([]); // Store fetched product data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await products.get("/"); // Use the alias to call the API
        const data = response.data.results || response.data; // Check the API response structure
        console.log("Cards data:", data); // Debug API response
        setCardsData(data); // Update state with fetched data
      } catch (error) {
        setError(error.message); // Handle errors
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };
    fetchData();

    const updateMedia = () => {
      if (window.innerWidth < 576) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 768) {
        setSlidesToShow(2);
      } else if (window.innerWidth < 992) {
        setSlidesToShow(4);
      } else {
        setSlidesToShow(5);
      }
    };

    updateMedia();
    window.addEventListener("resize", updateMedia);

    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  const StoreProductId = (id, title) => {
    localStorage.setItem("selectedProductId", id);
    localStorage.setItem("selectedProductTitle", title);
  };

  // ✅ Show loader when loading is true
  if (loading) {
    return <CustomLoader />;
  }

  return (
    <div className="carousel-main">
      <Button variant="primary" className="customclothing-button1">
        Custom Clothing Labels
      </Button>
      <Carousel dots={false} slidesToShow={slidesToShow} arrows={true}>
        {cardsData.map((card, index) => (
          <div key={index} className="carousel-slide">
            <div
              className="image-container"
              onClick={() => {
                StoreProductId(card._id, card.title);
                window.location.href = `/product/${card.title}`;
              }}
            >
              <img
                src={card.image}
                alt={`Slide ${index}`}
                className="carousel-image"
              />
              <h3 className="carousel-title-1">
                {card.title === "express clothing label" && (
                  <FaFire style={{ color: "red", marginRight: "8px" }} />
                )}
                {card.title}
              </h3>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Customclothing;

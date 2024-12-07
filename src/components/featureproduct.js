import React, { useState, useEffect } from "react";
import "./featureproduct.css";
import { products } from "../utils/axios"; // Alias the imported products to avoid naming conflicts
import { Spin } from "antd";

function Featureproduct() {
  const [cardsData, setCardsData] = useState([]); // Store fetched product data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await products.get("/"); // Use the alias to call the API
        const data = response.data.results || response.data; // Check the API response structure
        console.log("API Data:", data); // Debug API response
        setCardsData(data); // Update state with fetched data
      } catch (error) {
        setError(error.message); // Handle errors
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };
    fetchData();
  }, []);

  // Function to store product ID and title in localStorage and navigate
  const StoreProductId = (id, title) => {
    localStorage.setItem("selectedProductId", id);
    localStorage.setItem("selectedProductTitle", title);
  };

  if (loading) {
    return <Spin tip="Loading..." style={{ display: "block", margin: "auto" }} />;
  }

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>Error: {error}</p>;
  }

  return (
    <div>
      <p className="feature-heading">FEATURED PRODUCTS</p>
      <div className="feature-product-container">
        {cardsData.slice(0, 4).map((product) => (
          <div
            key={product._id} // Use the correct key for ID
            className="card-featureproduct"
            onClick={() => {
              StoreProductId(product._id, product.title); // Store product ID and title
              window.location.href = `/product/${product._id}`; // Navigate to product-specific page
            }}
            style={{
              margin: "16px",
              position: "relative",
              width: "500px", // Set a fixed width for cards
              cursor: "pointer", // Indicate clickable card
            }}
          >
            <div className="image-container">
              <img alt={product.title} src={product.image} />
              <div className="overlay">
                <h5>{product.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Featureproduct;

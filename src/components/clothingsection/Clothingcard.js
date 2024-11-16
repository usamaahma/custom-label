import React, { useEffect, useState } from "react";
import { products } from "../../utils/axios"; // Adjust the import path as necessary
import "./clothingcard.css"; // Import your CSS file

const Clothingcard = () => {
  // State to hold the products data
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await products.get("/"); // Use the products instance to fetch data
        console.log(response.data.results);
        setCardsData(response.data.results); // Assuming data is an array in `products` key
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const StoreProductId = (id, title) => {
    localStorage.setItem("selectedProductId", id); // Save the ID in local storage
    localStorage.setItem("selectedProductTitle", title); // Save the ID in local storage
  };

  // Render loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  // Render error state
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Render product cards
  return (
    <div>
      <h2 className="main-heading">Clothing Labels</h2>
      <div className="card-grid">
        {cardsData.map((card) => (
          <div
            key={card.id}
            className="card"
            onClick={() => {
              StoreProductId(card._id, card.title); // Store ID
              window.location.href = `/product/${card.title}`; // Navigate to product page
            }}
          >
            <img src={card.image} alt={card.title} className="card-image" />
            <p className="card-text">{card.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clothingcard;

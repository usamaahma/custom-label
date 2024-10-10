import React from "react";
import "./clothingcard.css"; // Import your CSS file

const Stockwoven = () => {
  const cardsData = [
    { id: 1, image: "../images/cardclothing.jpg", text: "Sample Text 1" },
    { id: 2, image: "../images/cardclothing.jpg", text: "Sample Text 2" },
    { id: 3, image: "../images/cardclothing.jpg", text: "Sample Text 1" },
    { id: 4, image: "../images/cardclothing.jpg", text: "Sample Text 2" },
  ];
  return (
    <div>
      <h2 className="main-heading">Stock Woven Labels & More</h2>
      <div className="card-grid">
        {cardsData.map((card) => (
          <div key={card.id} className="card">
            <img src={card.image} alt={card.text} className="card-image" />
            <p className="card-text">{card.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stockwoven;

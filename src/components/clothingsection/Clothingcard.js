import React from "react";
import "./clothingcard.css"; // Import your CSS file

const Clothingcard = () => {
  // Your data array
  const cardsData = [
    { id: 1, image: "../images/cardclothing.jpg", text: "Sample Text 1" },
    { id: 2, image: "../images/cardclothing.jpg", text: "Sample Text 2" },
    { id: 3, image: "../images/cardclothing.jpg", text: "Sample Text 3" },
    { id: 4, image: "../images/cardclothing.jpg", text: "Sample Text 4" },
    { id: 5, image: "../images/cardclothing.jpg", text: "Sample Text 5" },
    { id: 6, image: "../images/cardclothing.jpg", text: "Sample Text 6" },
    { id: 7, image: "../images/cardclothing.jpg", text: "Sample Text 7" },
    { id: 8, image: "../images/cardclothing.jpg", text: "Sample Text 8" },
    { id: 9, image: "../images/cardclothing.jpg", text: "Sample Text 9" },
    { id: 10, image: "../images/cardclothing.jpg", text: "Sample Text 10" },
    { id: 11, image: "../images/cardclothing.jpg", text: "Sample Text 11" },
    { id: 12, image: "../images/cardclothing.jpg", text: "Sample Text 12" },
    { id: 13, image: "../images/cardclothing.jpg", text: "Sample Text 13" },
    { id: 14, image: "../images/cardclothing.jpg", text: "Sample Text 14" },
    { id: 15, image: "../images/cardclothing.jpg", text: "Sample Text 15" },
    { id: 16, image: "../images/cardclothing.jpg", text: "Sample Text 16" },
    { id: 17, image: "../images/cardclothing.jpg", text: "Sample Text 17" },
    { id: 18, image: "../images/cardclothing.jpg", text: "Sample Text 18" },
  ];

  return (
    <div>
      <h2 className="main-heading">Clothing Labels</h2>
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

export default Clothingcard;

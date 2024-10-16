import React from "react";
import "./clothingcard.css"; // Import your CSS file

const Clothingcard = () => {
  // Your data array
  const cardsData = [
    {
      id: 1,
      image: "../images/x-label.jpg",
      text: "Express Clothing Labels",
      link: "/express-clothing", // Add the link here
    },
    {
      id: 2,
      image: "../images/x-small.jpg",
      text: "Custom Woven Labels",
      link: "/customwoven",
    },
    {
      id: 3,
      image: "../images/x-label.jpg",
      text: "Woven Text Labels",
      link: "/woven-text-label",
    },
    {
      id: 4,
      image: "../images/x-small.jpg",
      text: "Custom Satin Woven Labels",
      link: "/satin-woven",
    },
    {
      id: 5,
      image: "../images/x-label.jpg",
      text: "Custom care Labels",
      link: "/custom-care-label",
    },
    {
      id: 6,
      image: "../images/x-small.jpg",
      text: "Screen Printed Labels",
      link: "/screen-printed-label",
    },
    {
      id: 7,
      image: "../images/x-label.jpg",
      text: "Custom Cotton Labels",
      link: "/custom-cotton-label",
    },
    {
      id: 8,
      image: "../images/x-small.jpg",
      text: "Custom Sublimation Labels",
      link: "/custom-sublimation-label",
    },
    {
      id: 9,
      image: "../images/x-label.jpg",
      text: "Custom Tyvek Labels",
      link: "/custom-tyvek-label",
    },
    {
      id: 10,
      image: "../images/x-small.jpg",
      text: "Custom Tpu Labels",
      link: "/tpu-labels",
    },
    {
      id: 11,
      image: "../images/x-label.jpg",
      text: "Custom Heat Transfer Labels",
      link: "/custom-heat-labels",
    },
  ];

  return (
    <div>
      <h2 className="main-heading">Clothing Labels</h2>
      <div className="card-grid">
        {cardsData.map((card) => (
          <a href={card.link} key={card.id} className="card">
            <img src={card.image} alt={card.text} className="card-image" />
            <p className="card-text">{card.text}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Clothingcard;

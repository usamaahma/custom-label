import React from "react";
import "./clothingcard.css"; // Import your CSS file

const Hangtags = () => {
  const cardsData = [
    {
      id: 1,
      image: "../images/x-label.jpg",
      text: "Simple Hangtags",
      link: "/simple-hangtags",
    },
    {
      id: 2,
      image: "../images/x-small.jpg",
      text: "Fancy Hangtags",
      link: "/fancy-hangtags",
    },
  ];
  return (
    <div>
      <h2 className="main-heading">Hangtags</h2>  
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

export default Hangtags;

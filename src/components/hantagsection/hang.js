import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./hang.css"; // Import your CSS file

const Hang1 = () => {
  // Your data array
  const cardsData = [
    {
      id: 1,
      image: "../../images/simplehang.jpg",
      text: "Simple Hang Tags",
      link: "/simple-hangtags",
    },
    {
      id: 2,
      image: "../../images/fancyhang.jpg",
      text: "Fancy Hang Tags",
      link: "/fancy-hangtags",
    },
  ];

  return (
    <div className="hang-card-container">
      <h2 className="hang-main-heading">Hangtags</h2>
      <div className="hang-card-grid">
        {cardsData.map((card) => (
          <Link key={card.id} to={card.link} className="hang-card">
            {" "}
            {/* Wrap with Link */}
            <img src={card.image} alt={card.text} className="hang-card-image" />
            <p className="hang-card-text">{card.text}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Hang1;

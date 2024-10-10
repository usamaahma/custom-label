import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./ourproduct.css"; // Import your CSS file

function Ourproduct1() {
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
    {
      id: 3,
      image: "../../images/fancyhang.jpg",
      text: "Fancy Hang Tags",
      link: "/fancy-hangtags",
    },
    {
      id: 4,
      image: "../../images/fancyhang.jpg",
      text: "Fancy Hang Tags",
      link: "/fancy-hangtags",
    },
    {
      id: 5,
      image: "../../images/fancyhang.jpg",
      text: "Fancy Hang Tags",
      link: "/fancy-hangtags",
    },
    {
      id: 6,
      image: "../../images/fancyhang.jpg",
      text: "Fancy Hang Tags",
      link: "/fancy-hangtags",
    },
    {
      id: 7,
      image: "../../images/fancyhang.jpg",
      text: "Fancy Hang Tags",
      link: "/fancy-hangtags",
    },
    {
      id: 8,
      image: "../../images/fancyhang.jpg",
      text: "Fancy Hang Tags",
      link: "/fancy-hangtags",
    },
    {
      id: 9,
      image: "../../images/fancyhang.jpg",
      text: "Fancy Hang Tags",
      link: "/fancy-hangtags",
    },
    {
      id: 10,
      image: "../../images/fancyhang.jpg",
      text: "Fancy Hang Tags",
      link: "/fancy-hangtags",
    },
    {
      id: 11,
      image: "../../images/fancyhang.jpg",
      text: "Fancy Hang Tags",
      link: "/fancy-hangtags",
    },
    {
      id: 12,
      image: "../../images/fancyhang.jpg",
      text: "Fancy Hang Tags",
      link: "/fancy-hangtags",
    },
    {
      id: 13,
      image: "../../images/fancyhang.jpg",
      text: "Fancy Hang Tags",
      link: "/fancy-hangtags",
    },
  ];

  return (
    <div className="product-card-container">
      <h2 className="product-main-heading">Our Products</h2>
      <div className="product-card-grid">
        {cardsData.map((card) => (
          <Link key={card.id} to={card.link} className="product-card">
            <img
              src={card.image}
              alt={card.text}
              className="product-card-image"
            />
            <p className="product-card-text">{card.text}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Ourproduct1;

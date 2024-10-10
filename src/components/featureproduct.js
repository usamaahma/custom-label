import React from "react";
import "./featureproduct.css";
import { Card } from "antd";

// Sample data for the products
const products = [
  {
    id: 1,
    title: "Custom Woven Labels",
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    bottomText: "Most Popular 1000 pcs starting at 0.19ea!",
  },
  {
    id: 2,
    title: "Express Clothing Labels  3 Day",
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    bottomText: "3 Day Turn Around Made in USA",
  },
  {
    id: 3,
    title: "Custom Woven Labels",
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    bottomText: "Most Popular 1000 pcs starting at 0.19ea!",
  },
  {
    id: 4,
    title: "Express Clothing Labels  3 Day",
    image: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    bottomText: "3 Day Turn Around Made in USA",
  },
];

function Featureproduct() {
  return (
    <div>
      <p className="feature-heading">FEATURED PRODUCTS</p>
      <div className="feature-product-container">
        {products.map((product) => (
          <Card
            key={product.id}
            hoverable
            className="card-featureproduct"
            style={{
              margin: "16px",
              position: "relative",
              width: "500px", // Set a fixed width for cards
            }}
          >
            <div className="image-container">
              <img alt={product.title} src={product.image} />
              <div className="overlay">
                <h5>{product.title}</h5>
              </div>
            </div>
            <div className="bottom-text">{product.bottomText}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Featureproduct;

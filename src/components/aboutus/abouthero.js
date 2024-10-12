import React from "react";
import "./abouthero.css";

function Abouthero1() {
  return (
    <div className="about-hero">
      <div className="about-content">
        <h2 className="about-heading">About Us</h2>
        <p className="about-text">
          We are a dedicated team committed to providing the best services to
          our clients. Our mission is to deliver high-quality products that meet
          our customers' needs and expectations.
        </p>
      </div>
      <div className="about-image">
        <img src="../images/about1.jpg" alt="About Us" />
      </div>
    </div>
  );
}

export default Abouthero1;

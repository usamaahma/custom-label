import React from "react";
import "./hero.css";
import Carousel from "react-bootstrap/Carousel";
import { Slide } from "react-awesome-reveal";
import { Link } from "react-router-dom";

const Herosec1 = () => {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item className="carousel-height">
        <img
          className="d-block w-100 height-car-img"
          src="../images/banner.png"
          alt="First slide"
        />
        <Carousel.Caption
          className="text-start"
          style={{ width: "100%", left: "0", right: "auto" }}
        >
          <Slide cascade>
            <div className="herosec-content">
              <p className="custom">Custom Woven Labels With Your Logo</p>
              <p className="premium">
                Premium quality, fast delivery & lowest pricing
              </p>
              <p className="premium woven-text-100">
                100 Woven LabelsStarting At $0.98ea
              </p>
              <Link to="/all-clothing-labels">
                <button className="herosec-button">Shop Woven Labels</button>
              </Link>
            </div>
          </Slide>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item className="carousel-height">
        <img
          className="d-block w-100 height-car-img"
          src="../images/banner.png"
          alt="First slide"
        />
        <Carousel.Caption
          className="text-start"
          style={{ width: "100%", left: "0", right: "auto" }}
        >
          <Slide cascade>
            <div className="herosec-content">
              <p className="custom">Custom Woven Labels With Your Logo</p>
              <p className="premium">
                Premium quality, fast delivery & lowest pricing
              </p>
              <p className="premium woven-text-100">
                100 Woven LabelsStarting At $0.98ea
              </p>
              <Link to="/contact-us">
                <button className="herosec-button">Shop Woven Labels</button>
              </Link>
            </div>
          </Slide>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Herosec1;

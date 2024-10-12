import React, { useState, useEffect } from "react";
import { Carousel } from "antd";
import { Button } from "react-bootstrap";
import { FaFire } from "react-icons/fa";
import "./custompatches.css";

function Custompatches() {
  const images = [
    { src: "../../images/girl.png", title: "leather patches" },
    { src: "../../images/girl.png", title: "PVC patches" },
    { src: "../../images/girl.png", title: "printed patches" },
    { src: "../../images/girl.png", title: "custom woven ribbons" },
    { src: "../../images/girl.png", title: "Woven patches" },
    { src: "../../images/girl.png", title: "chenille patches" },
    { src: "../../images/girl.png", title: "Woven stain patches" },
  ];

  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const updateMedia = () => {
      if (window.innerWidth < 576) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 768) {
        setSlidesToShow(2);
      } else if (window.innerWidth < 992) {
        setSlidesToShow(4);
      } else {
        setSlidesToShow(5);
      }
    };

    updateMedia();
    window.addEventListener("resize", updateMedia);

    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  return (
    <div className="carousel-main">
      <Button variant="primary" className="customclothing-button1">
        Custom Patches
      </Button>
      <Carousel dots={false} slidesToShow={slidesToShow} arrows={true}>
        {images.map((image, index) => (
          <div key={index} className="carousel-slide">
            <div className="image-container">
              <img
                src={image.src}
                alt={`Slide ${index}`}
                className="carousel-image"
              />
              <h3 className="carousel-title-1">
                {image.title === "express clothing label" && (
                  <FaFire style={{ color: "red", marginRight: "8px" }} />
                )}
                {image.title}
              </h3>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Custompatches;

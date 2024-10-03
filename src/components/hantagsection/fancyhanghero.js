import React, { useState } from "react";
import "./fancyhanghero.css";
import { Col, Row } from "antd";

function Fancyhanghero1() {
  const [selectedImage, setSelectedImage] = useState("../images/fancyhang.jpg");

  const thumbnailImages = [
    "../images/fancytag.jpg",
    "../images/girl.png",
    "../images/post.png",
    "../images/fancy1.png",
  ];

  return (
    <div className="fancyhero-centered-container">
      <Row className="fancyhero-centered-row" gutter={[16, 16]}>
        <Col xs={24} sm={16} md={12} className="fancyhero-text-column">
          <p className="fancyhero-expresstext-clothing">Fancy Hang Tags</p>
          <p className="fancyhero-largetext-express">
            Our fancy hang tag options can enhance brand presence and set your
            product line apart. Highly customizable product tags and garment
            tags are only limited to your imagination. Receive competitive
            pricing for premium quality custom clothing tags with unique options
            such as custom shapes, heavy weight cardstock, embossing or
            debossing, spot gloss, metallic inks & more. Ask about our custom
            hang tag string colors. Submit your request below and receive a
            custom clothing tag price quote within 2 business days.
          </p>
          <p className="fancyhero-largetext-express">
            Our fancy hang tag options include:
          </p>

          <div className="fancyhero-hero-firstdiv">
            <div>
              <ul className="fancyhero-list-express">
                <li>Ultra Thick Cardstock</li>
                <li>Color Cardstock</li>
                <li>Folded Cardstock</li>
                <li>Custom Shapes</li>
                <li>Metallic Print Colors</li>
                <li>UV Spot Gloss Finish</li>
                <li>Embossed or Debossed Logos</li>
                <li>Custom String or Safety Pin Colors</li>
                <li>Hole Grommets</li>
              </ul>
               
            </div>
          </div>
        </Col>
        <Col xs={24} sm={8} md={6} className="fancyhero-image-column">
          <div className="fancyhero-main-image-container">
            <img
              alt="Express Clothing Labels"
              src={selectedImage}
              className="img-fluid fancyhero-main-image"
            />
          </div>
          <div className="fancyhero-thumbnail-carousel">
            {thumbnailImages.map((image, index) => (
              <img
                key={index}
                alt={`Thumbnail ${index}`}
                src={image}
                className="fancyhero-thumbnail-image"
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Fancyhanghero1;

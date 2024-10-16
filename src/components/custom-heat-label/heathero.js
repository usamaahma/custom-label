import React, { useState } from "react";
import "../expressclothing/expresshero.css";
import { Col, Row } from "antd";

function Heathero() {
  // State to hold the currently selected image
  const [selectedImage, setSelectedImage] = useState("../images/martin.png");

  // Array of images for the thumbnail carousel
  const thumbnailImages = [
    "../images/martin.png",
    "../images/girl.png",
    "../images/post.png",
    "../images/martin.png", // Add more images as needed
  ];

  return (
    <div className="centered-container">
      <Row className="centered-row" gutter={[16, 16]}>
        <Col xs={24} sm={16} md={12} className="text-column">
          <p className="expresstext-clothing">Custom Heat Transfer Labels</p>
          <p className="largetext-express">
            Heat transfer clothing labels are a popular choice for t-shirts,
            athletic apparel or anytime you prefer a heat press label that is
            lightweight and won't itch the skin. Also known as tagless labels,
            they are most commonly used as the neck label in t-shirts. Our heat
            transfer labels work well with athletic apparel because they use an
            ink formula that will stretch with your garment. Tagless labels will
            also survive many wash cycles.
          </p>
          <p className="largetext-express">
            To apply heat transfer labels: set your heat press to 320F or home
            iron to medium cotton setting. Firmly press label onto your garment
            for 15 seconds and let cool completely. Wait 24 hours before
            washing.
          </p>
          <p className="largetext-express">
            Upload artwork and select your options below. Our team will help
            finalize your heat transfer label design and send you a digital
            proof for approval within 1 business day. You'll be able to approve
            your proof or make changes if necessary before full production. A
            team expert will be assigned to your order in case you have any
            questions.
          </p>

          <div className="hero-firstdiv">
            <div>
              <ul className="list-express">
                <li>Up to 4 print colors</li>
                <li>Easily use home iron</li>
                <li>No sewing, no itch</li>
                <li>Add size versions</li>
                <li>Graphic artwork assistance</li>
                <li>Fast turnaround & delivery</li>
              </ul>
             </div>
            <div className="second-firstdiv">
              <p className="our-productexpress"> Our Order Process</p>
              <ol className="order-list">
                <li>
                  Get your Digital Proof within 1 business day. Approve or
                  reject your proof from your customer account.
                </li>
                <li>
                  After your approvals are complete, view your Ship Date in your
                  customer account.
                </li>
              </ol>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={8} md={6} className="image-column">
          <div className="main-image-container">
            <img
              alt="Express Clothing Labels"
              src={selectedImage}
              className="img-fluid main-image"
            />
          </div>
          <div className="thumbnail-carousel">
            {/* Map through thumbnail images */}
            {thumbnailImages.map((image, index) => (
              <img
                key={index}
                alt={`Thumbnail ${index}`}
                src={image}
                className="thumbnail-image"
                onClick={() => setSelectedImage(image)} // Update main image on click
              />
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Heathero;

import React, { useState } from "react";
import "./simplehanghero.css";
import { Col, Row } from "antd";

function Simplehanghero1() {
  const [selectedImage, setSelectedImage] = useState("../images/martin.png");

  const thumbnailImages = [
    "../images/martin.png",
    "../images/girl.png",
    "../images/post.png",
    "../images/martin.png",
  ];

  return (
    <div className="simplehero-centered-container">
      <Row className="simplehero-centered-row" gutter={[16, 16]}>
        <Col xs={24} sm={16} md={12} className="simplehero-text-column">
          <p className="simplehero-expresstext-clothing">Simple Hang Tags</p>
          <p className="simplehero-largetext-express">
            Hang tags are a key tool for clothing designers to showcase their
            brand and include important product information. An attractive
            custom hang tag will increase the perceived value of your products.
            Our simple hang tags are affordable, printed in the USA and include
            everything you need such as hang tag string and safety pins. They
            are also used as fancy price tags with strings.
          </p>
          <p className="simplehero-largetext-express">
            Upload artwork and select your options below. Our team will help
            finalize your hang tag design and send you a digital proof for
            approval within 1 business day. You'll be able to approve your proof
            or make changes if necessary before full production. A team expert
            will be assigned to your order in case you have any questions.
          </p>

          <div className="simplehero-hero-firstdiv">
            <div>
              <ul className="simplehero-list-express">
                <li>Fastest 3-Day Turnaround</li>
                <li>Custom Woven Labels Made in USA</li>
                <li>Straight Cut / Sew-on Only</li>
                <li>Manufactured in New York</li>
                <li>Free Artwork Assistance</li>
              </ul>
              <img
                className="simplehero-image-post"
                alt="post"
                src="../images/post.png"
              />
            </div>
            <div className="simplehero-second-firstdiv">
              <p className="our-productexpress"> Our Order Process</p>
              <ol className="simplehero-order-list">
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
        <Col xs={24} sm={8} md={6} className="simplehero-image-column">
          <div className="simplehero-main-image-container">
            <img
              alt="Express Clothing Labels"
              src={selectedImage}
              className="img-fluid simplehero-main-image"
            />
          </div>
          <div className="simplehero-thumbnail-carousel">
            {thumbnailImages.map((image, index) => (
              <img
                key={index}
                alt={`Thumbnail ${index}`}
                src={image}
                className="simplehero-thumbnail-image"
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Simplehanghero1;

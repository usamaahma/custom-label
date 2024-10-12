import React, { useState } from "react";
import "./tpuhero.css";
import { Col, Row } from "antd";

function Tpuhero1() {
  const [selectedImage, setSelectedImage] = useState("../images/tpulabel1.jpg");

  const thumbnailImages = [
    "../images/tpulabel.jpg",
    "../images/girl.png",
    "../images/tpulabel1.jpg",
    "../images/tpulabel2.jpg",
    "../images/tpulabel2.jpg",
  ];

  return (
    <div className="tpuhero-centered-container">
      <Row className="tpuhero-centered-row" gutter={[16, 16]}>
        <Col xs={24} sm={16} md={12} className="tpuhero-text-column">
          <p className="tpuhero-express-text">Custom TPU Labels</p>
          <p className="tpuhero-large-text">
            Customizable TPU labels utilize a transparent silicone material that
            lends garments a modern appearance. These silicone clothing labels
            are commonly found on athleticwear, swimwear, outerwear & other
            similar applications. Our TPU material is approximately 1mm thick,
            soft, pliable and feels like fabric. The base material has the
            appearance of frosted glass and can be printed with up to 4 colors.
          </p>
          <p className="tpuhero-large-text">
            Upload artwork and select your options below. Our team will help
            finalize your silicone clothing label design and send you a digital
            proof for approval within 1 business day. You'll be able to approve
            your proof or make changes if necessary before full production. A
            team expert will be assigned to your order in case you have any
            questions.
          </p>

          <div className="tpuhero-hero-first-div">
            <div>
              <ul className="tpuhero-list-express">
                <li>Up to 4 print colors</li>
                <li>Straight cut (flat) only</li>
                <li>Transparent TPU material</li>
                <li>Free sample photo option</li>
                <li>Graphic artwork assistance</li>
                <li>Fast turnaround & delivery</li>
              </ul>
              <img
                className="tpuhero-image-post"
                alt="post"
                src="../images/post.png"
              />
            </div>
            <div className="tpuhero-second-first-div">
              <p className="tpuhero-our-product-express">Our Order Process</p>
              <ol className="tpuhero-order-list">
                <li>
                  Get your Digital Proof within 1 business day. Approve or
                  reject your proof from your customer account.
                </li>
                <li>
                  If selected, get your Sample Photo within 5 business days of
                  approving your digital proof.
                </li>
                <li>
                  After your approvals are complete, view your Ship Date in your
                  customer account.
                </li>
              </ol>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={8} md={6} className="tpuhero-image-column">
          <div className="tpuhero-main-image-container">
            <img
              alt="TPU Product"
              src={selectedImage}
              className="img-fluid tpuhero-main-image"
            />
          </div>
          <div className="tpuhero-thumbnail-carousel">
            {thumbnailImages.map((image, index) => (
              <img
                key={index}
                alt={`Thumbnail ${index}`}
                src={image}
                className="tpuhero-thumbnail-image"
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Tpuhero1;

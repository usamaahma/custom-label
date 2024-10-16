import React, { useState } from "react";
import "../expressclothing/expresshero.css";
import { Col, Row } from "antd";

function Screenprintedhero() {
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
          <p className="expresstext-clothing">Custom Cotton Labels</p>
          <p className="largetext-express">
            Cotton labels for clothing are made with a natural cotton twill
            material available in black, white or natural (tan) colors. We use a
            screen printing process to print your design onto cotton labels in
            up to 4 colors. PLEASE NOTE: The cut ends of custom cotton labels
            are unfinished and may fray. For this reason, we advise clients to
            select the End Fold style whenever your labels will not be sewn into
            the seam of your product. This way, the unfinished edges are neatly
            tucked away.
            <p className="largetext-express"></p>
            Upload artwork and select your options below. Our team will help
            finalize your cotton clothing label design and send you a digital
            proof for approval within 1 business day. You'll be able to approve
            your proof or make changes if necessary before full production. A
            team expert will be assigned to your order in case you have any
            questions.{" "}
          </p>
          <div className="hero-firstdiv">
            <div>
              <ul className="list-express">
                <li>Up to 4 print colors</li>
                <li>Any background material color</li>
                <li>Any fold style</li>
                <li>Free sample photo option</li>
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

export default Screenprintedhero;

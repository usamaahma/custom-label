import React, { useState } from "react";
import { Button, Card, Col, Row, Upload, message } from "antd";
import "../expressclothing/tablescart.css";
import LastTable from "../expressclothing/lasttable";

const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: true,
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
const firstcardData = [
  {
    image: "../images/straight.png",
    title: "Straight Cut (Flat)",
  },
  {
    image: "../images/straight.png",
    title: "Centre Fold",
  },
  {
    image: "../images/straight.png",
    title: "Loop Fold",
  },
  {
    image: "../images/straight.png",
    title: "End Fold",
  },
  {
    image: "../images/straight.png",
    title: "Mitre Fold",
  },
  {
    image: "../images/straight.png",
    title: "Manhatten Fold",
  },
  {
    image: "../images/straight.png",
    title: "Book Cover Fold",
  },
  // Add more cards as needed
];
const cardData = [
  { id: 1, imgSrc: "../images/straight.png", title: "2 x 0.625" },
  { id: 2, imgSrc: "../images/straight.png", title: "2 x 1" },
  { id: 3, imgSrc: "../images/straight.png", title: "2 x 2" },
  { id: 4, imgSrc: "../images/straight.png", title: "Custom" },
];

const card3 = [
  { id: 1, imgSrc: "../images/straight.png", title: "None (Sew-On)" },
  { id: 2, imgSrc: "../images/straight.png", title: "Iron-On" },
  { id: 3, imgSrc: "../images/straight.png", title: "Peel & Stick" },
];

const card4 = [
  { id: 1, imgSrc: "../images/straight.png", title: "None (Regular Thread)" },
  { id: 2, imgSrc: "../images/straight.png", title: "Gold Metallic" },
  { id: 3, imgSrc: "../images/straight.png", title: "Silver Metallic" },
];
const card5 = [
  { id: 1, imgSrc: "../images/straight.png", title: "None" },
  { id: 2, imgSrc: "../images/straight.png", title: "Yes, I Need Versions" },
];
const card6 = [
  { id: 1, imgSrc: "../images/straight.png", title: "Digital Proof Only" },
  {
    id: 2,
    imgSrc: "../images/straight.png",
    title: "Digital Proof & Sample Photo",
  },
];
const card7 = [
  {
    id: 1,
    imgSrc: "../images/straight.png",
    title: "Standard: 15 Business Days",
  },
  {
    id: 2,
    imgSrc: "../images/straight.png",
    title: "RUSH: 10 Business Days",
  },
];

function Woventable() {
  const [selectedData, setSelectedData] = useState({
    artwork: "No Artwork Uploaded",
    size: '2" x 0.625" (50.80mm x 25.40mm)',
    style: "Straight Cut (Flat)",
    versions: "None",
    proofOptions: "Digital Proof Only",
    backingoptions: "None (Sew On)",
    mettalicthread: "None (Regular Thread)",
    turnaroundOptions: "RUSH: 3 Business Days",
    quantity: "1000 pcs",
    price: "$0.54/Each",
    totalPrice: "$540.00",
  });

  // Function to handle card clicks
  const handleCardClick = (key, value) => {
    setSelectedData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  return (
    <div className="table-express">
      <Row className="centered-row-table">
        <Col xs={24} md={16} className="left-column">
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <i class="fa fa-upload" aria-hidden="true"></i>
            </p>
            <p className="ant-upload-text">Upload Your Artwork File</p>
          </Dragger>
          <div>
            <div className="divs-tableexpress">
              <Row className="row-small-screens">
                {firstcardData.map((card, index) => (
                  <Col
                    xs={24} // Full width on extra small devices
                    sm={12} // 2 cards per row on small devices
                    md={8} // 3 cards per row on medium devices
                    lg={6} // 4 cards per row on large devices
                    xl={6} // 4 cards per row on extra large devices
                    key={index}
                  >
                    <Card
                      bordered={false}
                      className="image-card-express"
                      onClick={() => handleCardClick("style", card.title)}
                      style={{ width: 150, background: "#FAF4EB " }}
                    >
                      <img
                        alt={card.title}
                        src={card.image}
                        className="image-card-express"
                      />
                      <p>{card.title}</p>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
            <div className="divs-tableexpress">
              <div className="card-grid">
                {cardData.map((card) => (
                  <div key={card.id} className="card-container">
                    <Card
                      bordered={false}
                      onClick={() => handleCardClick("size", card.title)}
                    >
                      <img
                        alt={card.title}
                        src={card.imgSrc}
                        className="image-card-express-1"
                      />
                      <p>
                        {card.title} <br /> {card.subtitle}
                      </p>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            <div className="divs-tableexpress">
              {card3.map((card, index) => (
                <Card
                  key={index}
                  bordered={false}
                  onClick={() => handleCardClick("backingoptions", card.title)}
                  style={{
                    width: "11rem",
                    height: "12rem",
                    background: "#FAF4EB ",
                    cursor: "pointer",
                  }}
                >
                  <img
                    alt={card.title}
                    src={card.imgSrc}
                    className="image-card-express"
                  />
                  <p>{card.title}</p>
                </Card>
              ))}
            </div>
            <div className="divs-tableexpress">
              {card4.map((card, index) => (
                <Card
                  key={index}
                  bordered={false}
                  onClick={() => handleCardClick("mettalicthread", card.title)}
                  style={{
                    width: "11rem",
                    height: "12rem",
                    background: "#FAFAFA",
                    cursor: "pointer",
                  }}
                >
                  <img
                    alt={card.title}
                    src={card.imgSrc}
                    className="image-card-express"
                  />
                  <p>{card.title}</p>
                </Card>
              ))}
            </div>
            <div className="divs-tableexpress">
              {card5.map((card, index) => (
                <Card
                  key={index}
                  onClick={() => handleCardClick("versions", card.title)}
                  bordered={false}
                  style={{
                    width: "11rem",
                    height: "12rem",
                    background: "#FAF4EB ",
                    cursor: "pointer",
                  }}
                >
                  <img
                    alt={card.title}
                    src={card.imgSrc}
                    className="image-card-express"
                  />
                  <p>{card.title}</p>
                </Card>
              ))}
            </div>
            <div className="divs-tableexpress">
              {card6.map((card, index) => (
                <Card
                  key={index}
                  onClick={() => handleCardClick("proofOptions", card.title)}
                  bordered={false}
                  style={{
                    width: "11rem",
                    height: "12rem",
                    background: "#FAFAFA",
                    cursor: "pointer",
                  }}
                >
                  <img
                    alt={card.title}
                    src={card.imgSrc}
                    className="image-card-express"
                  />
                  <p>{card.title}</p>
                </Card>
              ))}
            </div>
            <div className="divs-tableexpress">
              {card7.map((card, index) => (
                <Card
                  key={index}
                  onClick={() =>
                    handleCardClick("turnaroundOptions", card.title)
                  }
                  bordered={false}
                  style={{
                    width: "11rem",
                    height: "12rem",
                    background: "#FAFAFA",
                    cursor: "pointer",
                  }}
                >
                  <img
                    alt={card.title}
                    src={card.imgSrc}
                    className="image-card-express"
                  />
                  <p>{card.title}</p>
                </Card>
              ))}
            </div>
            <div className="divs-tableexpress">
              <textarea
                rows={4} // Set the number of rows to 4
                style={{
                  width: "100%", // Make it full width or adjust as needed
                  resize: "vertical", // Allow vertical resizing
                  padding: "10px", // Add some padding for aesthetics
                }}
                placeholder="Enter your text here..."
              />
            </div>
            <div className="divs-tableexpress">
              <LastTable />
            </div>
          </div>
        </Col>

        {/* Right Column with Sticky Div */}
        <Col xs={24} md={8} className="right-column">
          <div className="sticky-div">
            {/* Your sticky content goes here */}
            <div className="sticky-first">
              <p>Your Instant Quote</p>
            </div>
            <div className="sticky-blue-1">
              <p className="marg-bot">Custom Woven Labels</p>
              <div className="sticky-blue-inside">
                <p>Artwork File:</p>
                <p>{selectedData.artwork}</p>
              </div>
            </div>
            <div className="sticky-blue">
              <div className="sticky-blue-inside">
                <p>Size:</p>
                <p>{selectedData.size}</p>
              </div>
            </div>
            <div className="sticky-blue">
              <div className="sticky-blue-inside">
                <p>Style:</p>
                <p>{selectedData.style}</p>
              </div>
            </div>{" "}
            <div className="sticky-blue">
              <div className="sticky-blue-inside">
                <p>Backing Options:</p>
                <p>{selectedData.backingoptions}</p>
              </div>
            </div>{" "}
            <div className="sticky-blue">
              <div className="sticky-blue-inside">
                <p>Metallic Thread:</p>
                <p>{selectedData.mettalicthread}</p>
              </div>
            </div>
            <div className="sticky-blue">
              <div className="sticky-blue-inside">
                <p>Versions:</p>
                <p>{selectedData.versions}</p>
              </div>
            </div>
            <div className="sticky-blue">
              <div className="sticky-blue-inside">
                <p>Proof Options:</p>
                <p>{selectedData.proofOptions}</p>
              </div>
            </div>
            <div className="sticky-blue">
              <div className="sticky-blue-inside">
                <p>Turnaround Options:</p>
                <p>{selectedData.turnaroundOptions}</p>
              </div>
            </div>
            <div className="sticky-blue">
              <div className="sticky-blue-inside">
                <p>{selectedData.quantity}</p>
                <p>{selectedData.price}</p>
                <p>{selectedData.totalPrice}</p>
              </div>
            </div>
            <div className="sticky-blue">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button className="button-tablecart">
                  <i class="fa fa-cart-arrow-down" aria-hidden="true"></i>
                  ADD TO CART
                </Button>
              </div>
            </div>
            <div>
              <div className="sticky-help">
                <p>Need Help?</p>
                <a href="tel:+1234567890">
                  <i class="fa fa-phone-square size-i" aria-hidden="true"></i>
                </a>
                <a href="mailto:sales@theclothinglabels.com">
                  <i class="fa fa-envelope size-i" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Woventable;

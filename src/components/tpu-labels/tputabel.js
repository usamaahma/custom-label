import React from "react";
import { Button, Card, Col, Row, Upload, message } from "antd";
import "./tputabel.css";
import LastTable1 from "../expressclothing/lasttable";

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

const cardData = [
  { id: 1, imgSrc: "../images/tpustraight.jpg", title: "Straight Cut (Flat)" },
  { id: 2, imgSrc: "../images/tpustraight.jpg", title: "Straight Cut (Flat)" },
];
const cardData1 = [
  { id: 1, imgSrc: "../images/tpu3.png", title: "2 x 1" },
  { id: 2, imgSrc: "../images/tpu3.png", title: "2 x 1" },
  { id: 3, imgSrc: "../images/tpu3.png", title: "2 x 1" },
  { id: 4, imgSrc: "../images/tpu3.png", title: "2 x 1" },
];
const cardData2 = [
  { id: 1, imgSrc: "../images/twocolor-tpu.png", title: "Two Colors" },
  { id: 2, imgSrc: "../images/twocolor-tpu.png", title: "Two Colors" },
  { id: 3, imgSrc: "../images/twocolor-tpu.png", title: "Two Colors" },
];
const cardData4 = [
  {
    id: 1,
    imgSrc: "../images/colorversion.png",
    title: "Yes, I Need Versions",
  },
  {
    id: 2,
    imgSrc: "../images/colorversion.png",
    title: "Yes, I Need Versions",
  },
];
const cardData7 = [
  { id: 1, imgSrc: "../images/proof.png", title: "Digital Proof Only" },
  { id: 2, imgSrc: "../images/proof.png", title: "Digital Proof Only" },
];
const cardData8 = [
  { id: 1, imgSrc: "../images/turnaround.png", title: "Standard: 12 Days" },
  { id: 2, imgSrc: "../images/turnaround.png", title: "Standard: 12 Days" },
];

function Tputabel1() {
  return (
    <div className="simpletable-table-express">
      <Row className="simpletable-centered-row-table">
        <Col xs={24} md={16} className="simpletable-left-column">
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <i className="fa fa-upload" aria-hidden="true"></i>
            </p>
            <p className="ant-upload-text">Upload Your Artwork File</p>
          </Dragger>
          <div>
            <div className="size-txt">
              <h2 className="simpletable-heading">Style</h2>{" "}
            </div>

            <div className="simpletable-divs-tableexpress">
              {cardData.map((card) => (
                <div key={card.id} className="card-container">
                  <Card
                    bordered={false}
                    style={{
                      width: "8rem",
                      height: "8rem",
                      background: "#FAFAFA",
                      margin: "1rem", // Optional: Add margin for spacing between cards
                    }}
                  >
                    <img
                      alt={`Card ${card.id}`}
                      src={card.imgSrc} // Use actual image paths here
                      className="simpletable-image-card-express"
                    />
                    <p>{card.title}</p> {/* Update description accordingly */}
                  </Card>
                </div>
              ))}
            </div>

            <div className="size-txt">
              <h2 className="simpletable-heading">Size</h2>{" "}
            </div>

            <div className="simpletable-divs-tableexpress">
              {cardData1.map((card) => (
                <div key={card.id} className="card-container">
                  <Card
                    bordered={false}
                    style={{
                      width: "8rem",
                      height: "9rem",
                      background: "#FAFAFA",
                      margin: "1rem", // Optional: Add margin for spacing between cards
                    }}
                  >
                    <img
                      alt={`Card ${card.id}`}
                      src={card.imgSrc} // Use actual image paths here
                      className="simpletable-image-card-express"
                    />
                    <p>{card.title}</p> {/* Update description accordingly */}
                  </Card>
                </div>
              ))}
            </div>

            <div className="size-txt">
              <h2 className="simpletable-heading">print options</h2>
            </div>

            <div className="simpletable-divs-tableexpress">
              {cardData2.map((card) => (
                <div key={card.id} className="card-container">
                  <Card
                    bordered={false}
                    style={{
                      width: "8rem",
                      height: "9rem",
                      background: "#FAFAFA",
                      margin: "1rem", // Optional: Add margin for spacing between cards
                    }}
                  >
                    <img
                      alt={`Card ${card.id}`}
                      src={card.imgSrc} // Use actual image paths here
                      className="simpletable-image-card-express"
                    />
                    <p>{card.title}</p> {/* Update description accordingly */}
                  </Card>
                </div>
              ))}
            </div>

            {/* 4 */}
            <div className="size-txt">
              <h2 className="simpletable-heading">
                Size Symbols or Color Versions
              </h2>
            </div>

            <div className="simpletable-divs-tableexpress">
              {cardData4.map((card) => (
                <div key={card.id} className="card-container">
                  <Card
                    bordered={false}
                    style={{
                      width: "8rem",
                      height: "9rem",
                      background: "#FAFAFA",
                      margin: "1rem",
                    }}
                  >
                    <img
                      alt={`Card ${card.id}`}
                      src={card.imgSrc}
                      className="simpletable-image-card-express"
                    />
                    <p>{card.title}</p> {/* Update description accordingly */}
                  </Card>
                </div>
              ))}
            </div>
            {/* 5 */}

            {/* 7 */}
            <div className="size-txt">
              <h2 className="simpletable-heading">Proof options</h2>
            </div>

            <div className="simpletable-divs-tableexpress">
              {cardData7.map((card) => (
                <div key={card.id} className="card-container">
                  <Card
                    bordered={false}
                    style={{
                      width: "8rem",
                      height: "9rem",
                      background: "#FAFAFA",
                      margin: "1rem", // Optional: Add margin for spacing between cards
                    }}
                  >
                    <img
                      alt={`Card ${card.id}`}
                      src={card.imgSrc} // Use actual image paths here
                      className="simpletable-image-card-express"
                    />
                    <p>{card.title}</p> {/* Update description accordingly */}
                  </Card>
                </div>
              ))}
            </div>
            {/* 8 */}
            <div className="size-txt">
              <h2 className="simpletable-heading">Turnaround options</h2>
            </div>

            <div className="simpletable-divs-tableexpress">
              {cardData8.map((card) => (
                <div key={card.id} className="card-container">
                  <Card
                    bordered={false}
                    style={{
                      width: "8rem",
                      height: "9rem",
                      background: "#FAFAFA",
                      margin: "1rem", // Optional: Add margin for spacing between cards
                    }}
                  >
                    <img
                      alt={`Card ${card.id}`}
                      src={card.imgSrc} // Use actual image paths here
                      className="simpletable-image-card-express"
                    />
                    <p>{card.title}</p> {/* Update description accordingly */}
                  </Card>
                </div>
              ))}
            </div>

            <div className="size-txt">
              <h2 className="simpletable-heading">Comments(Optional)</h2>
            </div>
            {/* Repeat the card section as needed */}
            <div className="simpletable-divs-tableexpress">
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
            <div className="simpletable-divs-tableexpress">
              <LastTable1 />
            </div>
          </div>
        </Col>

        {/* Right Column with Sticky Div */}

        <Col xs={24} md={8} className="simpletable-right-column">
          <div className="simpletable-sticky-div">
            <div className="simpletable-sticky-first">
              <p>Your Instant Quote</p>
            </div>
            <div className="simpletable-sticky-blue-1">
              <p className="simpletable-marg-bot">Simple Hang Tags</p>
              <div className="simpletable-sticky-blue-inside">
                <p>Artwork File:</p>
                <p>No Artwork Uploaded</p>
              </div>
            </div>
            {/* Other sticky content */}
            <div className="simpletable-sticky-blue">
              <div className="simpletable-sticky-blue-inside">
                <p>Size:</p>
                <p>0.75" / 1" (19.05mm x 25.40mm)</p>
              </div>
            </div>
            <div className="simpletable-sticky-blue">
              <div className="simpletable-sticky-blue-inside">
                <p>Print option</p>
                <p>Straight Cut (Flat)</p>
              </div>
            </div>

            <div className="simpletable-sticky-blue">
              <div className="simpletable-sticky-blue-inside">
                <p>Hole Punch Size</p>
                <p>Straight Cut (Flat)</p>
              </div>
            </div>
            <div className="simpletable-sticky-blue">
              <div className="simpletable-sticky-blue-inside">
                <p>Hole punch position</p>
                <p>Straight Cut (Flat)</p>
              </div>
            </div>
            <div className="simpletable-sticky-blue">
              <div className="simpletable-sticky-blue-inside">
                <p>turnaround opt</p>
                <p>Straight Cut (Flat)</p>
              </div>
            </div>
            {/* Add remaining sticky content similarly */}
            <div className="simpletable-sticky-blue">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button className="simpletable-button-tablecart">
                  <i className="fa fa-cart-arrow-down" aria-hidden="true"></i>
                  ADD TO CART
                </Button>
              </div>
            </div>
            <div>
              <div className="simpletable-sticky-help">
                <p>Need Help?</p>
                <a href="tel:+1234567890">
                  <i
                    className="fa fa-phone-square size-i"
                    aria-hidden="true"
                  ></i>
                </a>
                <a href="mailto:sales@theclothinglabels.com">
                  <i className="fa fa-envelope size-i" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Tputabel1;

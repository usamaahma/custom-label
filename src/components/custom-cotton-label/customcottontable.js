import React from "react";
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

function Customcottontable() {
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
              <Row>
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
                      style={{ width: 150 }}
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
                    <Card bordered={false}>
                      <img
                        alt={card.title}
                        src={card.imgSrc}
                        className="image-card-express-1"
                      />
                      <p>
                        {card.title} {card.subtitle}
                      </p>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            <div className="divs-tableexpress">
              <Card
                bordered={false}
                style={{
                  width: "11rem",
                  height: "12rem",
                  background: "#FAFAFA",
                }}
              >
                <img
                  alt="abc"
                  src="../images/straight.png"
                  className="image-card-express"
                />
                <p>White Cotton</p>
              </Card>
              <Card
                bordered={false}
                style={{
                  width: "11rem",
                  height: "12rem",
                  background: "#FAFAFA",
                }}
              >
                <img
                  alt="abc"
                  src="../images/straight.png"
                  className="image-card-express"
                />
                <p>Black Cotton</p>
              </Card>
              <Card
                bordered={false}
                style={{
                  width: "11rem",
                  height: "12rem",
                  background: "#FAFAFA",
                }}
              >
                <img
                  alt="abc"
                  src="../images/straight.png"
                  className="image-card-express"
                />
                <p>Natural Cotton</p>
              </Card>
            </div>
            <div className="divs-tableexpress">
              <Card
                bordered={false}
                style={{
                  width: "11rem",
                  height: "12rem",
                  background: "#FAFAFA",
                }}
              >
                <img
                  alt="abc"
                  src="../images/straight.png"
                  className="image-card-express"
                />
                <p>One Color</p>
              </Card>
              <Card
                bordered={false}
                style={{
                  width: "11rem",
                  height: "12rem",
                  background: "#FAFAFA",
                }}
              >
                <img
                  alt="abc"
                  src="../images/straight.png"
                  className="image-card-express"
                />
                <p>Two Color</p>
              </Card>
              <Card
                bordered={false}
                style={{
                  width: "11rem",
                  height: "12rem",
                  background: "#FAFAFA",
                }}
              >
                <img
                  alt="abc"
                  src="../images/straight.png"
                  className="image-card-express"
                />
                <p>Three Color</p>
              </Card>
              <Card
                bordered={false}
                style={{
                  width: "11rem",
                  height: "12rem",
                  background: "#FAFAFA",
                }}
              >
                <img
                  alt="abc"
                  src="../images/straight.png"
                  className="image-card-express"
                />
                <p>Four Color</p>
              </Card>
            </div>

            <div className="divs-tableexpress">
              <Card
                bordered={false}
                style={{
                  width: "11rem",
                  height: "12rem",
                  background: "#FAFAFA",
                }}
              >
                <img
                  alt="abc"
                  src="../images/straight.png"
                  className="image-card-express"
                />
                <p>None</p>
              </Card>
              <Card
                bordered={false}
                style={{
                  width: "11rem",
                  height: "12rem",
                  background: "#FAFAFA",
                }}
              >
                <img
                  alt="abc"
                  src="../images/straight.png"
                  className="image-card-express"
                />
                <p>
                  Yes I Need <br />
                  Versions
                </p>
              </Card>
            </div>
            <div className="divs-tableexpress">
              <Card
                bordered={false}
                style={{
                  width: "11rem",
                  height: "12rem",
                  background: "#FAFAFA",
                }}
              >
                <img
                  alt="abc"
                  src="../images/straight.png"
                  className="image-card-express"
                />
                <p>
                  Digital Proof <br />
                  Only
                </p>
              </Card>
              <Card
                bordered={false}
                style={{
                  width: "11rem",
                  height: "12rem",
                  background: "#FAFAFA",
                }}
              >
                <img
                  alt="abc"
                  src="../images/straight.png"
                  className="image-card-express"
                />
                <p>Digital Proof Only & Sample Photo</p>
              </Card>
            </div>
            <div className="divs-tableexpress">
              <Card
                bordered={false}
                style={{
                  width: "11rem",
                  height: "12rem",
                  background: "#FAFAFA",
                }}
              >
                <img
                  alt="abc"
                  src="../images/straight.png"
                  className="image-card-express"
                />
                <p>
                  STANDARD:15 <br />
                  Business Days
                </p>
              </Card>
              <Card
                bordered={false}
                style={{
                  width: "11rem",
                  height: "12rem",
                  background: "#FAFAFA",
                }}
              >
                <img
                  alt="abc"
                  src="../images/straight.png"
                  className="image-card-express"
                />
                <p>
                  RUSH:10 <br />
                  Business Days
                </p>
              </Card>
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
              <p className="marg-bot">Custom Cotton Labels </p>
              <div className="sticky-blue-inside">
                <p>Artwork File:</p>
                <p>No Artwork Uploaded</p>
              </div>
            </div>
            <div className="sticky-blue">
              <div className="sticky-blue-inside">
                <p>Size:</p>
                <p>2" / 0.625" (50.80mm x 15.88mm)</p>
              </div>
            </div>
            <div className="sticky-blue">
              <div className="sticky-blue-inside">
                <p>Style:</p>
                <p>Straight Cut (Flat)</p>
              </div>
            </div>
            <div className="sticky-blue">
              <div className="sticky-blue-inside">
                <p>Cotton Material Color:</p>
                <p>White Cotton</p>
              </div>
            </div>
            <div className="sticky-blue">
              <div className="sticky-blue-inside">
                <p>Versions:</p>
                <p>None</p>
              </div>
            </div>
            <div className="sticky-blue">
              <div className="sticky-blue-inside">
                <p>Proof Options:</p>
                <p>Digital Proof Only</p>
              </div>
            </div>
            <div className="sticky-blue">
              <div className="sticky-blue-inside">
                <p>Turnaround Options:</p>
                <p>Standard: 15 Business Days</p>
              </div>
            </div>
            <div className="sticky-blue">
              <div className="sticky-blue-inside">
                <p>5 pcs</p>
                <p>$11/Each</p>
                <p>$55.00</p>
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
                <a href="mailto:demo@example.com">
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

export default Customcottontable;

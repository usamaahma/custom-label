import React, { useState } from "react";
import { Button, Card, Col, Row, Upload, message } from "antd";
import "./tablescart.css";
import LastTable1 from "./lasttable";
import { useCart } from "../../context/cartcontext";

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

// Card data
const cardData = [
  { id: 1, imgSrc: "../images/straight.png", title: "0.75 x 1" },
  { id: 2, imgSrc: "../images/straight.png", title: "1 x 1.5" },
  { id: 3, imgSrc: "../images/straight.png", title: "1.5 x 2" },
  { id: 4, imgSrc: "../images/straight.png", title: "0.75 x 1" },
  { id: 5, imgSrc: "../images/straight.png", title: "1 x 1.5" },
  { id: 6, imgSrc: "../images/straight.png", title: "1.5 x 2" },
  { id: 7, imgSrc: "../images/straight.png", title: "0.75 x 1" },
  { id: 8, imgSrc: "../images/straight.png", title: "1 x 1.5" },
  { id: 9, imgSrc: "../images/straight.png", title: "1.5 x 2" },
  { id: 10, imgSrc: "../images/straight.png", title: "0.75 x 1" },
  { id: 11, imgSrc: "../images/straight.png", title: "1 x 1.5" },
  { id: 12, imgSrc: "../images/straight.png", title: "1.5 x 2" },
  { id: 13, imgSrc: "../images/straight.png", title: "0.75 x 1" },
  { id: 14, imgSrc: "../images/straight.png", title: "1 x 1.5" },
  { id: 15, imgSrc: "../images/straight.png", title: "1.5 x 2" },
  { id: 16, imgSrc: "../images/straight.png", title: "0.75 x 1" },
  // Add more items as needed
];
const card1 = [
  {
    title: "None",
    imgSrc: "../images/straight.png",
  },
  {
    title: (
      <p>
        Yes,I need <br />
        versions
      </p>
    ),
    imgSrc: "../images/straight.png",
  },
];

function CenteredColumns() {
  const { addToCart } = useCart();

  // State for selected data
  const [selectedData, setSelectedData] = useState({
    artwork: "No Artwork Uploaded",
    size: '0.75" / 1" (19.05mm x 25.40mm)',
    style: "Straight Cut (Flat)",
    versions: "None",
    proofOptions: "Digital Proof Only",
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

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  return (
    <div className="table-express">
      <Row className="centered-row-table">
        <Col xs={24} md={16} className="left-column">
          <div className="size-txt">
            <h2 className="simpletable-heading">Upload Artwork</h2>
          </div>
          <div>
            <Dragger {...props} style={{ marginTop: "3rem",background:"#FAF4EB" }}>
              <p className="ant-upload-drag-icon">
                <i className="fa fa-upload" aria-hidden="true"></i>
              </p>
              <p className="ant-upload-text">Upload Your Artwork File?</p>
            </Dragger>
          </div>
          <div className="size-txt">
            <h2 className="simpletable-heading">Style?</h2>
          </div>
          <div className="divs-tableexpress">
            <Card
              bordered={false}
              style={{ width: "11rem", height: "12rem", background: "#FAF4EB" }}
              onClick={() => handleCardClick("style", "Straight Cut (Flat)")}
            >
              <img
                alt="Straight Cut"
                src="../images/straight.png"
                className="image-card-express"
              />
              <p>
                Straight Cut <br />
                (Flat)
              </p>
            </Card>
          </div>

          <div className="size-txt">
            <h2 className="simpletable-heading">Size?</h2>
          </div>
          <div className="divs-tableexpress">
            <div className="card-grid">
              {cardData.map((card) => (
                <div key={card.id} className="card-container">
                  <Card
                    bordered={false}
                    onClick={() => handleCardClick("size", card.title)}
                    style={{ background: "#FAF4EB" }}
                  >
                    <img
                      alt={card.title}
                      src={card.imgSrc}
                      className="image-card-express-1"
                    />
                    <p>{card.title}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <div className="size-txt">
            <h2 className="simpletable-heading">
              Size Symbol or Color Versions?
            </h2>
          </div>
          <div className="divs-tableexpress">
            {card1.map((card) => (
              <div key={card.id} className="card-container">
                <Card
                  bordered={false}
                  onClick={() => handleCardClick("versions", card.title)}
                  style={{ background: "#FAF4EB" }}
                >
                  <img
                    alt={card.title}
                    src={card.imgSrc}
                    className="image-card-express-1"
                  />
                  <p>{card.title}</p>
                </Card>
              </div>
            ))}
          </div>
          <div className="size-txt">
            <h2 className="simpletable-heading">Proof options?</h2>
          </div>
          <div className="divs-tableexpress">
            <Card
              bordered={false}
              style={{
                width: "11rem",
                height: "12rem",
                background: "#FAF4EB",
              }}
            >
              <img
                alt="abc"
                src="../images/straight.png"
                className="image-card-express"
              />
              <p>
                Digital Proof
                <br />
                Only
              </p>
            </Card>
          </div>
          <div className="size-txt">
            <h2 className="simpletable-heading">Turnaround options?</h2>
          </div>
          <div className="divs-tableexpress">
            <Card
              bordered={false}
              style={{
                width: "11rem",
                height: "12rem",
                background: "#FAF4EB",
              }}
            >
              <img
                alt="abc"
                src="../images/straight.png"
                className="image-card-express"
              />
              <p>
                RUSH: <br />3 Business Days
              </p>
            </Card>
          </div>
          <div className="size-txt">
            <h2 className="simpletable-heading">Comments?</h2>
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
          <div className="size-txt">
            <h2 className="simpletable-heading">Quantity?</h2>
          </div>
          <div className="divs-tableexpress">
            <LastTable1 />
          </div>
        </Col>

        <Col xs={24} md={8} className="right-column">
          <div className="sticky-div">
            <div className="sticky-first">
              <p>Your Instant Quote</p>
            </div>
            <div className="sticky-blue-1">
              <p className="marg-bot">Express Clothing Labels</p>
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
                <Button
                  onClick={() =>
                    handleAddToCart({ id: 1, name: "Product 1", price: 10.1 })
                  }
                  className="button-tablecart"
                >
                  <i className="fa fa-cart-arrow-down" aria-hidden="true"></i>{" "}
                  ADD TO CART
                </Button>
              </div>
            </div>
            <div>
              <div className="sticky-help">
                <p>Need Help?</p>
                <a href="tel:+1234567890">
                  <i
                    className="fa fa-phone-square size-i"
                    aria-hidden="true"
                  ></i>
                </a>
                <a href="mailto:demo@example.com">
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

export default CenteredColumns;

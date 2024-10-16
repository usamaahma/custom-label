import React, { useState } from "react";
import { Button, Card, Col, Row, Upload, message } from "antd";
import LastTable1 from "./lasttable";
import { useCart } from "../../context/cartcontext";
import "./tablescart.css";
import "./expresshero.css";
import { UploadOutlined } from "@ant-design/icons";

const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: true,
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  onChange(info) {
    const { status, response } = info.file;
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      // Check the status code
      const errorMessage =
        response?.status === 503
          ? "The server is currently unavailable. Please try again later."
          : `${info.file.name} file upload failed.`;
      message.error(errorMessage);
      console.error("Error details:", response);
    }
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
const imagesData = [
  { src: "../images/center1.png", text: "Free Graphics" },
  { src: "../images/center2.png", text: "Eco-Friendly" },
  { src: "../images/center3.png", text: "Environmental Friendly Ink" },
  { src: "../images/center4.png", text: "Short Run" },
  { src: "../images/center5.png", text: "Custom Size & Style" },
  { src: "../images/center6.png", text: "Competitive Price" },
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
  const [selectedImage, setSelectedImage] = useState("../images/martin.png");
  // State to track mouse position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);

  // The full text
  const fullText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`;

  // The truncated version of the text (first 100 characters, you can adjust as needed)
  const truncatedText = `${fullText.substring(0, 100)}`;

  // Toggle function to switch between expanded and collapsed states
  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  // Array of images for the thumbnail carousel
  const thumbnailImages = [
    "../images/martin.png",
    "../images/girl.png",
    "../images/post.png",
    "../images/martin.png",
  ];

  // Function to handle mouse movement over the image
  const handleMouseMove = (e) => {
    // Get the dimensions of the image container
    const { left, top, width, height } = e.target.getBoundingClientRect();
    // Calculate mouse position as a percentage of the image
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });

    // Set the transform origin based on mouse position
    e.target.style.transformOrigin = `${x}% ${y}%`;
    e.target.style.transform = "scale(2)"; // Scale the image when hovering
  };

  // Function to reset image scale when the mouse leaves
  const handleMouseLeave = (e) => {
    e.target.style.transform = "scale(1)";
    e.target.style.transformOrigin = "center center";
  };

  return (
    <div className="table-express">
      <Row className="centered-row-table">
        <Col xs={24} md={8} lg={12} className="left-column ">
          <div className="image-column">
            {" "}
            <div className="main-image-container">
              <img
                alt="Express Clothing Labels"
                src={selectedImage}
                className="img-fluid main-image"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              />
            </div>
            <div className="thumbnail-carousel">
              {thumbnailImages.map((image, index) => (
                <img
                  key={index}
                  alt={`Thumbnail ${index}`}
                  src={image}
                  className="thumbnail-image"
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
          </div>
          <div className="size-txt">
            <h2 className="simpletable-heading">Upload Artwork</h2>
          </div>
          <div className="divs-tableexpress">
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from
                uploading company data or other banned files.
              </p>
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
        <Col xs={24} md={8} lg={6} className="center-column ">
          <h3>Express Clothing</h3>
          <p style={{ width: "90%" }}>
            {/* If isExpanded is true, show the full text, else show the truncated version */}
            {isExpanded ? fullText : truncatedText}{" "}
            <button onClick={toggleText} className="readmore-button">
              {isExpanded ? "Read Less" : "Read More.."}
            </button>
          </p>

          <div>
            <div className="image-container-express">
              {imagesData.map((image, index) => (
                <div className="image-wrapper-express" key={index}>
                  <img
                    src={image.src}
                    alt={image.text}
                    className="responsive-image1"
                  />
                  <p className="center-text-images">{image.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Col>
        <div className="center-nodisplay">
          <h2>Express Clothing</h2>
          <p style={{ width: "80%",fontSize:"large" }}>
            {/* If isExpanded is true, show the full text, else show the truncated version */}
            {isExpanded ? fullText : truncatedText}{" "}
            <button onClick={toggleText} className="readmore-button">
              {isExpanded ? "Read Less" : "Read More.."}
            </button>
          </p>

          <div>
            <div className="image-container-express">
              {imagesData.map((image, index) => (
                <div className="image-wrapper-express" key={index}>
                  <img
                    src={image.src}
                    alt={image.text}
                    className="responsive-image1"
                  />
                  <p className="center-text-images">{image.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Col xs={24} md={8} lg={5} className="right-column">
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

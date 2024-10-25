import React, { useState, useEffect } from "react";
import LastTable1 from "../expressclothing/lasttable";
import { useCart } from "../../context/cartcontext";
import {
  Button,
  Card,
  Col,
  Breadcrumb,
  Select,
  Row,
  Slider,
  Progress,
  message,
  Upload,
} from "antd";
import { SketchPicker } from "react-color";
import "../expressclothing/expressmain.css";
import { Slide } from "react-awesome-reveal";
import { GiCloudUpload } from "react-icons/gi";
import "../expressclothing/tablescart.css";

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
  { id: 1, imgSrc: "../images/sizes/2 x 2.jpg", title: "None" },
  { id: 2, imgSrc: "../images/sizes/2 x 2.jpg", title: "Square" },
  { id: 3, imgSrc: "../images/sizes/2 x 2.jpg", title: "Rounded" },
];
const card1 = [
  { id: 1, imgSrc: "../images/sizes/2 x 1.5.jpg", title: "2.75 x .875" },
  { id: 2, imgSrc: "../images/sizes/2 x 2.jpg", title: "3 x 1" },
];

const imagesData = [
  { src: "../images/center1.png", text: "Fastest 3-Day Turnaround" },
  { src: "../images/center2.png", text: "Custom Woven Labels Made in USA" },
  { src: "../images/center3.png", text: "Straight Cut / Sew-on Only" },
  { src: "../images/center4.png", text: "Manufactured in New York" },
  { src: "../images/center5.png", text: "Custom Size & Style" },
  { src: "../images/center6.png", text: "Free Artwork Assistance" },
];

const { Option } = Select;

function Wovenlabeldesc() {
  const { addToCart } = useCart();
  useEffect(() => {
    const stickyDiv = document.querySelector(".sticky-div");

    const handleScroll = () => {
      if (stickyDiv) {
        if (window.scrollY > 200) {
          // Increase this value for more scroll
          stickyDiv.classList.add("scrolled-padding");
        } else {
          stickyDiv.classList.remove("scrolled-padding");
        }
      }
    };

    // Add event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // State for selected data
  const [color, setColor] = useState("#000"); // Default color
  const [text1, setText1] = useState(""); // State for first text input
  const [text2, setText2] = useState(""); // State for second text input
  const [fontSize, setFontSize] = useState(16); // Default font size for text1
  const [fontSize1, setFontSize1] = useState(16); // Default font size for text2
  const [fontFamily, setFontFamily] = useState("Arial"); // Default font family
  const defaultText1 = "Your Company"; // Default text for the first input

  const handleChangeComplete = (color) => {
    setColor(color.hex);
  };

  const handleSliderChange = (value) => {
    setFontSize(value); // Set font size based on slider value for text1
  };

  const handleSliderChange1 = (value) => {
    setFontSize1(value); // Set font size based on slider value for text2
  };

  const handleText1Change = (e) => {
    setText1(e.target.value);
  };

  const handleText2Change = (e) => {
    setText2(e.target.value);
  };

  const handleFontFamilyChange = (value) => {
    setFontFamily(value); // Set font family based on dropdown selection
  };

  const [selectedData, setSelectedData] = useState({
    size: '2.75" / 0.875" (69.85mm x 22.22mm)',
    turnaroundOptions: "Standard: 15 Business Days",
  });

  // Function to handle card clicks
  const handleCardClick = (key, value) => {
    setSelectedData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
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
    "../images/girl.png",
    "../images/martin.png",
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
  const handleAddToCart = (item) => {
    addToCart(item);
  };

  return (
    <div className="first-main-express">
      <div className="headingbread">
        <p className="express-clothing-heading">Woven Text Labels</p>
        <Breadcrumb
          items={[
            {
              title: <a href="/">Home</a>,
            },
            {
              title: <a href="/all-clothing-labels">Clothing Labels</a>,
            },

            {
              title: "Woven Text Labels",
            },
          ]}
          className="breadcrumb"
        />
      </div>
      <div className="main-express">
        <div className="column-direction-express">
          <div className="inside-col-dire">
            {" "}
            {/* First Div */}
            <div>
              {" "}
              <div style={{ margin: "0 auto" }}>
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
            </div>
            {/* Second Div */}
            <div className="express-second-div">
              {" "}
              <h2>Woven Text Labels</h2>
              <p
                style={{ width: "70%", textAlign: "center", margin: "0 auto" }}
              >
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
          </div>
          <div className="txtmain">
            <p className="how">Order Process</p>
            <p className="at" style={{ width: "70%", margin: "0 auto" }}>
              We provide a free digital proof and photo sample for approval
              before production, ensuring 100% satisfaction.
            </p>

            <div className="image-row">
              <div className="image-item">
                <img
                  src="../../images/upload.png"
                  alt="Upload"
                  className="step-image-express"
                />
                <p className="image-text">Upload Artwork</p>
              </div>
              <div className="image-item">
                <Slide cascade>
                  {" "}
                  <img
                    src="../../images/arrow.svg"
                    alt="Arrow"
                    className="step-image1"
                  />{" "}
                </Slide>
              </div>
              <div className="image-item">
                <img
                  src="../../images/approve.png"
                  alt="Approve"
                  className="step-image-express"
                />
                <p className="image-text">Approve Digital Proof</p>
              </div>
              <div className="image-item">
                <Slide cascade>
                  <img
                    src="../../images/arrow.svg"
                    alt="Approve"
                    className="step-image1"
                  />
                </Slide>
              </div>
              <div className="image-item">
                <img
                  src="../../images/receive.png"
                  alt="Approve"
                  className="step-image-express"
                />
                <p className="image-text">Receive Order</p>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "2rem" }}>
            <div className="size-txt">
              <h3 className="simpletable-heading">Size?</h3>
            </div>
            <div className="divs-tableexpress">
              <div className="card-container">
                {card1.map((card) => (
                  <Card
                    key={card.id}
                    onClick={() => handleCardClick("size", card.title)}
                    bordered={false}
                    style={{
                      background: "#FAFAFA",
                    }}
                  >
                    <img
                      alt={card.alt}
                      src={card.imgSrc}
                      className="image-card-express"
                    />
                    <p>{card.title}</p>
                  </Card>
                ))}
              </div>
            </div>
            <div className="size-txt">
              <h3 className="simpletable-heading">Text Line #1?</h3>
            </div>
            <div className="divs-tableexpress">
              <div className="card-grid-input">
                <input
                  type="text"
                  className="full-width-input"
                  placeholder="Enter text here"
                  value={text1}
                  onChange={handleText1Change}
                />
              </div>
            </div>

            <div className="size-txt">
              <h3 className="simpletable-heading">Text Line #1 Font?</h3>
            </div>
            <div className="divs-tableexpress">
              <Select
                className="font-selector"
                placeholder="Select a font"
                style={{ width: "100%" }}
                onChange={handleFontFamilyChange} // Update font family on selection
              >
                <Option value="Arial">Arial</Option>
                <Option value="Roboto">Roboto</Option>
                <Option value="Times New Roman">Times New Roman</Option>
                <Option value="Georgia">Georgia</Option>
              </Select>
            </div>
            <div className="size-txt">
              <h3 className="simpletable-heading">Text Line #1 Size?</h3>
            </div>
            <div className="divs-tableexpress">
              <Slider
                min={10}
                max={100}
                value={fontSize}
                onChange={handleSliderChange}
                tooltipVisible
                className="custom-slider"
              />
            </div>
            <div className="size-txt">
              <h3 className="simpletable-heading">Text Line 2?</h3>
            </div>
            <div className="divs-tableexpress">
              <input
                type="text"
                className="full-width-input"
                placeholder="Enter text here"
                value={text2}
                onChange={handleText2Change}
              />
            </div>
            <div className="size-txt">
              <h3 className="simpletable-heading">Text Line #2 Font?</h3>
            </div>
            <div className="divs-tableexpress">
              <Select
                className="font-selector"
                placeholder="Select a font"
                style={{ width: "100%" }}
                onChange={handleFontFamilyChange} // Update font family on selection
              >
                <Option value="Arial">Arial</Option>
                <Option value="Roboto">Roboto</Option>
                <Option value="Times New Roman">Times New Roman</Option>
                <Option value="Georgia">Georgia</Option>
              </Select>
            </div>
            <div className="size-txt">
              <h3 className="simpletable-heading">Text Line #2 Size?</h3>
            </div>
            <div className="divs-tableexpress">
              <Slider
                min={10}
                max={100}
                value={fontSize1}
                onChange={handleSliderChange1}
                tooltipVisible
                className="custom-slider"
              />
            </div>
            <div className="size-txt">
              <h3 className="simpletable-heading">Background Color?</h3>
            </div>
            <div className="divs-tableexpress">
              <SketchPicker
                color={color}
                onChangeComplete={handleChangeComplete}
                disableAlpha // Optional: Disable alpha (transparency) slider
              />
            </div>
            <div className="size-txt">
              <h3 className="simpletable-heading">Border?</h3>
            </div>
            <div className="divs-tableexpress">
              {cardData.map((card) => (
                <div key={card.id} className="card-container">
                  <Card
                    bordered={false}
                    style={{
                      width: "11rem",
                      height: "12rem",
                      background: "#FAFAFA",
                    }}
                  >
                    <img
                      alt={card.title}
                      src={card.imgSrc}
                      className="image-card-express"
                    />
                    <p>
                      {card.title} <br /> {card.subtitle}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
            <div className="size-txt">
              <h3 className="simpletable-heading">Turnaround Options?</h3>
            </div>
            <div className="divs-tableexpress">
              <Card
                bordered={false}
                onClick={() =>
                  handleCardClick(
                    "turnaroundOptions",
                    "Standard: 15 Business Days"
                  )
                }
                style={{
                  width: "11rem",
                  height: "12rem",
                  background: "#FAFAFA",
                }}
              >
                <img
                  alt="abc"
                  src="../images/sizes/rush3.png"
                  className="image-card-express"
                />
                <p>Standard: 15</p>
                <p>Business Days</p>
              </Card>
            </div>
            <div className="size-txt">
              <h3 className="simpletable-heading">Quantity?</h3>
            </div>
            <div className="divs-tableexpress">
              <LastTable1 />
            </div>
          </div>
        </div>

        {/* Third div */}

        <div>
          {" "}
          <div className="sticky-div">
            <div className="sticky-first">
              <p>Your Instant Quote</p>
            </div>
            <div className="sticky-blue-1">
              <p className="marg-bot">Woven Text Labels</p>
              <div className="sticky-blue-inside">
                <div
                  className="dynamic-label-text"
                  style={{
                    fontFamily: fontFamily,
                    backgroundColor: color, // Set the background color to the selected color for the entire div
                    padding: "10px", // Optional: Add padding for better spacing
                  }}
                >
                  <p
                    style={{
                      fontSize: fontSize, // Apply fontSize1 to text1
                      margin: "0", // Remove margin for consistent spacing
                    }}
                  >
                    {text1 || defaultText1}
                  </p>
                  <p
                    style={{
                      fontSize: fontSize1, // Apply fontSize2 to text2
                      margin: "0", // Remove margin for consistent spacing
                    }}
                  >
                    {text2}
                  </p>
                </div>
              </div>{" "}
            </div>

            <div className="sticky-blue">
              <div className="sticky-blue-inside">
                <p>Size:</p>
                <p>{selectedData.size}</p>
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
        </div>
      </div>
    </div>
  );
}

export default Wovenlabeldesc;

import React, { useState } from "react";
import { Button, Card, Col, Select, Row, Slider, Progress } from "antd";
import { SketchPicker } from "react-color";
import "../expressclothing/tablescart.css";
import LastTable1 from "../expressclothing/lasttable";

const { Option } = Select;

const cardData = [
  { id: 1, imgSrc: "../images/straight.png", title: "None" },
  { id: 2, imgSrc: "../images/straight.png", title: "Square" },
  { id: 3, imgSrc: "../images/straight.png", title: "Rounded" },
];
const card1 = [
  { id: 1, imgSrc: "../images/straight.png", title: "2.75 x .875" },
  { id: 2, imgSrc: "../images/straight.png", title: "3 x 1" },
];

function Wovenlabeldesc() {
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
    artwork: "No Artwork Uploaded",
    size: '2.75" / 0.875" (69.85mm x 22.22mm)',
    turnaroundOptions: "Standard: 15 Business Days",
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
      <Row className="centered-row-table-label">
        <Col xs={24} md={16} className="left-column">
          <div>
            <div className="divs-tableexpress">
              {card1.map((card) => (
                <Card
                  key={card.id}
                  onClick={() => handleCardClick("size", card.title)}
                  bordered={false}
                  style={{
                    width: "11rem",
                    height: "12rem",
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
            <div className="divs-tableexpress">
              <div className="card-grid-input">
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
            </div>

            <div className="progress-bar-container">
              <div className="custom-slider-wrapper">
                <Slider
                  min={10}
                  max={100}
                  value={fontSize}
                  onChange={handleSliderChange}
                  tooltipVisible
                  className="custom-slider"
                />
              </div>
            </div>

            <div className="divs-tableexpress">
              <div className="card-grid-input">
                <input
                  type="text"
                  className="full-width-input"
                  placeholder="Enter text here"
                  value={text2}
                  onChange={handleText2Change}
                />
              </div>
            </div>  
            <div className="divs-tableexpress">
              <div className="card-grid-input">
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
            </div>

            <div className="progress-bar-container">
              <div className="custom-slider-wrapper">
                <Slider
                  min={10}
                  max={100}
                  value={fontSize1}
                  onChange={handleSliderChange1}
                  tooltipVisible
                  className="custom-slider"
                />
              </div>
            </div>
            <div className="progress-bar-container">
              <SketchPicker
                color={color}
                onChangeComplete={handleChangeComplete}
                disableAlpha // Optional: Disable alpha (transparency) slider
              />
              <div
                className="selected-color-display"
                style={{
                  backgroundColor: color,
                  height: "50px",
                  width: "100px",
                  marginTop: "10px",
                }}
              />
            </div>
            <div className="divs-tableexpress">
              <div className="card-grid">
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
                  src="../images/straight.png"
                  className="image-card-express"
                />
                <p>Standard: 15</p>
                <p>Business Days</p>
              </Card>
            </div>
            <div className="divs-tableexpress">
              <LastTable1 />
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
            <div className="sticky-blue">
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
                <p>1000 pcs</p>
                <p>$0.54/Each</p>
                <p>$540.00</p>
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

export default Wovenlabeldesc;

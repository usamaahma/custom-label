import React, { useState, useEffect } from "react";
import { Button, Card, Breadcrumb } from "antd";
import LastTable1 from "../expressclothing/lasttable";
import { useCart } from "../../context/cartcontext";
import "../expressclothing/expressmain.css";
import { Slide } from "react-awesome-reveal";
import { GiCloudUpload } from "react-icons/gi";
import ImageUploader from "../expressclothing/imagedragger";

const cardstyledata = [
  { id: 1, imgSrc: "../images/sizes/style.jpg", title: "Straight Cut (Flat)" },
  { id: 2, imgSrc: "../images/sizes/style.jpg", title: "Centre Fold" },
  { id: 3, imgSrc: "../images/sizes/style.jpg", title: "Loop Fold " },
  { id: 4, imgSrc: "../images/sizes/style.jpg", title: "End Fold" },
  { id: 6, imgSrc: "../images/sizes/style.jpg", title: "Book Cover Fold" },
  { id: 5, imgSrc: "../images/sizes/style.jpg", title: "Manhatten Fold" },
  { id: 7, imgSrc: "../images/sizes/style.jpg", title: "Book Cover Fold" },

  // Add more items as needed
];
const cardsizedata = [
  { id: 1, imgSrc: "../images/sizes/2 x 1.jpg", title: "2 x 0.625" },
  { id: 2, imgSrc: "../images/sizes/2 x 1.jpg", title: "2 x 1" },
  { id: 3, imgSrc: "../images/sizes/2 x 2.jpg", title: "2 x 2 " },
  { id: 4, imgSrc: "../images/sizes/2 x 2.5.jpg", title: "Custom" },
];
const cardbackptiondata = [
  { id: 1, imgSrc: "../images/straight.png", title: "None" },
  { id: 2, imgSrc: "../images/straight.png", title: "IronOn" },
  { id: 3, imgSrc: "../images/straight.png", title: "Peel & Stick" },
];
const cardmetallicdata = [
  { id: 1, imgSrc: "../images/straight.png", title: "One Color" },
  { id: 2, imgSrc: "../images/straight.png", title: "Two Colors" },
  { id: 3, imgSrc: "../images/straight.png", title: "Three Colors" },
  { id: 4, imgSrc: "../images/straight.png", title: "Four Colors" },
];
const versions = [
  { id: 1, imgSrc: "../images/straight.png", title: "None" },
  { id: 2, imgSrc: "../images/straight.png", title: "Yes, I Need Versions" },
];
const turnaroundoptions = [
  {
    id: 1,
    imgSrc: "../images/straight.png",
    title: "Standard: 15 Business Days",
  },
  { id: 2, imgSrc: "../images/straight.png", title: "RUSH: 10 Business Days" },
];

const card1 = [
  {
    title: "Digital Proof Only",
    imgSrc: "../images/straight.png",
  },
  {
    title: <p>Digital Proof & Sample Photo</p>,
    imgSrc: "../images/straight.png",
  },
];
const imagesData = [
  { src: "../images/center1.png", text: "Fastest 3-Day Turnaround" },
  { src: "../images/center2.png", text: "Custom Woven Labels Made in USA" },
  { src: "../images/center3.png", text: "Straight Cut / Sew-on Only" },
  { src: "../images/center4.png", text: "Manufactured in New York" },
  { src: "../images/center5.png", text: "Custom Size & Style" },
  { src: "../images/center6.png", text: "Free Artwork Assistance" },
];

function Screenprintedhero() {
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
  const [selectedData, setSelectedData] = useState({
    artwork: "No Artwork Uploaded",
    size: '0.75" / 1" (19.05mm x 25.40mm)',
    style: "Straight Cut (Flat)",
    backing: "None (Sew-On)",
    printcolor: "One Color",
    versions: "None",
    proofOptions: "Digital Proof Only",
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

  const handleAddToCart = (item) => {
    addToCart(item);
  };
  const [selectedImage, setSelectedImage] = useState("../images/martin.png");
  // State to track mouse position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  const [image, setImage] = useState(null);

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
  useEffect(() => {
    // Get the uploaded image from local storage
    const uploadedImage = localStorage.getItem("uploadedImage");
    if (uploadedImage) {
      setImage(uploadedImage); // Set the image to state if it exists
    }
  }, []);

  return (
    <div className="first-main-express">
      <div className="headingbread">
        <p className="express-clothing-heading">Screen Printed Labels</p>
        <Breadcrumb
          items={[
            {
              title: <a href="/">Home</a>,
            },
            {
              title: <a href="/all-clothing-labels">Clothing Labels</a>,
            },

            {
              title: "Screen Printed Labels",
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
              <h2>Screen Printed Labels</h2>
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
              <h3 className="simpletable-heading">Upload Artwork</h3>
            </div>
            <div className="divs-tableexpress">
              <ImageUploader />
            </div>
            <div className="size-txt">
              <h3 className="simpletable-heading">Style?</h3>
            </div>
            <div className="divs-tableexpress">
              <div className="card-grid">
                <div className="card-grid">
                  {cardstyledata.map((card) => (
                    <div key={card.id} className="card-container">
                      <Card
                        bordered={false}
                        onClick={() => handleCardClick("style", card.title)}
                        style={{ background: "#FAF4EB" }}
                      >
                        <img
                          alt={card.title}
                          src={card.imgSrc}
                          className="image-card-express"
                        />
                        <p>{card.title}</p>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="size-txt">
              <h3 className="simpletable-heading">Size?</h3>
            </div>
            <div className="divs-tableexpress">
              <div className="card-grid">
                {cardsizedata.map((card) => (
                  <div key={card.id} className="card-container">
                    <Card
                      bordered={false}
                      style={{
                        width: "8rem",
                        height: "12rem",
                        background: "#FAF4EB",
                        textAlign: "center",
                      }}
                      onClick={() => handleCardClick("size", card.title)}
                    >
                      <img
                        alt={card.title}
                        src={card.imgSrc}
                        className="image-card-express"
                      />
                      <p>{card.title}</p>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            <div className="size-txt">
              <h3 className="simpletable-heading">Backing Options?</h3>
            </div>
            <div className="divs-tableexpress">
              <div className="card-grid">
                {cardbackptiondata.map((card) => (
                  <div key={card.id} className="card-container">
                    <Card
                      bordered={false}
                      style={{
                        width: "11rem",
                        height: "12rem",
                        background: "#FAF4EB",
                        textAlign: "center",
                      }}
                      onClick={() => handleCardClick("backing", card.title)}
                    >
                      <img
                        alt="abc"
                        src="../images/straight.png"
                        className="image-card-express"
                      />
                      {card.title}
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            <div className="size-txt">
              <h3 className="simpletable-heading">Print Colors?</h3>
            </div>
            <div className="divs-tableexpress">
              <div className="card-grid">
                {cardmetallicdata.map((card) => (
                  <div key={card.id} className="card-container">
                    <Card
                      bordered={false}
                      style={{
                        width: "8rem",
                        height: "auto",
                        background: "#FAF4EB",
                        textAlign: "center",
                      }}
                      onClick={() => handleCardClick("printcolor", card.title)}
                    >
                      <img
                        alt="abc"
                        src="../images/straight.png"
                        className="image-card-express"
                      />
                      {card.title}
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            <div className="size-txt">
              <h3 className="simpletable-heading">
                Size Symbol or Color Versions?
              </h3>
            </div>
            <div className="divs-tableexpress">
              {versions.map((card) => (
                <div key={card.id} className="card-container">
                  <Card
                    bordered={false}
                    style={{
                      width: "11rem",
                      height: "12rem",
                      background: "#FAF4EB",
                      textAlign: "center",
                    }}
                    onClick={() => handleCardClick("versions", card.title)}
                  >
                    <img
                      alt="abc"
                      src="../images/straight.png"
                      className="image-card-express"
                    />
                    <p>{card.title}</p>
                  </Card>
                </div>
              ))}
            </div>
            <div className="size-txt">
              <h3 className="simpletable-heading">Proof options?</h3>
            </div>
            <div className="divs-tableexpress">
              {card1.map((card) => (
                <div key={card.id} className="card-container">
                  <Card
                    bordered={false}
                    style={{
                      width: "11rem",
                      height: "12rem",
                      background: "#FAF4EB",
                      textAlign: "center",
                    }}
                    onClick={() => handleCardClick("proofOptions", card.title)}
                  >
                    <img
                      alt="abc"
                      src="../images/straight.png"
                      className="image-card-express"
                    />
                    <p>{card.title}</p>
                  </Card>
                </div>
              ))}
            </div>
            <div className="size-txt">
              <h3 className="simpletable-heading">Turnaround options?</h3>
            </div>
            <div className="divs-tableexpress">
              {turnaroundoptions.map((card) => (
                <div key={card.id} className="card-container">
                  <Card
                    bordered={false}
                    style={{
                      width: "11rem",
                      height: "12rem",
                      background: "#FAF4EB",
                      textAlign: "center",
                    }}
                    onClick={() =>
                      handleCardClick("turnaroundOptions", card.title)
                    }
                  >
                    <img
                      alt="abc"
                      src="../images/straight.png"
                      className="image-card-express"
                    />
                    <p>{card.title}</p>
                  </Card>
                </div>
              ))}
            </div>
            <div className="size-txt">
              <h3 className="simpletable-heading">Comments?</h3>
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
              <p className="marg-bot">Screen Printed Labels</p>
              <div className="sticky-blue-inside">
                <p>Artwork File:</p>
                <div>
                  {image ? (
                    <img src={image} alt="Uploaded" style={{ width: "5rem" }} />
                  ) : (
                    <p>No image uploaded.</p>
                  )}
                </div>{" "}
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
                <p>Backing Options:</p>
                <p>{selectedData.backing}</p>
              </div>
            </div>
            <div className="sticky-blue">
              <div className="sticky-blue-inside">
                <p>Print Colors:</p>
                <p>{selectedData.printcolor}</p>
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
        </div>
      </div>
    </div>
  );
}

export default Screenprintedhero;

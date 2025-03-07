import React, { useState, useEffect } from "react";
import { Breadcrumb } from "antd";
import { useCart } from "../../context/cartcontext";
import "../expressclothing/expressmain.css";

// Card data

const imagesData = [
  {
    src: "../images/second-div-2.png",
    heading: "FAST Turnaround Time",
    text: "Standard turnaround time is 12 business days & Expedited order to 8 business days. (Includes Production + FREE Doorsteps Delivery)",
    className: "group-1", // 2nd & 4th ke liye alag class
  },
  {
    src: "../images/second-div-4.png",
    heading: "MINIMUM Order Quantity",
    text: "You can start your order with 50 quantity and the price breaks down as the quantity increases. Contact Support for wholesale pricing.",
    className: "group-1", // 2nd & 4th ke liye alag class
  },
  {
    src: "../images/second-div-1.png",
    heading: "TALK with Expert To Find Solution",
    text: "If you are unsure of choosing the right size, style or stock, feel free to contact us to get our expert advice and bring your idea into reality.",
    className: "group-2", // 1st & 3rd ke liye alag class
  },
  {
    src: "../images/second-div-3.png",
    heading: "FREE Designing",
    text: "We are offering FREE Design Support, You may upload your artwork or email us to get your design proof for approval.",
    className: "group-2", // 1st & 3rd ke liye alag class
  },
];

function Fancyhanghero1() {
  const [sku, setSku] = useState("SKU-8742");
  const [availability, setAvailability] = useState("in stock");

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
    e.target.style.transform = "scale(1.5)"; // Reduced zoom factor
  };

  // Function to reset image scale when the mouse leaves
  const handleMouseLeave = (e) => {
    e.target.style.transform = "scale(1)";
    e.target.style.transformOrigin = "center center"; // Reset to center
  };

  return (
    <div className="first-main-express" style={{ marginBottom: "5rem" }}>
      <div className="headingbread">
        <p className="express-clothing-heading">Fancy Hang Tags </p>
        <Breadcrumb
          items={[
            {
              title: <a href="/">Home</a>,
            },
            {
              title: <a href="/all-clothing-labels">Clothing Labels</a>,
            },

            {
              title: "Fancy Hang Tags",
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
                <div
                  className="main-image-container"
                  style={{
                    position: "relative",
                    overflow: "hidden", // Prevent image from going outside the container
                    width: "100%", // Set width as per your requirement
                    height: "auto", // Maintain the height relative to width
                  }}
                >
                  <img
                    alt="Fancy Hang Tags"
                    src={selectedImage}
                    className="img-fluid main-image"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      borderRadius: "1rem",
                      transition: "transform 0.2s ease-out", // Smooth transition
                      width: "100%", // Make image responsive within the container
                      height: "auto", // Maintain the aspect ratio
                    }}
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
              <div className="title-sku">
                {" "}
                <h1>Fancy Hangtag</h1>
                <div>
                  <p>{sku}</p>
                  <p>{availability}</p>
                </div>
              </div>
              <p className="descriptitle">
                {isExpanded ? fullText : truncatedText}
                <button onClick={toggleText} className="readmore-button">
                  {isExpanded ? "Read Less" : "Read More.."}
                </button>
              </p>
              <div className="second-div-image-container-express">
                {imagesData.map((image, index) => (
                  <div className="product-image-text" key={index}>
                    <img
                      src={image.src}
                      alt={image.text}
                      className={`second-div-responsive-image1 ${
                        index % 2 === 0 ? "image-group-1" : "image-group-2"
                      }`}
                    />
                    <div className="second-div-heading-text">
                      <p className="second-div-heading">{image.heading}</p>
                      <p className="second-div-text">{image.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fancyhanghero1;

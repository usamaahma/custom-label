import React, { useState, useEffect } from "react";
import { useCart } from "../../context/cartcontext";
import {
  Button,
  Card,
  Breadcrumb,
  Select,
  Slider,
  message,
  Upload,
  Form,
  Row,
  Col,
} from "antd";
import { designquote } from "../../utils/axios";
import { SketchPicker } from "react-color";
import "../expressclothing/expressmain.css";
import { Slide } from "react-awesome-reveal";
import "../expressclothing/tablescart.css";
import html2canvas from "html2canvas";
import { Storage } from "../../firebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useAuth } from "../../context/authcontext";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

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
  const { isLoggedIn } = useAuth(); // Access the login state and user info
  const navigate = useNavigate(); // Initialize the navigation hook
  const { addToCart } = useCart();
  const [form] = Form.useForm();
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
  const [selectedBorder, setSelectedBorder] = useState("None"); // Default border type is "None"
  const [selectedCard, setSelectedCard] = useState("None"); // Default border type is "None"
  const [image, setImage] = useState("");
  // Handle image click to change border style
  const handleImageClick = (borderType) => {
    setSelectedBorder(borderType); // Change border based on the clicked image
  };

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
  const [selectedImage, setSelectedImage] = useState("../images/girl.png");
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
    e.target.style.transform = "scale(2)"; // Zoom image on hover
  };

  // Function to reset image scale when the mouse leaves
  const handleMouseLeave = (e) => {
    e.target.style.transform = "scale(1)";
    e.target.style.transformOrigin = "center center"; // Reset to center
  };
  const handleAddToCart = async (item) => {
    return new Promise((resolve, reject) => {
      // Select the .sticky-blue-inside div
      const targetElement = document.querySelector(".sticky-blue-inside");

      if (targetElement) {
        // Capture the selected element as an image
        html2canvas(targetElement).then((canvas) => {
          // Convert the canvas to a Blob
          canvas.toBlob((blob) => {
            if (blob) {
              const date = new Date();
              const timestamp =
                date.getHours() +
                ":" +
                date.getMinutes() +
                ":" +
                date.getSeconds();

              const imageRef = ref(
                Storage,
                `images/${item.name}_${timestamp}.png`
              ); // Create a unique reference for the image

              // Upload the Blob to Firebase Storage
              const uploadTask = uploadBytesResumable(imageRef, blob);

              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  );
                  console.log("Upload progress:", progress, "%");
                },
                (error) => {
                  console.error("Upload error:", error);
                  reject(error); // Reject the promise on error
                },
                async () => {
                  // Get the download URL after upload completes
                  try {
                    const downloadUrl = await getDownloadURL(imageRef);
                    console.log("Image URL:", downloadUrl);
                    resolve(downloadUrl); // Resolve with the image URL
                  } catch (error) {
                    console.error("Error getting download URL:", error);
                    reject(error); // Reject the promise on error
                  }
                }
              );
            } else {
              console.error("Failed to create blob from canvas.");
              reject(new Error("Failed to create blob from canvas."));
            }
          }, "image/png");
        });
      } else {
        console.error("Element '.sticky-blue-inside' not found.");
        reject(new Error("Element '.sticky-blue-inside' not found."));
      }
    });
  };

  const onFinish = async (values) => {
    if (!isLoggedIn) {
      message.error("Please log in or register to proceed.");
      setTimeout(() => {
        navigate("/login"); // Redirect to the login page
      }, 1000); // Add a slight delay to allow the message to display
      return; // Stop further execution of this function
    }

    const loggeduser = JSON.parse(localStorage.getItem("user") || "{}");
    try {
      // Wait for the image URL to be ready (if needed)
      const image = await handleAddToCart({
        id: 1,
        name: values.wovenLabel,
      });

      console.log("Image ready:", values.wovenLabel);

      const data1 = {
        user: [
          {
            userId: loggeduser.id,
            name: loggeduser.name,
            email: loggeduser.email,
            phonenumber: loggeduser.phonenumber,
          },
        ],
        productName: values.wovenLabel, // Ensure this value is dynamic, not a static string
        image: image, // Use the resolved image URL
        size: selectedData.size,
        turnaround: selectedData.turnaroundOptions,
      };

      // Call the API with the data
      const res = await designquote({
        method: "post",
        data: data1,
      });

      console.log("API success response:", res);
      message.success("Thank you for considering us!");
    } catch (error) {
      console.error("Error:", error);
      message.error("Something went wrong, please try again!");
    }
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
            <div className="first-div-width">
              {" "}
              <div
                style={{
                  margin: "0 auto",
                  width: "100%", // Make it full width within the container
                  maxWidth: "30rem",
                }}
              >
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
                    alt="Express Clothing Labels"
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
            <div className="divs-tableexpress" style={{ display: "block" }}>
              <div
                style={{
                  textAlign: "left", // Parent container aligns content to the left
                }}
              >
                <h3
                  className="simpletable-heading"
                  style={{
                    textAlign: "left", // Align heading to top-left
                    padding: "10px 15px", // Space inside the border
                    fontSize: "20px", // Font size
                    color: "#5F6F65", // Text color
                    fontWeight: "bold", // Bold text
                    border: "1px solid #5F6F65", // Elegant border
                    borderRadius: "10px", // Smooth rounded corners
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                    display: "inline-block", // Wraps text tightly
                    backgroundColor: "#ffffff", // Optional: White background for better contrast
                  }}
                >
                  Size?
                </h3>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#5F6F65", // Optional: Adjust color if needed
                    marginTop: "10px",
                  }}
                >
                  Please Choose size from following:
                </h3>
              </div>
              <div className="card-container">
                {card1.map((card) => (
                  <Card
                    key={card.id}
                    onClick={() => {
                      setSelectedCard(card.id); // Sirf ek card ko select karega
                      console.log(card.id);
                      handleCardClick("size", card.title); // Additional logic handle karega
                    }}
                    bordered={false}
                    style={{
                      marginLeft:"1rem",
                      backgroundColor:
                        selectedCard === card.id ? "#FFD700" : "#FAF4EB", // Highlight selected card
                      textAlign: "center",
                      boxShadow:
                        selectedCard === card.id
                          ? "0 4px 8px rgba(0, 0, 0, 0.2)" // Shadow for selected card
                          : "none",
                      transform:
                        selectedCard === card.id ? "scale(1.05)" : "scale(1)", // Zoom effect for selected card
                      transition: "all 0.3s ease", // Smooth transition
                      border:
                        selectedCard === card.id
                          ? "2px solid rgba(0, 0, 0, 0.2)" // Border for selected card
                          : "1px solid transparent", // Default border
                      cursor: "pointer", // Pointer cursor for better UX
                    }}
                  >
                    <img
                      alt={card.alt || "Card Image"}
                      src={card.imgSrc}
                      className="image-card-express"
                    />
                    <p
                      style={{
                        fontWeight:
                          selectedCard === card._id ? "bold" : "normal",
                      }}
                    >
                      {card.title}
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            <div
              className="divs-tableexpress"
              style={{ padding: "20px", display: "block" }}
            >
              <div
                style={{
                  textAlign: "left", // Parent container aligns content to the left
                }}
              >
                <h3
                  className="simpletable-heading"
                  style={{
                    textAlign: "left", // Align heading to top-left
                    padding: "10px 15px", // Space inside the border
                    fontSize: "20px", // Font size
                    color: "#5F6F65", // Text color
                    fontWeight: "bold", // Bold text
                    border: "1px solid #5F6F65", // Elegant border
                    borderRadius: "10px", // Smooth rounded corners
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                    display: "inline-block", // Wraps text tightly
                    backgroundColor: "#ffffff", // Optional: White background for better contrast
                  }}
                >
                  Text Line#1?
                </h3>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#5F6F65", // Optional: Adjust color if needed
                    marginTop: "10px",
                  }}
                >
                  Please Enter Text 1
                </h3>
              </div>
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

            <div className="divs-tableexpress" style={{ display: "block" }}>
              <div
                style={{
                  textAlign: "left", // Parent container aligns content to the left
                }}
              >
                <h3
                  className="simpletable-heading"
                  style={{
                    textAlign: "left", // Align heading to top-left
                    padding: "10px 15px", // Space inside the border
                    fontSize: "20px", // Font size
                    color: "#5F6F65", // Text color
                    fontWeight: "bold", // Bold text
                    border: "1px solid #5F6F65", // Elegant border
                    borderRadius: "10px", // Smooth rounded corners
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                    display: "inline-block", // Wraps text tightly
                    backgroundColor: "#ffffff", // Optional: White background for better contrast
                  }}
                >
                  Text Line#1 Font?
                </h3>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#5F6F65", // Optional: Adjust color if needed
                    marginTop: "10px",
                  }}
                >
                  Please Select Text 1 Font
                </h3>
              </div>
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

            <div className="divs-tableexpress" style={{ display: "block" }}>
              <div
                style={{
                  textAlign: "left", // Parent container aligns content to the left
                }}
              >
                <h3
                  className="simpletable-heading"
                  style={{
                    textAlign: "left", // Align heading to top-left
                    padding: "10px 15px", // Space inside the border
                    fontSize: "20px", // Font size
                    color: "#5F6F65", // Text color
                    fontWeight: "bold", // Bold text
                    border: "1px solid #5F6F65", // Elegant border
                    borderRadius: "10px", // Smooth rounded corners
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                    display: "inline-block", // Wraps text tightly
                    backgroundColor: "#ffffff", // Optional: White background for better contrast
                  }}
                >
                  Text Line#1 Size?
                </h3>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#5F6F65", // Optional: Adjust color if needed
                    marginTop: "10px",
                  }}
                >
                  Please choose font size for Text 1.
                </h3>
              </div>
              <Slider
                min={10}
                max={100}
                value={fontSize}
                onChange={handleSliderChange}
                tooltipVisible
                className="custom-slider"
              />
            </div>

            <div className="divs-tableexpress" style={{ display: "block" }}>
              <div
                style={{
                  textAlign: "left", // Parent container aligns content to the left
                }}
              >
                <h3
                  className="simpletable-heading"
                  style={{
                    textAlign: "left", // Align heading to top-left
                    padding: "10px 15px", // Space inside the border
                    fontSize: "20px", // Font size
                    color: "#5F6F65", // Text color
                    fontWeight: "bold", // Bold text
                    border: "1px solid #5F6F65", // Elegant border
                    borderRadius: "10px", // Smooth rounded corners
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                    display: "inline-block", // Wraps text tightly
                    backgroundColor: "#ffffff", // Optional: White background for better contrast
                  }}
                >
                  Text Line#2?
                </h3>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#5F6F65", // Optional: Adjust color if needed
                    marginTop: "10px",
                  }}
                >
                  Please Enter Text 2
                </h3>
              </div>
              <input
                type="text"
                className="full-width-input"
                placeholder="Enter text here"
                value={text2}
                onChange={handleText2Change}
              />
            </div>

            <div className="divs-tableexpress" style={{ display: "block" }}>
              <div
                style={{
                  textAlign: "left", // Parent container aligns content to the left
                }}
              >
                <h3
                  className="simpletable-heading"
                  style={{
                    textAlign: "left", // Align heading to top-left
                    padding: "10px 15px", // Space inside the border
                    fontSize: "20px", // Font size
                    color: "#5F6F65", // Text color
                    fontWeight: "bold", // Bold text
                    border: "1px solid #5F6F65", // Elegant border
                    borderRadius: "10px", // Smooth rounded corners
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                    display: "inline-block", // Wraps text tightly
                    backgroundColor: "#ffffff", // Optional: White background for better contrast
                  }}
                >
                  Text Line#2 Font?
                </h3>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#5F6F65", // Optional: Adjust color if needed
                    marginTop: "10px",
                  }}
                >
                  Please Select Text 2 Font
                </h3>
              </div>
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

            <div className="divs-tableexpress" style={{ display: "block" }}>
              <div
                style={{
                  textAlign: "left", // Parent container aligns content to the left
                }}
              >
                <h3
                  className="simpletable-heading"
                  style={{
                    textAlign: "left", // Align heading to top-left
                    padding: "10px 15px", // Space inside the border
                    fontSize: "20px", // Font size
                    color: "#5F6F65", // Text color
                    fontWeight: "bold", // Bold text
                    border: "1px solid #5F6F65", // Elegant border
                    borderRadius: "10px", // Smooth rounded corners
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                    display: "inline-block", // Wraps text tightly
                    backgroundColor: "#ffffff", // Optional: White background for better contrast
                  }}
                >
                  Text Line#2 Size?
                </h3>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#5F6F65", // Optional: Adjust color if needed
                    marginTop: "10px",
                  }}
                >
                  Please choose font size for Text 2
                </h3>
              </div>
              <Slider
                min={10}
                max={100}
                value={fontSize1}
                onChange={handleSliderChange1}
                tooltipVisible
                className="custom-slider"
              />
            </div>

            <div className="divs-tableexpress" style={{ display: "block" }}>
              <div
                style={{
                  textAlign: "left", // Parent container aligns content to the left
                }}
              >
                <h3
                  className="simpletable-heading"
                  style={{
                    textAlign: "left", // Align heading to top-left
                    padding: "10px 15px", // Space inside the border
                    fontSize: "20px", // Font size
                    color: "#5F6F65", // Text color
                    fontWeight: "bold", // Bold text
                    border: "1px solid #5F6F65", // Elegant border
                    borderRadius: "10px", // Smooth rounded corners
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                    display: "inline-block", // Wraps text tightly
                    backgroundColor: "#ffffff", // Optional: White background for better contrast
                  }}
                >
                  Background Color?
                </h3>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#5F6F65", // Optional: Adjust color if needed
                    marginTop: "10px",
                  }}
                >
                  Please Select Background color
                </h3>
              </div>
              <SketchPicker
                color={color}
                onChangeComplete={handleChangeComplete}
                disableAlpha // Optional: Disable alpha (transparency) slider
              />
            </div>
            <div>
              <div className="divs-tableexpress" style={{ display: "block" }}>
                <div
                  style={{
                    textAlign: "left", // Parent container aligns content to the left
                  }}
                >
                  <h3
                    className="simpletable-heading"
                    style={{
                      textAlign: "left", // Align heading to top-left
                      padding: "10px 15px", // Space inside the border
                      fontSize: "20px", // Font size
                      color: "#5F6F65", // Text color
                      fontWeight: "bold", // Bold text
                      border: "1px solid #5F6F65", // Elegant border
                      borderRadius: "10px", // Smooth rounded corners
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                      display: "inline-block", // Wraps text tightly
                      backgroundColor: "#ffffff", // Optional: White background for better contrast
                    }}
                  >
                    Border?
                  </h3>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "#5F6F65", // Optional: Adjust color if needed
                      marginTop: "10px",
                    }}
                  >
                    Please Choose Border from following:
                  </h3>
                </div>
                <div className="card-container">
                  {cardData.map((card) => (
                    <div key={card.id} className="card-container">
                      <Card
                        bordered={false}
                        onClick={() => {
                          setSelectedCard(card.id); // Update state with selected card's ID
                        }}
                        style={{
                          width: "11rem",
                          height: "12rem",
                          background:
                            selectedCard === card.id ? "#FFD700" : "#FAF4EB", // Highlight selected card
                          textAlign: "center",
                          boxShadow:
                            selectedCard === card.id
                              ? "0 4px 8px rgba(0, 0, 0, 0.2)" // Add shadow for selected card
                              : "none",
                          transform:
                            selectedCard === card.id
                              ? "scale(1.05)"
                              : "scale(1)", // Slight zoom for selected card
                          transition: "all 0.3s ease", // Smooth transition
                          border:
                            selectedCard === card.id
                              ? "2px solid rgba(0, 0, 0, 0.2)" // Light border for selected card
                              : "1px solid transparent", // Transparent border for consistency
                        }}
                      >
                        <img
                          alt={card.title}
                          src={card.imgSrc}
                          className="image-card-express"
                          style={{ width: "100%", height: "auto" }}
                          onClick={() => handleImageClick(card.title)} // Trigger border change on image click
                        />
                        <p>{card.title}</p>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="divs-tableexpress" style={{ display: "block" }}>
              <div
                style={{
                  textAlign: "left", // Parent container aligns content to the left
                }}
              >
                <h3
                  className="simpletable-heading"
                  style={{
                    textAlign: "left", // Align heading to top-left
                    padding: "10px 15px", // Space inside the border
                    fontSize: "20px", // Font size
                    color: "#5F6F65", // Text color
                    fontWeight: "bold", // Bold text
                    border: "1px solid #5F6F65", // Elegant border
                    borderRadius: "10px", // Smooth rounded corners
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                    display: "inline-block", // Wraps text tightly
                    backgroundColor: "#ffffff", // Optional: White background for better contrast
                  }}
                >
                  Turnaround option?
                </h3>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#5F6F65", // Optional: Adjust color if needed
                    marginTop: "10px",
                  }}
                >
                  Please Choose Turnaround option from following:
                </h3>
              </div>
              <div className="card-container">
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
            <Form form={form} onFinish={onFinish} layout="vertical">
              <Form.Item name="wovenLabel" initialValue="Woven Text Labels">
                <div className="sticky-blue-1">
                  <p className="marg-bot">Woven Text Labels</p>
                  <div className="sticky-blue-inside">
                    <div
                      className="dynamic-label-text"
                      style={{
                        fontFamily: fontFamily,
                        backgroundColor: color, // Set the background color to the selected color for the entire div
                        padding: "10px", // Optional: Add padding for better spacing
                        borderRadius:
                          selectedBorder === "Rounded" ? "1rem" : "0", // Apply rounded or square border
                        border:
                          selectedBorder !== "None"
                            ? "2px solid black"
                            : "none", // Apply border if not "None"
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
              </Form.Item>
              <Form.Item name="size" initialValue={selectedData?.size}>
                <div className="sticky-blue">
                  <div className="sticky-blue-inside">
                    <p>Size:</p>
                    <p>{selectedData.size}</p>
                  </div>
                </div>
              </Form.Item>
              <Form.Item
                name="turnaroundOptions"
                initialValue={selectedData?.turnaroundOptions}
              >
                <div className="sticky-blue">
                  <div className="sticky-blue-inside">
                    <p>Turnaround Options:</p>
                    <p>{selectedData.turnaroundOptions}</p>
                  </div>
                </div>
              </Form.Item>
              <Form.Item>
                <div className="sticky-blue">
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      htmlType="submit"
                      onClick={() =>
                        handleAddToCart({
                          id: 1,
                          name: "Product 1",
                          price: 10.1,
                        })
                      }
                      className="button-tablecart"
                    >
                      <i
                        className="fa fa-cart-arrow-down"
                        aria-hidden="true"
                      ></i>{" "}
                      Get Pricing
                    </Button>
                  </div>
                </div>
              </Form.Item>
            </Form>
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

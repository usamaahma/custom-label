import React, { useState, useEffect, useRef } from "react";
import "./productdetail.css";
import { Helmet } from "react-helmet";
import {
  Button,
  Card,
  Breadcrumb,
  message,
  Steps,
  theme,
  notification,
  Row,
  Col,
} from "antd";
import LastTable1 from "../expressclothing/lasttable";
import { useCart } from "../../context/cartcontext";
import { IoMdCloudUpload } from "react-icons/io";
import { SiStyleshare } from "react-icons/si";
import { SiZedindustries } from "react-icons/si";
import { IoOptionsSharp } from "react-icons/io5";
import { MdProductionQuantityLimits } from "react-icons/md";
import { pendingcheckout, products, Seo } from "../../utils/axios";
import "../expressclothing/expressmain.css";
import { Storage } from "../../firebaseConfig";
import {
  uploadBytes,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import Faq1 from "../faq";
import GoogleReviews from "../expressclothing/googlereviews";
import Finalprocess from "../expressclothing/finalprocess";
import RelatedProduct from "../relatedProduct/relatedproduct";

// Card data

const imagesData = [
  { src: "../images/center1.png", text: "Fastest 3-Day Turnaround" },
  { src: "../images/center2.png", text: "Custom Woven Labels Made in USA" },
  { src: "../images/center3.png", text: "Straight Cut / Sew-on Only" },
  { src: "../images/center4.png", text: "Manufactured in New York" },
  { src: "../images/center5.png", text: "Custom Size & Style" },
  { src: "../images/center6.png", text: "Free Artwork Assistance" },
];

function ProductDetail() {
  const { addToCart } = useCart(); // Cart functions aur state access karein
  const [productDescription, setProductDescription] = useState(null);
  const [descriptionTitle, setDescriptionTitle] = useState(null);
  const [descriptionText, setDescriptionText] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [styles, setStyles] = useState([]);
  const [options, setOptions] = useState([]);
  const [allQuantityPrices, setAllQuantityPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [image, setImage] = useState(null);
  const [percent, setPercent] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState([]);
  const [sendByEmail, setSendByEmail] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null); // Track selected card
  const fileInputRef = useRef(null); // Reference to the hidden input
  const stepsRef = useRef(null); // Ref for scrolling to steps
  const orderProcessRef = useRef(null);
  const date = new Date();
  const [seoData, setSeoData] = useState(null);

  const handleFileClick = () => {
    fileInputRef.current.click(); // Trigger the hidden file input click
  };

  const showTime =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  const handlesubmit = (e) => {
    const uploadedFile = e.target.files[0]; // Get the uploaded file
    if (uploadedFile) {
      const showTime = Date.now(); // Generate a timestamp to make the filename unique
      const imageDocument = ref(
        Storage,
        `images/${uploadedFile.name + showTime}`
      );
      const uploadTask = uploadBytesResumable(imageDocument, uploadedFile);

      uploadTask.on("state_changed", (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercent(percent);
      });

      uploadBytes(imageDocument, uploadedFile)
        .then(() => {
          getDownloadURL(imageDocument)
            .then((Url) => {
              setUrl(Url); // Set the uploaded image URL
              console.log(Url);
            })
            .catch((error) => {
              console.log(error.message, "error getting the image url");
            });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  // Define the onRowClick handler to handle the selected row data
  const handleRowClick = (rowData) => {
    setSelectedRow(rowData); // Save the clicked row data
  };
  const handleNext = (e) => {
    e.preventDefault(); // Prevent default behavior

    // Move to the next step
    setCurrent((prev) => Math.min(prev + 1, steps.length - 1));

    // Scroll to the "Order Process" section
    if (orderProcessRef.current) {
      orderProcessRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start", // Align the section to the start of the viewport
      });
    }
  };

  const handlePrev = () => {
    // Move to the previous step
    setCurrent((prev) => Math.max(prev - 1, 0));

    // Scroll to the "Order Process" section again
    if (orderProcessRef.current) {
      orderProcessRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start", // Align the section to the start of the viewport
      });
    }
  };

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
  const handlePending = async (selectedData) => {
    const userdataString = localStorage.getItem("user");
    const userdata = JSON.parse(userdataString); // Convert string to object
    // Check if the user is logged in
    if (!userdata) {
      notification.error({
        message: "Login Required",
        description: "Please log in or sign up to add items to the cart.",
      });
      return; // Stop further execution if the user is not logged in
    }
    // Check if the selectedData contains valid product information
    if (!selectedData || !selectedData.id || !selectedData.name) {
      notification.error({
        message: "Product Selection Required",
        description:
          "Please select a product or complete the order process before adding to cart.",
      });
      return; // Stop further execution if no product is selected
    }

    const data = {
      user: [
        {
          userId: userdata.id,
          name: userdata.name,
          email: userdata.email,
          phonenumber: userdata.phonenumber,
        },
      ],
      pendingCheckout: [
        {
          productName: selectedData.name, // Replace with actual product data
          artwork: url,
          options: options.map((option) => ({
            title: option.type || "",
          })),
          size: selectedData.size, // Replace with actual size
          style: selectedData.style, // Replace with actual style
          quantityPrice: [
            {
              price:
                parseFloat(selectedRow.unitPrice.replace(/[^0-9.]/g, "")) || 0,
              //
              quantity: isNaN(parseInt(selectedRow.quantity))
                ? null
                : parseInt(selectedRow.quantity),
            },
          ],
          comments: selectedData.comments, // Replace with actual comments
        },
      ],
    };

    try {
      const response = await pendingcheckout.post("/", data);
      console.log("goingdata", response.data);
      message.success("Go To Cart");
    } catch (error) {
      console.error(
        "Error in pending checkout:",
        error.response || error.message
      );
    }
  };
  const handleAddToCart = (selectedData) => {
    console.log(selectedData, "data that is selected");
    // Check if the user is logged in
    const userdataString = localStorage.getItem("user");
    const userdata = JSON.parse(userdataString);

    if (!userdata) {
      notification.error({
        message: "Login Required",
        description: "Please log in or sign up to add items to the cart.",
      });
      return; // Stop further execution if the user is not logged in
    }

    // Function to filter empty or undefined fields
    const filterEmptyFields = (data) => {
      const filteredData = {};
      for (let key in data) {
        filteredData[key] =
          data[key] !== undefined && data[key] !== null ? data[key] : "";
      }
      return filteredData;
    };

    const filteredData = filterEmptyFields({
      artwork: url,
      comments: selectedData.comments || "",
      id: selectedData.id,
      name: selectedData.name,
      options: options.map((option) => ({
        title: option.type || "",
        cardTitle: option.cards ? option.cards[0]?.title || "" : "", // Direct cardTitle from nested cards
      })),
      price: parseFloat(selectedRow.unitPrice.replace(/[^0-9.]/g, "")) || 0,
      quantity: isNaN(parseInt(selectedRow.quantity))
        ? null
        : parseInt(selectedRow.quantity),
      size: selectedData.size || "",
      style: selectedData.style || "",
      totalPrice: parseFloat(selectedRow.total.replace(/[^0-9.]/g, "")) || 0,
    });

    addToCart(filteredData); // Product ko cart mein add karen
    console.log("Product added to cart:", filteredData);
    console.log(addToCart);
  };
  const handleStyleClick = (type, style) => {
    if (!style) {
      console.error("Style is undefined in handleStyleClick");
    } else {
      console.log("Style received in handleStyleClick:", style);
    }

    if (type === "style") {
      setSelectedStyle(style); // Set the selected style in state
    }
  };
  const handleSizeClick = (type, size) => {
    if (type === "size") {
      setAllQuantityPrices(size.quantityPrice); // Set the quantityPrice of the clicked size
    }
  };

  // Function to handle card clicks
  const handleCardClick = (key, value, id) => {
    // Update the selected data
    setSelectedData((prevData) => ({
      ...prevData,
      [key]: value,
    }));

    // Set selected card ID
    setSelectedCard(id);

    // Update the current step only till 'Size'
    if (key === "style" || key === "size") {
      setCurrent((prevCurrent) => prevCurrent + 1);
    } else if (key === "comments") {
      console.log("Comment saved:", value); // Optional: Handle comments separately
    }
  };
  const handleCardOptionClick = (key, value) => {
    setSelectedData((prevData) => ({
      ...prevData,
      [key]: value, // Replace the previous value with the new one
    }));
  };
  const [productImages, setProductImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  // State to track mouse position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);

  const steps = [
    {
      title: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: "rgb(250, 244, 235)",
            border: "5px solid rgb(95, 111, 101)",
            textAlign: "center",
            margin: "auto",
          }}
        >
          <IoMdCloudUpload
            style={{ fontSize: "28px", color: "rgb(95, 111, 101)" }}
          />
          <span style={{ fontSize: "12px" }}>Upload</span>
        </div>
      ),
      content: (
        <>
          <div
            className="divs-tableexpress"
            style={{
              padding: "20px",
              display: "block", // Ensures vertical stacking
            }}
          >
            {/* Heading */}
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
                Upload Artwork
              </h3>
            </div>

            {/* Content */}
            <Row gutter={16} justify="center" style={{ marginTop: "20px" }}>
              {/* First row: Uploaded image preview (Full width) */}
              {/* <Col xs={24} sm={24} md={24} lg={24}>
                {url ? (
                  <Card
                    hoverable
                    style={{
                      width: "100%",
                      textAlign: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <img
                      src={url}
                      alt="Uploaded Artwork"
                      style={{
                        width: "20%",
                        height: "auto",
                        borderRadius: "5px", // Rounded corners for the image
                      }}
                    />
                  </Card>
                ) : (
                  <p>No image uploaded yet</p>
                )}
              </Col> */}

              {/* Second row: File input (Centered) */}
              <Col xs={24} sm={24} md={24} lg={24}>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handlesubmit}
                />

                {/* Clickable custom image */}
                <img
                  src={
                    url || "../../images/uploadform.png" // Placeholder image
                  }
                  alt="Upload"
                  style={{
                    width: "auto",
                    height: "auto",
                    border: "2px  #ddd",
                    borderRadius: "8px",
                    cursor: "pointer",
                    objectFit: "cover",
                  }}
                  onClick={handleFileClick} // Open file picker
                />

                <p>Upload Progress: {percent}%</p>
              </Col>

              {/* Third row: Text message (Centered) */}
              <Col xs={24} sm={24} md={24} lg={24}>
                <div
                  style={{
                    marginTop: "10px",
                  }}
                >
                  <input
                    type="checkbox"
                    id="sendByEmail"
                    checked={sendByEmail}
                    onChange={(e) => setSendByEmail(e.target.checked)}
                  />
                  <label
                    htmlFor="sendByEmail"
                    style={{
                      marginLeft: "8px",
                      fontSize: "16px",
                      color: "#333",
                    }}
                  >
                    I will send other artwork files through email
                  </label>
                  <button
                    onClick={handleNext}
                    style={{
                      background: "none",
                      border: "1px solid #5F6F65",
                      borderRadius: "0.5rem",
                      padding: "4px",
                      display: "flex",
                      float: "right",
                      color: "blue",
                    }}
                  >
                    ✓ Skip
                  </button>
                </div>

                {sendByEmail && (
                  <p
                    style={{
                      marginTop: "5px",
                      fontSize: "14px",
                      color: "#5F6F65",
                    }}
                  >
                    Email additional files to:{" "}
                    <a href="mailto:sales@theclothinglabels.com">
                      <strong>sales@theclothinglabels.com</strong>
                    </a>{" "}
                  </p>
                )}
              </Col>
            </Row>
          </div>
        </>
      ),
    },

    {
      title: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: "rgb(250, 244, 235)",
            border: "5px solid rgb(95, 111, 101)",
            textAlign: "center",
            margin: "auto",
          }}
        >
          <SiStyleshare
            style={{ fontSize: "28px", color: "rgb(95, 111, 101)" }}
          />
          <span style={{ fontSize: "12px" }}>Style</span>
        </div>
      ),
      content: (
        <>
          <div
            className="divs-tableexpress"
            style={{ padding: "20px", display: "block" }}
          >
            {/* Heading */}
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
                Style?
              </h3>
            </div>

            {/* Content */}
            <Col xs={24} sm={24} md={24} lg={24}>
              {/* First Row: Text (Centered) */}
              <Row justify="center" style={{ marginBottom: "20px" }}>
                <Col>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "#5F6F65", // Optional: Adjust color if needed
                      marginTop: "10px",
                    }}
                  >
                    Please choose the style from the following
                  </h3>
                </Col>
              </Row>

              {/* Second Row: Style Images (Centered) */}
              <Row justify="center" gutter={[16, 16]}>
                {styles && styles.length > 0 ? (
                  styles.map((style, index) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={style._id}>
                      <Card
                        bordered={false}
                        style={{
                          background:
                            selectedCard === style._id ? "#FFD700" : "#FAF4EB", // Highlight selected card
                          textAlign: "center",
                          boxShadow:
                            selectedCard === style._id
                              ? "0 4px 8px rgba(0, 0, 0, 0.2)" // Add shadow for selected card
                              : "none",
                          transform:
                            selectedCard === style._id
                              ? "scale(1.05)"
                              : "scale(1)", // Slight zoom for selected card
                          transition: "all 0.3s ease", // Smooth transition
                          border:
                            selectedCard === style._id
                              ? "2px solid rgba(0, 0, 0, 0.2)" // Light border for selected card
                              : "none",
                        }}
                        onClick={() => {
                          setSelectedCard(style._id); // Highlight clicked card
                          handleStyleClick("style", style); // Pass style data
                          handleCardClick("style", style.name, style._id);
                        }}
                      >
                        <img
                          alt={style.name}
                          src={style.image || "../images/default-style.jpg"} // Default image if style has no image
                          style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "8px", // Optional: rounded corners for images
                          }}
                        />
                        <p>{style.name}</p>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <div style={{ textAlign: "center", margin: "20px 0" }}>
                    <h3 style={{ color: "#888" }}>No styles available</h3>
                  </div>
                )}
              </Row>
            </Col>
          </div>
        </>
      ),
    },
    {
      title: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: "rgb(250, 244, 235)",
            border: "5px solid rgb(95, 111, 101)",
            textAlign: "center",
            margin: "auto",
          }}
        >
          <SiZedindustries
            style={{ fontSize: "28px", color: "rgb(95, 111, 101)" }}
          />
          <span style={{ fontSize: "12px" }}>Size</span>
        </div>
      ),

      content: (
        <>
          <div
            className="divs-tableexpress"
            style={{ padding: "20px", display: "block" }}
          >
            {/* Main Column */}
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
            </div>
            <Col xs={24} sm={24} md={24} lg={24}>
              {/* First Row: Text (Centered) */}
              <Row justify="center" style={{ marginBottom: "20px" }}>
                <Col>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "#5F6F65", // Optional: Adjust color if needed
                      marginTop: "10px",
                    }}
                  >
                    Please choose the size from the following
                  </h3>
                </Col>
              </Row>

              {/* Second Row: Size Images (Centered) */}
              <Row justify="center" gutter={[16, 16]}>
                {selectedStyle &&
                selectedStyle.sizes &&
                selectedStyle.sizes.length > 0 ? (
                  selectedStyle.sizes.map((size, index) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={size._id}>
                      <Card
                        bordered={false}
                        style={{
                          background:
                            selectedCard === size._id ? "#FFD700" : "#FAF4EB", // Highlight selected card
                          textAlign: "center",
                          boxShadow:
                            selectedCard === size._id
                              ? "0 4px 8px rgba(0, 0, 0, 0.2)" // Add shadow for selected card
                              : "none",
                          transform:
                            selectedCard === size._id
                              ? "scale(1.05)"
                              : "scale(1)", // Slight zoom for selected card
                          transition: "all 0.3s ease", // Smooth transition
                          border:
                            selectedCard === size._id
                              ? "2px solid rgba(0, 0, 0, 0.2)" // Light border for selected card
                              : "none",
                        }}
                        onClick={() => {
                          handleSizeClick("size", size); // Pass only the sizes array
                          handleCardClick("size", size.name, size._id);
                        }}
                      >
                        <img
                          alt={size.name}
                          src={size.image || "../images/default.jpg"} // Fallback image if no image is provided
                          style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "8px", // Optional: rounded corners for images
                          }}
                        />
                        <p>{size.name}</p>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <div style={{ textAlign: "center", margin: "20px 0" }}>
                    <h3 style={{ color: "#888" }}>
                      No sizes found. Please select a style.
                    </h3>
                  </div>
                )}
              </Row>
            </Col>
          </div>
        </>
      ),
    },
    {
      title: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: "rgb(250, 244, 235)",
            border: "5px solid rgb(95, 111, 101)",
            textAlign: "center",
            margin: "auto",
          }}
        >
          <IoOptionsSharp
            style={{ fontSize: "22px", color: "rgb(95, 111, 101)" }}
          />
          <span style={{ fontSize: "12px" }}>Other Options?</span>
        </div>
      ),
      content: (
        <>
          {options.map((option, index) => (
            <div className="divs-tableexpress" key={index}>
              <div
                style={{
                  padding: "20px",
                  display: "block",
                }}
              >
                <div
                  style={{
                    textAlign: "left", // Align container to the left
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
                    {option.type}
                  </h3>
                </div>

                {/* Instructions */}
                <Row justify="center" style={{ marginBottom: "20px" }}>
                  <Col>
                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "#5F6F65", // Adjust color if needed
                        marginTop: "10px",
                      }}
                    >
                      Please choose {option.type} from the following
                    </h3>
                  </Col>
                </Row>

                {/* Cards */}
                <Row justify="center" gutter={[16, 16]}>
                  {option.cards.map((card, cardIndex) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={cardIndex}>
                      <Card
                        bordered={false}
                        onClick={() =>
                          handleCardClick(option.type, card.title, card._id)
                        }
                        style={{
                          background:
                            selectedCard === card._id ? "#FFD700" : "#FAF4EB", // Highlight selected card
                          textAlign: "center",
                          boxShadow:
                            selectedCard === card._id
                              ? "0 4px 8px rgba(0, 0, 0, 0.2)" // Add shadow for selected card
                              : "none",
                          transform:
                            selectedCard === card._id
                              ? "scale(1.05)"
                              : "scale(1)", // Slight zoom for selected card
                          transition: "all 0.3s ease", // Smooth transition
                          border:
                            selectedCard === card._id
                              ? "2px solid rgba(0, 0, 0, 0.2)" // Light border for selected card
                              : "none",
                        }}
                      >
                        <img
                          alt={card.title}
                          src={card.image}
                          style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "8px", // Rounded corners for images
                          }}
                        />
                        <p>{card.title}</p>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          ))}

          {/* Comments Section */}
          <div className="divs-tableexpress" style={{ display: "block" }}>
            <div
              style={{
                textAlign: "left", // Align to the left
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
                Comments?
              </h3>
            </div>
            <textarea
              rows={4} // Set the number of rows to 4
              style={{
                width: "100%", // Full width
                resize: "vertical", // Allow vertical resizing
                padding: "10px", // Padding for aesthetics
              }}
              onChange={(e) => handleCardClick("comments", e.target.value)} // Pass the value to handleCardClick
              placeholder="Enter your text here..."
            />
          </div>
        </>
      ),
    },

    {
      title: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: "rgb(250, 244, 235)",
            border: "5px solid rgb(95, 111, 101)",
            textAlign: "center",
            margin: "auto",
          }}
        >
          <MdProductionQuantityLimits
            style={{ fontSize: "28px", color: "rgb(95, 111, 101)" }}
          />
          <span style={{ fontSize: "12px" }}>Quantity</span>
        </div>
      ),
      content: (
        <>
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
                Quantity?
              </h3>
            </div>
            <LastTable1
              allQuantityPrices={allQuantityPrices}
              onRowClick={handleRowClick}
            />
          </div>
        </>
      ),
    },
  ];

  // The full text
  const fullText = descriptionText
    ? descriptionText
    : "No description available";

  // The truncated version of the text (first 100 characters, you can adjust as needed)
  const truncatedText = `${fullText.substring(0, 100)}`;

  // Toggle function to switch between expanded and collapsed states
  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMouseMove = (e) => {
    // Get the dimensions of the image container
    const { left, top, width, height } = e.target.getBoundingClientRect();
    // Calculate mouse position as a percentage of the image
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });

    // Set the transform origin based on mouse position
    e.target.style.transformOrigin = `${x}% ${y}%`;
    e.target.style.transform = "scale(1.5)"; // Reduced the zoom level to 1.5
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

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
    scrollToSteps();
  };
  const prev = () => {
    scrollToSteps();
    setCurrent(current - 1);
  };
  const scrollToSteps = () => {
    if (stepsRef.current) {
      stepsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start", // Align to the top of the viewport
      });
    }
  };
  const items = steps.map((item) => ({
    title: <span className="responsive-title">{item.title}</span>,
  }));

  const contentStyle = {
    textAlign: "center",
    color: token.colorTextTertiary,
    borderRadius: token.borderRadiusLG,
    marginTop: 16,
  };
  function decodeHtml(html) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = html;
    return textArea.value;
  }
  const selectedProductId = localStorage.getItem("selectedProductId");
  const title = localStorage.getItem("selectedProductTitle");
  const [selectedData, setSelectedData] = useState({
    id: selectedProductId,
    name: title,
    artwork: url,
    size: " ",
    style: " ",
    options: [], // Initialized as an empty array to hold multiple selected options
    quantity: " ",
    price: " ",
    totalPrice: " ",
    comments: " ",
  });
  useEffect(() => {
    const fetchProductDescription = async () => {
      try {
        // Ensure the ID is present in localStorage before making the API call
        if (selectedProductId) {
          const response = await products.get(`/${selectedProductId}`);
          console.log(response.data._doc);
          setProductImages(response.data._doc.descriptions[0].images);
          setSelectedImage(response.data._doc.descriptions[0].images[0]);
          setProductDescription(response.data._doc.descriptions[0]); // Set the product description in state
          setDescriptionText(response.data._doc.descriptions[0].text); // Set the product description in state
          setDescriptionTitle(
            response.data._doc.descriptions[0].descriptionTitle
          );
          setStyles(response.data._doc.descriptions[0].styles);
          const collectedQuantityPrices =
            response.data._doc.descriptions[0].styles.flatMap((style) =>
              style.sizes.flatMap((size) => size.quantityPrice)
            );

          // Set the collected data to state
          console.log(collectedQuantityPrices, "All Quantity Prices");
          setOptions(response.data._doc.descriptions[0].options);
          setDescription(response.data._doc.productDescription);
          console.log(
            response.data._doc.productDescription,
            "response.data.descriptions[0].productDescription"
          );
        } else {
          setError("Product ID not found");
        }
      } catch (error) {
        setError(error.message); // Handle error
      } finally {
        setLoading(false); // Set loading to false after API call
      }
    };

    if (selectedProductId) {
      fetchProductDescription();
    }
  }, [selectedProductId]);
  useEffect(() => {
    if (url) {
      setCurrent((prev) => prev + 1); // Move to the next step
    }
  }, [url, setCurrent]);
  function decodeHtml(html) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = html;
    return textArea.value;
  }
  useEffect(() => {
    // Fetch the SEO data using Axios from your API
    const fetchSeoData = async () => {
      try {
        const response = await Seo.get(`?productId=${selectedProductId}`);
        console.log(response);
        const seo = response.data.results[0]; // Assuming this is the structure
        setSeoData(seo);
      } catch (error) {
        console.error("Error fetching SEO data:", error);
      }
    };

    fetchSeoData();
  }, []);

  return (
    <div className="first-main-express">
      <div>
        {/* Only render Helmet once seoData is available */}
        {seoData && (
          <Helmet>
            <title>{seoData.title}</title>
            <meta name="description" content={seoData.description} />
            <meta name="keywords" content={seoData.keywords.join(", ")} />
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Blog", // Change to "Product" if it's a product page
                name: seoData.title,
                description: seoData.description,
                url: `https://www.mywebsite.com/products/${seoData.productId}`, // Dynamically use the product ID in URL
                image: "https://www.mywebsite.com/images/product-banner.jpg", // Use actual product image URL
              })}
            </script>
          </Helmet>
        )}

        {/* The rest of your component */}
      </div>
      <div className="headingbread">
        <p className="express-clothing-heading"> {title}</p>
        <Breadcrumb
          items={[
            {
              title: <a href="/">Home</a>,
            },
            {
              title: <a href="/all-clothing-labels">Clothing Labels</a>,
            },
            {
              title: title,
            },
          ]}
          className="breadcrumb"
        />
      </div>
      <div className="main-express">
        <div className="column-direction-express">
          <div className="inside-col-dire">
            {/* First Div */}
            <div className="first-div-width">
              <div
                style={{
                  margin: "0 auto",
                  borderRadius: "1rem",
                  width: "100%",
                  maxWidth: "30rem",
                  height: "100vh",
                  overflow: "hidden", // Prevents image from overflowing outside div
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
                    transition: "transform 0.3s ease",
                  }} // Add transition for smooth zoom effect
                />
                <div className="thumbnail-carousel">
                  {productImages.map((image, index) => (
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
              <h1>{descriptionTitle}</h1>
              <p style={{ width: "70%", margin: "0 auto" }}>
                {isExpanded ? fullText : truncatedText}
                <button onClick={toggleText} className="readmore-button">
                  {isExpanded ? "Read Less" : "Read More.."}
                </button>
              </p>
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

          <div className="txtmain" ref={orderProcessRef}>
            <p className="how">Order Process</p>
            <p className="at" style={{ width: "70%", margin: "0 auto" }}>
              We provide a free digital proof and photo sample for approval
              before production, ensuring 100% satisfaction.
            </p>
          </div>
          <div style={{ marginTop: "2rem" }} className="stepss">
            <Steps
              style={{ marginBottom: "2rem" }}
              current={current}
              onChange={setCurrent}
              progressDot
              items={steps.map(({ title, icon }) => ({ title, icon }))} // Map steps to items
            />
            <div style={contentStyle}>{steps[current].content}</div>
            <div
              style={{
                marginTop: 24,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {current > 0 && current < steps.length - 1 && (
                <Button onClick={handleNext}>Next</Button>
              )}
              {/* {current === steps.length - 1 && (
                // <Button onClick={() => message.success("Processing complete!")}>
                //   Done
                // </Button>
              )} */}
              {current > 0 && (
                <Button
                  style={{
                    margin: "0 8px",
                  }}
                  onClick={handlePrev}
                >
                  Previous
                </Button>
              )}
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
              <p className="marg-bot"> {title}</p>
              <div className="sticky-blue-inside">
                <p>Artwork File:</p>
                <div>
                  {url ? (
                    <img src={url} alt="Uploaded" style={{ width: "5rem" }} />
                  ) : (
                    <p>No image uploaded.</p>
                  )}
                </div>
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
            {options.map((option, index) => (
              <div className="sticky-blue" key={index}>
                <div className="sticky-blue-inside">
                  <p>{option.type}:</p>
                  {/* Display the selected title */}
                  <p>{selectedData[option.type] || "None selected"}</p>
                </div>
              </div>
            ))}
            <div className="sticky-blue">
              <div className="sticky-blue-inside">
                {selectedRow && (
                  <div style={{ display: "flex", gap: "3rem" }}>
                    <p> {selectedRow.quantity}</p>
                    <p> {selectedRow.unitPrice}</p>
                    <p> {selectedRow.total}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="sticky-blue">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  onClick={() => {
                    handleAddToCart(selectedData); // First function
                    handlePending(selectedData); // Second function
                    window.location.reload();
                  }}
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
      <div className="desc-express-main">
        <h1>
          Build Long-Lasting Brand Recognition with Fully Customizable Cannabis
          Box Packaging
        </h1>
        <p className="text-desc-express">
          Nearly 75% of American consumers say their purchases are influenced by
          the product's packaging box. Amid the fierce competition among brands,
          here’s how Refine Packaging's customized cannabis packaging products
          can help you stand out from the crowd with unforgettable packaging.
        </p>
        <div className="description-all-content">
          {description.map((desc, index) => (
            <Row key={index} gutter={[24, 24]}>
              {" "}
              {/* Increased gutter value */}
              <Col xs={24} sm={24} md={24} lg={24}>
                <div className="description-card-container">
                  {" "}
                  {/* Applied the description-card-container class */}
                  {/* Inner Row with 2 Columns */}
                  <Row gutter={[16, 16]}>
                    {/* Text Column (70%) */}
                    <Col xs={24} sm={24} md={16} lg={16}>
                      <h2 className="description-title">{desc.title}</h2>{" "}
                      {/* Applied the description-title class */}
                      <p
                        dangerouslySetInnerHTML={{
                          __html: decodeHtml(desc.descriptions),
                        }}
                        className="description-description"
                      />{" "}
                      {/* Applied the description-description class */}
                    </Col>

                    {/* Image Column (30%) */}
                    <Col
                      xs={24}
                      sm={24}
                      md={8}
                      lg={8}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={desc.image || "../images/default.jpg"} // Fallback image
                        alt="description image"
                        className="description-image" // Applied the description-image class
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                        }} // Ensures the image stays centered and well-sized
                      />
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          ))}
        </div>
      </div>
      <RelatedProduct />
      <Finalprocess />
      <Faq1 />
      <GoogleReviews />
    </div>
  );
}

export default ProductDetail;

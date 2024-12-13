import React, { useState, useEffect } from "react";
import { Button, Card, Breadcrumb, message, Steps, theme } from "antd";
import LastTable1 from "../expressclothing/lasttable";
import { useCart } from "../../context/cartcontext";
import ImageUploader from "../expressclothing/imagedragger";
import { pendingcheckout, products } from "../../utils/axios";
import "../expressclothing/expressmain.css";
import { Storage } from "../../firebaseConfig";
import {
  uploadBytes,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

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
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const date = new Date();

  const showTime =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  const handlesubmit = (e) => {
    const uploadedFile = e.target.files[0]; // Get the uploaded file
    if (uploadedFile) {
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
              setUrl(Url);
              setUploadedImageUrl(Url); // Set the uploaded image URL
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
      const response = await pendingcheckout.post("/", data); // Replace with your actual API endpoint
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
  const handleCardClick = (key, value) => {
    setSelectedData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
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
      title: "Upload Artwork",
      content: (
        <>
          <div className="size-txt">
            <h3 className="simpletable-heading">Upload Artwork</h3>
          </div>
          <div className="divs-tableexpress">
            {/* <ImageUploader /> */}
            <input type="file" onChange={handlesubmit} />
            <img
              src={url}
              alt="image"
              style={{ width: "5rem", height: "5rem" }}
            />
          </div>
        </>
      ),
    },
    {
      title: "Style",
      content: (
        <>
          <div className="size-txt">
            <h3 className="simpletable-heading">Style?</h3>
          </div>
          <div className="divs-tableexpress">
            {styles.map((style, index) => (
              <Card
                key={style._id}
                bordered={false}
                style={{
                  background: "#FAF4EB", // Customize background color if needed
                  marginBottom: "20px", // Add some margin between cards
                }}
                onClick={() => {
                  handleStyleClick("style", style); // Pass only the sizes array
                  handleCardClick("style", style.name);
                }}
              >
                <img
                  alt={style.name}
                  src={style.image || "../images/default-style.jpg"} // Default image if style has no image
                  className="image-card-express"
                />
                <p>
                  {style.name} <br />
                </p>
              </Card>
            ))}
          </div>
        </>
      ),
    },
    {
      title: "Size",
      content: (
        <>
          <div className="size-txt">
            <h3 className="simpletable-heading">Size?</h3>
          </div>
          <div className="divs-tableexpress">
            <div className="card-grid">
              {selectedStyle &&
                selectedStyle.sizes && // Make sure selectedStyle and sizes exist
                selectedStyle.sizes.map((size, index) => {
                  return (
                    <Card
                      key={size._id}
                      bordered={false}
                      style={{
                        background: "#FAF4EB",
                        marginBottom: "20px",
                      }}
                      onClick={() => {
                        handleSizeClick("size", size); // Pass only the sizes array
                        handleCardClick("size", size.name);
                      }}
                    >
                      <img
                        alt={size.name}
                        src={size.image || "../images/default.jpg"} // Fallback image if no image is provided
                        className="image-card-express"
                      />
                      <p>{size.name}</p>
                    </Card>
                  );
                })}
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Other Options?",
      content: (
        <>
          <div className="size-txt">
            <h3 className="simpletable-heading">Other Options?</h3>
          </div>
          {options.map((option, index) => (
            <div className="divs-tableexpress" key={index}>
              <div className="card-grid">
                <h3>{option.type}</h3> {/* Display the type of option */}
                {option.cards.map((card, cardIndex) => (
                  <div key={cardIndex} className="card-container">
                    <Card
                      bordered={false}
                      onClick={() => handleCardClick(option.type, card.title)} // Pass option type and card title
                      style={{
                        background: "#FAF4EB",
                      }}
                    >
                      <img
                        alt={card.title}
                        src={card.image}
                        className="image-card-express"
                      />
                      <p>{card.title}</p>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
              onChange={(e) => handleCardClick("comments", e.target.value)} // Pass the value to handleCardClick
              placeholder="Enter your text here..."
            />
          </div>
        </>
      ),
    },

    {
      title: "quantity ",
      content: (
        <>
          <div className="size-txt">
            <h3 className="simpletable-heading">Quantity?</h3>
          </div>
          <div className="divs-tableexpress">
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

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
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
    comments: "",
  });
  useEffect(() => {
    const fetchProductDescription = async () => {
      try {
        // Ensure the ID is present in localStorage before making the API call
        if (selectedProductId) {
          const response = await products.get(`/${selectedProductId}`);
          console.log(response.data.descriptions[0]);
          setProductImages(response.data.descriptions[0].images);
          setSelectedImage(response.data.descriptions[0].images[0]);
          setProductDescription(response.data.descriptions[0]); // Set the product description in state
          setDescriptionText(response.data.descriptions[0].text); // Set the product description in state
          setDescriptionTitle(response.data.descriptions[0].descriptionTitle);
          setStyles(response.data.descriptions[0].styles);
          const collectedQuantityPrices =
            response.data.descriptions[0].styles.flatMap((style) =>
              style.sizes.flatMap((size) => size.quantityPrice)
            );

          // Set the collected data to state
          setAllQuantityPrices(collectedQuantityPrices);
          console.log(collectedQuantityPrices, "All Quantity Prices");
          setOptions(response.data.descriptions[0].options);
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

  return (
    <div className="first-main-express">
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
                  border: "solid 1px #5f6f65",
                  width: "100%",
                  maxWidth: "30rem",
                  height: "100vh",
                }}
              >
                <img
                  alt="Express Clothing Labels"
                  src={selectedImage}
                  className="img-fluid main-image"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{ borderRadius: "1rem" }}
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
              <h2>{descriptionTitle}</h2>
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

          <div className="txtmain">
            <p className="how">Order Process</p>
            <p className="at" style={{ width: "70%", margin: "0 auto" }}>
              We provide a free digital proof and photo sample for approval
              before production, ensuring 100% satisfaction.
            </p>

            {/* <div className="image-row">
              <div className="image-item">
                <img
                  src="../../images/upload.png"
                  alt="Upload"
                  className="step-image-express"
                />
                <p className="image-text">Upload Artwork</p>
              </div>
              <div className="image-item">
                {" "}
                <img
                  src="../../images/arrow.svg"
                  alt="Arrow"
                  className="step-image1"
                />{" "}
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
                <img
                  src="../../images/arrow.svg"
                  alt="Approve"
                  className="step-image1"
                />
              </div>
              <div className="image-item">
                <img
                  src="../../images/receive.png"
                  alt="Approve"
                  className="step-image-express"
                />
                <p className="image-text">Receive Order</p>
              </div>
            </div> */}
          </div>
          <div style={{ marginTop: "2rem" }}>
            <Steps
              style={{ marginBottom: "2rem" }}
              current={current}
              items={items}
            />
            <div style={contentStyle}>{steps[current].content}</div>
            <div
              style={{
                marginTop: 24,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {current < steps.length - 1 && (
                <Button onClick={() => next()}>Next</Button>
              )}
              {current === steps.length - 1 && (
                <Button onClick={() => message.success("Processing complete!")}>
                  Done
                </Button>
              )}
              {current > 0 && (
                <Button
                  style={{
                    margin: "0 8px",
                  }}
                  onClick={() => prev()}
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
    </div>
  );
}

export default ProductDetail;

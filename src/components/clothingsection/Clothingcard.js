import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "antd"; // Import Ant Design's Row and Col components
import { products } from "../../utils/axios"; // Adjust the import path as necessary
import Beatquote from "./beatquote"; // Import your Beatquote component
import "./clothingcard.css"; // Import your CSS file
import { SearchOutlined } from "@ant-design/icons";

const Clothingcard = () => {
  const [cardsData, setCardsData] = useState([]); // Store fetched product data
  const [filteredData, setFilteredData] = useState([]); // Store filtered product data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [form] = Form.useForm();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await products.get("/");
        console.log(response);
        setCardsData(response.data.results); // Assuming data is an array in `results`
        form.resetFields(); // Reset the form after successful data fetch
      } catch (error) {
        setError(error.message); // Handle any errors
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };
    fetchData();
  }, []);

  // Function to store product ID and title in localStorage
  const StoreProductId = (id, title) => {
    localStorage.setItem("selectedProductId", id);
    localStorage.setItem("selectedProductTitle", title);
  };

  // Handle changes in the search input
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter products based on the search query
    if (query) {
      const filtered = cardsData.filter((card) =>
        card.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(cardsData); // Show all products if no search query
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Show loading state while fetching data
  }

  if (error) {
    return <p>Error: {error}</p>; // Show error message if there's an issue
  }

  return (
    <div>
      <Row className="responsive-row">
        <Col xs={24} md={15}>
          <div className="headingnsearch">
            <h2 className="main-heading">CUSTOM WOVEN LABELS</h2>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search for products, categories, or articles..."
                className="search-input"
                value={searchQuery} // Bind the input value to the searchQuery state
                onChange={handleSearchChange} // Handle input change
              />
              <button className="search-button">
                <SearchOutlined />
              </button>
            </div>
          </div>
          <h2 className="main-heading-products">All Products</h2>
          <Row
            className="row-clothingcards-width"
            justify="center"
            gutter={[16, 16]}
          >
            {filteredData.map((card) => (
              <Col key={card.id} xs={24} sm={12} md={12} lg={8}>
                <div
                  className="card"
                  onClick={() => {
                    StoreProductId(card._id, card.title); // Store product ID and title
                    window.location.href = `/product/${card.title}`; // Redirect to product page
                  }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="card-image"
                  />
                  <p className="card-text">{card.title}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
        <Col xs={24} md={8} className="right-column">
          <Beatquote />
        </Col>
      </Row>
    </div>
  );
};

export default Clothingcard;

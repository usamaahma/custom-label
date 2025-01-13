import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "antd"; // Import Ant Design's Row and Col components
import { products } from "../../utils/axios"; // Adjust the import path as necessary
import Beatquote from "./beatquote"; // Import your Beatquote component
import "./clothingcard.css"; // Import your CSS file
import { SearchOutlined } from "@ant-design/icons";
import CustomLoader from "./loader";

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
        const data = response.data.results || response.data; // Adjust as per actual API response
        setCardsData(data);
        setFilteredData(data);
        form.resetFields();
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
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
    const query = e.target.value.trim().toLowerCase();
    setSearchQuery(query);

    const deepSearch = (obj, searchTerm) => {
      // Recursive function to search within objects and arrays
      if (typeof obj === "string") {
        return obj.toLowerCase().includes(searchTerm); // Check if the full phrase is included
      } else if (typeof obj === "object" && obj !== null) {
        return Object.values(obj).some((value) =>
          deepSearch(value, searchTerm)
        );
      }
      return false;
    };

    if (query) {
      const searchTerms = query.split(" "); // Split query into words by spaces
      const filtered = cardsData.filter((card) => {
        // Check for either exact phrase or all words in the query
        return (
          deepSearch(card, query) ||
          searchTerms.every((term) => deepSearch(card, term))
        );
      });
      setFilteredData(filtered.length > 0 ? filtered : []);
    } else {
      setFilteredData(cardsData); // Show all products if no search query
    }
  };

  if (loading) {
    return <CustomLoader />; // Show loading state while fetching data
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
            {filteredData.length > 0 ? (
              filteredData.map((card) => (
                <Col key={card.id} xs={24} sm={12} md={12} lg={8}>
                  <div
                    className="card"
                    onClick={() => {
                      StoreProductId(card._id, card.title);
                      window.location.href = `/product/${card.title}`;
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
              ))
            ) : (
              <p>No products available</p>
            )}
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

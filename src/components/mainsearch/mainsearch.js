import { Col, Row } from "antd";
import React, { useState } from "react";
import Beatquote from "../clothingsection/beatquote";
import { SearchOutlined } from "@ant-design/icons";

function MainSearch() {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const handleSearchChange = (e) => {
    const query = e.target.value.trim().toLowerCase();
    setSearchQuery(query);

    // const deepSearch = (obj, searchTerm) => {
    //   // Recursive function to search within objects and arrays
    //   if (typeof obj === "string") {
    //     return obj.toLowerCase().includes(searchTerm); // Check if the full phrase is included
    //   } else if (typeof obj === "object" && obj !== null) {
    //     return Object.values(obj).some((value) =>
    //       deepSearch(value, searchTerm)
    //     );
    //   }
    //   return false;
    // };

    // if (query) {
    //   const searchTerms = query.split(" "); // Split query into words by spaces
    //   const filtered = cardsData.filter((card) => {
    //     // Check for either exact phrase or all words in the query
    //     return (
    //       deepSearch(card, query) ||
    //       searchTerms.every((term) => deepSearch(card, term))
    //     );
    // //   });
    //   setFilteredData(filtered.length > 0 ? filtered : []);
    // } else {
    //   setFilteredData(cardsData); // Show all products if no search query
    // }
  };

  return (
    <div>
      <Row className="responsive-row">
        <Col xs={24} md={15} style={{ marginTop: "3rem", textAlign: "center" }}>
          <h1>Search Results</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for products, Hangtags, or Blogs..."
              className="search-input"
              value={searchQuery} // Bind the input value to the searchQuery state
              onChange={handleSearchChange} // Handle input change
            />
            <button className="search-button">
              <SearchOutlined />
            </button>
          </div>
        </Col>
        <Col xs={24} md={8} className="right-column">
          <Beatquote />
        </Col>
      </Row>
    </div>
  );
}

export default MainSearch;

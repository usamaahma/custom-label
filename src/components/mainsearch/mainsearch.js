import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import Beatquote from "../clothingsection/beatquote";
import { ArrowUpOutlined, SearchOutlined } from "@ant-design/icons";
import { products, hangtag, blog } from "../../utils/axios"; // Adjust imports
import CustomLoader from "../clothingsection/loader";

function MainSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [productsData, setProductsData] = useState([]);
  const [hangtagsData, setHangtagsData] = useState([]);
  const [blogsData, setBlogsData] = useState([]);
  const [searchResults, setSearchResults] = useState({
    products: [],
    hangtags: [],
    blogs: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, hangtagsResponse, blogsResponse] =
          await Promise.all([
            products.get("/"), // API call for products
            hangtag.get("/"), // API call for hangtags
            blog.get("/"), // API call for blogs
          ]);
        setProductsData(productsResponse.data.results || productsResponse.data);
        setHangtagsData(hangtagsResponse.data.results || hangtagsResponse.data);
        setBlogsData(blogsResponse.data.results || blogsResponse.data);
      } catch (err) {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value.trim().toLowerCase(); // Clean and lowercase input
    setSearchQuery(query); // Update search query state

    const deepSearch = (obj, searchTerm) => {
      // Recursive function to search within objects and arrays
      if (typeof obj === "string") {
        return obj.toLowerCase().includes(searchTerm); // Match substring (case-insensitive)
      } else if (typeof obj === "object" && obj !== null) {
        return Object.values(obj).some((value) =>
          deepSearch(value, searchTerm)
        ); // Handle nested objects/arrays
      }
      return false;
    };

    const filterData = (data) => {
      const searchTerms = query.split(" "); // Split query into individual words
      return data.filter(
        (item) =>
          // Match for exact query or all split words
          deepSearch(item, query) ||
          searchTerms.every((term) => deepSearch(item, term))
      );
    };

    if (query) {
      const filteredProducts = filterData(productsData);
      const filteredHangtags = filterData(hangtagsData);
      const filteredBlogs = filterData(blogsData);

      setSearchResults({
        products: filteredProducts,
        hangtags: filteredHangtags,
        blogs: filteredBlogs,
      });
    } else {
      setSearchResults({
        products: [],
        hangtags: [],
        blogs: [],
      }); // Clear results if input is empty
    }
  };

  if (loading) {
    return <CustomLoader />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Collect all titles to pass as a prop to Beatquote
  const titles = [
    ...searchResults.products.map((product) => product.title),
    ...searchResults.hangtags.map((hangtag) => hangtag.title),
    ...searchResults.blogs.map((blog) => blog.title),
  ];
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

          <div style={{ marginTop: "2rem" }}>
            {searchResults.products.length > 0 && (
              <div>
                <h2>Clothing</h2>
                <Row gutter={[16, 16]} justify="center">
                  {searchResults.products.map((result, index) => (
                    <Col key={index} xs={24} sm={12} md={8} lg={6}>
                      <div
                        className="card"
                        onClick={() =>
                          (window.location.href = `/product/${result.title}`)
                        }
                      >
                        <img
                          src={result.image}
                          alt={result.title}
                          className="card-image"
                        />
                        <p className="card-text">{result.title}</p>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            )}

            {searchResults.hangtags.length > 0 && (
              <div>
                <h2>Hangtags</h2>
                <Row gutter={[16, 16]} justify="center">
                  {searchResults.hangtags.map((result, index) => (
                    <Col key={index} xs={24} sm={12} md={8} lg={8}>
                      <div
                        className="card"
                        onClick={() =>
                          (window.location.href = `/hangtag/${result.title}`)
                        }
                      >
                        <img
                          src={result.image}
                          alt={result.title}
                          className="card-image"
                        />
                        <p className="card-text">{result.title}</p>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            )}

            {searchResults.blogs.length > 0 && (
              <div>
                <h2>Blogs</h2>
                <Row gutter={[16, 16]} justify="center">
                  {searchResults.blogs.map((result, index) => (
                    <Col key={index} xs={24} sm={12} md={8} lg={6}>
                      <div
                        className="card"
                        onClick={() =>
                          (window.location.href = `/blog/${result.title}`)
                        }
                      >
                        <img
                          src={result.image}
                          alt={result.title}
                          className="card-image"
                        />
                        <p className="card-text">{result.title}</p>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            )}

            {searchResults.products.length === 0 &&
              searchResults.hangtags.length === 0 &&
              searchResults.blogs.length === 0 && (
                <div>
                  <ArrowUpOutlined />
                  <p>Search to find results</p>
                </div>
              )}
          </div>
        </Col>
        <Col xs={24} md={8} className="right-column">
          {/* Pass titles as a prop */}
          <Beatquote titles={titles} />
        </Col>
      </Row>
    </div>
  );
}

export default MainSearch;

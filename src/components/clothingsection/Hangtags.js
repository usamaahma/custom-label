import React, { useEffect, useState } from "react";
import { Row, Col, Form } from "antd"; // Import Ant Design's Row and Col components
import { hangtag } from "../../utils/axios"; // Adjust the import path as necessary
import Beatquote from "./beatquote"; // Import your Beatquote component
import "./clothingcard.css"; // Import your CSS file
import { SearchOutlined } from "@ant-design/icons";
import CustomLoader from "./loader";
import { Helmet } from "react-helmet"; // Import Helmet

const Hangtags = () => {
  const [cardsData, setCardsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Store filtered product data
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [loading, setLoading] = useState(true);
  const [titles, setTitles] = useState([]); // Store filtered product data
  const [error, setError] = useState(null);
  const [form] = Form.useForm();

  const card1 = [
    {
      id: 1,
      image: "../images/x-small.jpg",
      title: "Fancy Hangtags",
      link: "/fancy-hangtags",
    },
  ];

  const StoreProductId = (id, title) => {
    localStorage.setItem("selectedHangtagId", id);
    localStorage.setItem("selectedHangtagTitle", title);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await hangtag.get("/");
        const data = response.data.results || response.data; // Adjust as per actual API response
        setCardsData(response.data.results); // Assuming data is an array in `results`
        setFilteredData(data);
        setTitles(data.map((item) => item.title));
        form.resetFields();
        console.log(response.data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value.trim().toLowerCase();
    setSearchQuery(query);

    const deepSearch = (obj, searchTerm) => {
      if (typeof obj === "string") {
        return obj.toLowerCase().includes(searchTerm);
      } else if (typeof obj === "object" && obj !== null) {
        return Object.values(obj).some((value) => deepSearch(value, searchTerm));
      }
      return false;
    };

    if (query) {
      const searchTerms = query.split(" ");
      const filtered = cardsData.filter((card) => {
        return (
          deepSearch(card, query) ||
          searchTerms.every((term) => deepSearch(card, term))
        );
      });
      setFilteredData(filtered.length > 0 ? filtered : []);
    } else {
      setFilteredData(cardsData);
    }
  };

  if (loading) {
    return <CustomLoader />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <Helmet>
        <title>Custom Hangtags - Quality and Affordable</title>
        <meta
          name="description"
          content="Discover our wide range of custom hangtags for your products. High quality, affordable, and designed to meet your branding needs."
        />
        <meta
          name="keywords"
          content="custom hangtags, product branding, hangtags, tags for clothing, custom tags"
        />
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Custom Hangtags",
            "description": "Discover our wide range of custom hangtags for your products. High quality, affordable, and designed to meet your branding needs.",
            "url": "https://www.mywebsite.com/hangtags",
            "image": "https://www.mywebsite.com/images/x-small.jpg"
          }`}
        </script>
      </Helmet>

      <Row className="responsive-row">
        <Col xs={24} md={15}>
          <div className="headingnsearch">
            <h1 className="main-heading">CUSTOM HANGTAGS</h1>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search for hangtags, categories, or articles..."
                className="search-input"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button className="search-button">
                <SearchOutlined />
              </button>
            </div>
          </div>
          <h2 className="main-heading-products">All Hangtags</h2>
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
                    StoreProductId(card.id, card.title);
                    window.location.href = `/hangtag/${card.title}`;
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
            {card1.map((card) => (
              <Col key={card.id} xs={24} sm={12} md={12} lg={8}>
                <a href={card.link} className="card">
                  <img
                    src={card.image}
                    alt={card.text}
                    className="card-image"
                  />
                  <p className="card-text">{card.title}</p>
                </a>
              </Col>
            ))}
          </Row>

          <div className="card-grid"></div>
        </Col>
        <Col xs={24} md={8} className="right-column">
          <Beatquote titles={titles} />
        </Col>
      </Row>
    </div>
  );
};

export default Hangtags;

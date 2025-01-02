import React, { useState, useEffect } from "react";
import { Breadcrumb, Row, Col } from "antd";
import { blog } from "../../utils/axios";
import "./blogdetail.css";

function Blogdetail1() {
  const [blogData, setBlogData] = useState(null); // State to store blog data
  const [descriptionData, setDescriptionData] = useState([]); // State to store blog data

  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State to store any error that occurs during fetch

  // Fetch data from the API on component mount
  const blogid = localStorage.getItem("selectedBlogId");
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await blog.get(`/${blogid}`); // Replace with your API URL
        setBlogData(response.data); // Assuming the response contains an array of blogs
        setDescriptionData(response.data.titledescriptions);
        console.log(response.data.titledescriptions);
        console.log(response.data);
      } catch (err) {
        setError("Failed to load blogs."); // Set error if request fails
      } finally {
        setLoading(false); // Set loading to false after the data is fetched or if an error occurs
      }
    };

    fetchBlogData(); // Call the fetch function
  }, []); // Empty dependency array ensures this only runs once when the component mounts

  if (loading) {
    return <p>Loading...</p>; // Display loading message while the data is being fetched
  }

  if (error) {
    return <p>{error}</p>; // Display error message if an error occurred
  }
  function decodeHtml(html) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = html;
    return textArea.value;
  }

  return (
    <div>
      <div className="breadcrumb-container">
        <Breadcrumb
          items={[
            {
              title: (
                <a href="/" className="breadcrumb-title">
                  Home
                </a>
              ),
            },
            {
              title: (
                <a href="/blogs" className="breadcrumb-title">
                  Blogs
                </a>
              ),
            },
            {
              title: (
                <a href="/food-packaging" className="breadcrumb-title">
                  Food Packaging
                </a>
              ),
            },
            {
              title: (
                <span className="breadcrumb-link">
                  10 Reasons To Love Custom Cereal Boxes
                </span>
              ),
            },
          ]}
        />
      </div>
      <div>
        <img
          className="img-cbdmain"
          src="../images/blog1.jfif"
          alt="cbd-main"
          style={{
            width: "100%",
            height: "auto",
            marginBottom: "0rem",
            marginTop: "2rem",
          }}
        />
        <h1 className="first-head">{blogData?.title}</h1>
        <div className="ten-container">
          {descriptionData.map((desc, index) => (
            <Row key={index} gutter={[24, 24]} style={{ marginBottom: "24px" }}>
              {/* Column for Title and Description */}
              <Col xs={24} sm={24} md={16} lg={16}>
                <h2 className="title-head">{desc.descriptionTitle}</h2>
                <p
                  dangerouslySetInnerHTML={{ __html: decodeHtml(desc.text) }}
                />
              </Col>

              {/* Column for Image, Centered */}
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
                {desc.image && (
                  <img
                    src={desc.image}
                    alt={desc.descriptionTitle}
                    style={{
                      maxWidth: "100%",
                      height: "15rem",
                      objectFit: "contain",
                      marginTop: "1rem",
                    }}
                  />
                )}
              </Col>
            </Row>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blogdetail1;

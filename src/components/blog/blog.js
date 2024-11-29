import React, { useEffect, useState } from "react";
import { Card, Row, Col, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import {blog} from "../../utils/axios" 
import "./blog.css";

const { Meta } = Card;

function Blog() {
  const [blogData, setBlogData] = useState([]); // State to store blog data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State to store any error that occurs during fetch

  // Fetch data from the API on component mount
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await blog.get("/"); // Replace with your API URL
        setBlogData(response.data); // Assuming the response contains an array of blogs
        console.log(response.data)
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
  const StoreBlogId = (id, title) => {
    localStorage.setItem("selectedBlogId", id);
    localStorage.setItem("selectedBlogTitle", title); 
  };
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
              title: <span className="breadcrumb-link">Blogs</span>,
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
            marginBottom: "2rem",
            marginTop: "2rem",
          }}
        />
        <div className="blog-container">
          <p className="blog-headi">Blogs</p>
          <Row gutter={[16, 16]} justify="center">
            {blogData.map((blog, index) => (
              <Col key={index} xs={24} sm={12} md={12} lg={12}>
                <Card className="blog-card" cover={<img className="blog-img" alt="example" src={blog.image} />}>
                  <div className="card-txt-blog" onClick={() => {
                    StoreBlogId(blog.id, blog.title);
                    window.location.href = `/blog/${blog.title}`;
                  }}>
                    <Meta
                      className="blog-cardtxt"
                      title={<Link to="/blogdetail" className="blog-links">{blog.title}</Link>}
                      description={blog.description}
                    />
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Blog;

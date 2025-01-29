import React, { useEffect, useState } from "react";
import { Card, Row, Col, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { blog } from "../../utils/axios";
import "./blog.css";
import CustomLoader from "../clothingsection/loader";
import { Helmet } from "react-helmet"; // Import Helmet

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
    return <CustomLoader />; // Display loading message while the data is being fetched
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
      <Helmet>
        <title>Our Blogs - Stay Updated with the Latest Posts</title>
        <meta
          name="description"
          content="Explore our blog to stay updated with the latest posts, trends, and insights on various topics."
        />
        <meta
          name="keywords"
          content="blogs, articles, latest posts, insights, news"
        />
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Our Blogs",
            "description": "Explore our blog to stay updated with the latest posts, trends, and insights on various topics.",
            "url": "https://www.mywebsite.com/blogs",
            "image": "https://www.mywebsite.com/images/blog-banner.jpg"
          }`}
        </script>
      </Helmet>

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
          <h1 className="blog-headi">Blogs</h1>
          <Row gutter={[16, 16]} justify="center">
            {blogData.map((blog, index) => (
              <Col key={index} xs={24} sm={12} md={12} lg={12}>
                <Card
                  className="blog-card"
                  cover={
                    <img className="blog-img" alt="example" src={blog.image} />
                  }
                >
                  <div
                    className="card-txt-blog"
                    onClick={() => {
                      StoreBlogId(blog.id, blog.title);
                      window.location.href = `/blog/${blog.title}`;
                    }}
                  >
                    <Meta
                      className="blog-cardtxt"
                      title={
                        <Link to="/blogdetail" className="blog-links">
                          {blog.title}
                        </Link>
                      }
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
  );
}

export default Blog;

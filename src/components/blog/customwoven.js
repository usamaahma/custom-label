import React from "react";
import { Card, Row, Col } from "antd";
import { RxHamburgerMenu } from "react-icons/rx";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import "./blog.css";

const { Meta } = Card;

const blogData = [
  {
    title: "How to Create Custom woven label That Sell?",
    description:
      "As the demand for custom woven incense labels continues to rise, it has become increasingly important for businesses to...",
    btitle: " custom woven",
    imgSrc: "../images/customblog.jfif",
  },
   
];

function Customblog() {
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
                  <span className="breadcrumb-link">
                    Food Packaging
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
          marginBottom: "2rem",
        }}
      />
      <div className="blog-container">
        <Row gutter={[16, 16]} justify="center">
          {blogData.map((blog, index) => (
            <Col key={index} xs={24} sm={12} md={12} lg={12}>
              <Card
                className="blog-card"
                cover={<img alt="example" src={blog.imgSrc} />}
              >
                <div className="card-txt-blog">
                  <Meta
                    className="blog-cardtxt"
                    title={<Link to="/blogdetail" className="blog-links">{blog.title}</Link>}
                    description={blog.description}
                  />
                  <div className="blog-icon">
                    <RxHamburgerMenu />
                    <Link to="/custom-blogs" className="blog-links">
                      <p className="blog-cardtxt1">{blog.btitle}</p>
                    </Link>
                  </div>
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

export default Customblog;

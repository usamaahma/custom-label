import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { newsletteremail, products, hangtag } from "../utils/axios";
import { Link } from "react-router-dom";
import "./footer.css";

function Footer1() {
  const [email, setEmail] = useState("");
  const [productsList, setProductsList] = useState([]);
  const [hangtagsList, setHangtagsList] = useState([]);
  const [form] = Form.useForm(); // Initialize the form instance here

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await products.get("/");
        setProductsList(response.data.results);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    const fetchHangtags = async () => {
      try {
        const response = await hangtag.get("/");
        setHangtagsList(response.data.results);
      } catch (error) {
        console.error("Error fetching hangtags:", error);
      }
    };
    fetchProducts();
    fetchHangtags();
  }, []);

  const onFinish = (values) => {
    console.log("Form Submitted with values:", values); // Log form values
    const data1 = {
      email: values.email,
    };
    newsletteremail({
      method: "post",
      data: data1,
    })
      .then((response) => {
        console.log("API Response:", response); // Log the entire response to inspect it
        form.resetFields(); // This will reset all form fields to their initial state

        if (
          response.data &&
          response.data.message === "Email already subscribed"
        ) {
          message.info("You already subscribed, thank you!");
        } else {
          message.success("You have successfully subscribed!");
        }
      })
      .catch((error) => {
        console.log("API Error:", error);
        if (error.response) {
          // Handle error based on server response status
          if (error.response.status === 400) {
            if (error.response.data.message === "Email already subscribed") {
              message.warning("You already subscribed, thank you!");
            } else {
              message.error("Something went wrong, please try again!");
            }
          } else {
            // Handle other error statuses
            message.error("Something went wrong, please try again!");
          }
        } else if (error.request) {
          // Handle network error
          console.log("No response received from the API");
          message.error("Network error, please try again later.");
        } else {
          // General error
          console.log("Error during request setup", error.message);
          message.error("Something went wrong, please try again!");
        }
      });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>All Clothing Labels</h3>
          <ul className="clothing-labels-main">
            {productsList.map((product) => (
              <li className="cl-label" key={product._id}>
                <Link to={`/product/${product.title}`}>{product.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-column">
          <h3>All HangTags</h3>
          <ul className="hangtag-main">
            {hangtagsList.map((hangtag) => (
              <li className="hang" key={hangtag._id}>
                <Link to={`/hangtag/${hangtag.title}`}>{hangtag.title}</Link>
              </li>
            ))}
          </ul>
          <h3>Resources</h3>
          <ul className="hangtag-main">
            <li className="hang">
              <Link to="/faqs">FAQ</Link>
            </li>
            <li className="hang">
              <Link to="/about-us">About Us</Link>
            </li>
            <li className="hang">
              <Link to="/contact-us">Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>My Account</h3>
          <p>Dashboard</p>
          <a href="tel:+1 (616) 888-7184" className="contact-link">
            +1 (616) 888-7184
          </a>{" "}
          <p>
            <Link
              to="/privacy-policy"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Privacy Policy
            </Link>
          </p>
          <h3>Contact Us</h3>
          <p>Monday-Friday</p>
          <p>9AM-5:30PM EST</p>
          <a href="tel:+1 (616) 888-7184" className="contact-link">
            +1 (616) 888-7184
          </a>
          <p>
            For inquiries, email us at:{" "}
            <a
              className="contact-link"
              href="mailto:sales@theclothinglabels.com"
            >
              sales@theclothinglabels.com
            </a>
          </p>
          <p>14943 E 9 Mile Rd Unit #191</p>
          <p>Eastpointe, MI 48021</p>
        </div>
        <div className="footer-column">
          <h3>Be The First To Know</h3>
          <p>
            Get all the latest information on events, sales, and offers. Sign up
            for our newsletter today.
          </p>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email!",
                },
              ]}
            >
              <Input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="footer-input"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="btn-signup"
                style={{ width: "100%" }}
              >
                Subscribe
              </Button>
            </Form.Item>
          </Form>
          <h3>We Accept</h3>
          <div className="footer-image">
            <img
              src="../../images/visacard.png"
              alt="Footer Logo"
              className="visaimg"
            />
          </div>
          <img
            src="../../images/highquality.png"
            alt="Footer Logo"
            className="highimg"
          />
        </div>
      </div>
      <div className="footer-bottom">
        <hr className="footer-line" />
        <p> © 2024 Custom Woven Labels, All Rights Reserved</p>
      </div>
    </footer>
  );
}
export default Footer1;

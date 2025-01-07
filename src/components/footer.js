import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { newsletteremail } from "../utils/axios";
import { Link } from "react-router-dom";
import "./footer.css";

function Footer1() {
  const [email, setEmail] = useState("");

  const onFinish = (values) => {
    console.log("Form Submitted with values:", values);  // This will show the form values
    
    const data1 = {
      email: values.email,
    };
  
    newsletteremail({
      method: "post",
      data: data1,
    })
      .then((response) => {
        console.log("API Response:", response);  // Log API response for debugging
  
        // Check for specific API response
        if (response.data.message === "Email already subscribed") {
          message.info("You already subscribed, thank you!");
        } else {
          message.success("You have successfully subscribed!");
        }
      })
      .catch((error) => {
        console.log("API Error:", error);  // Log any API error for debugging
        message.error("Something went wrong, please try again!");
      });
  };
  

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>Clothing Labels</h3>
          <ul className="clothing-labels-main">
            <li className="cl-label">
              <Link to="/all-clothing-labels">All Clothing Labels</Link>
            </li>
            <li className="cl-label">
              <Link to="/express-clothing">Express Clothing Labels</Link>
            </li>
            <li className="cl-label">
              <Link to="/customwoven">Custom Woven Labels</Link>
            </li>
            <li className="cl-label">
              <Link to="/woven-text-label">Woven Text Labels</Link>
            </li>
            <li className="cl-label">
              <Link to="/custom-care-label">Custom Care Labels</Link>
            </li>
            <li className="cl-label">
              <Link to="/custom-heat-labels">Custom Heat Transfer Labels</Link>
            </li>
            <li className="cl-label">
              <Link to="/custom-cotton-label">Custom Cotton Labels</Link>
            </li>
            <li className="cl-label">
              <Link to="/satin-woven">Custom Satin Woven Labels</Link>
            </li>
            <li className="cl-label">
              <Link to="/tpu-labels">Custom TPU Labels</Link>
            </li>
            <li className="cl-label">
              <Link to="/custom-tyvek-label">Custom Tyvek Labels</Link>
            </li>
            <li>
              <Link to="/screen-printed-label">Screen Printed Labels</Link>
            </li>
            <li className="cl-label">
              <Link to="/custom-sublimation-label">
                Custom Sublimation Labels
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Hang Tags</h3>
          <ul className="hangtag-main">
            <li className="hang">
              <Link to="/custom-hangtags">All Hang Tags</Link>
            </li>
            <li className="hang">
              <Link to="/simple-hangtags">Simple Hang Tags</Link>
            </li>
            <li className="hang">
              <Link to="/fancy-hangtags">Fancy Hang Tags</Link>
            </li>
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
          <a href="tel:+1 (630) 995-9797" className="contact-link">
            +1 (630) 995-9797
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
          <a href="tel:+1 (630) 995-9797" className="contact-link">
            +1 (630) 995-9797
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
          <p>1760 Glasco Turnpike</p>
          <p>Woodstock NY 12498</p>
        </div>

        <div className="footer-column">
          <h3>Be The First To Know</h3>
          <p>
            Get all the latest information on events, sales, and offers. Sign up
            for our newsletter today.
          </p>

          {/* Ant Design Form */}
          <Form layout="vertical" onFinish={onFinish}>
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
                style={{ width: "100%" }} // Full width for button
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

      {/* Bottom Text and Line */}
      <div className="footer-bottom">
        <hr className="footer-line" />
        <p>© 2024 Custom Woven Labels, All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer1;

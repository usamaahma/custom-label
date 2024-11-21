import React, { useState } from "react";
import { Row, Col, Form, Input, Button, Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./checkoutbelow.css";
import IconMessage from "./iconmessage";

const { Option } = Select;

function CheckoutBelow1() {
 
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownVisible1, setDropdownVisible1] = useState(false);
 
  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const toggleDropdown1 = () => {
    setDropdownVisible1(!dropdownVisible1);
  };
  const redirectToPayPal = () => {
    window.location.href = "https://www.paypal.com"; // Redirect to PayPal website
  };

  return (
    <div className="checkout-container">
      <div className="check-below">
        {/* <p className="check-txt">CHECKOUT BELOW</p> */}
      </div>
      <Row  flex justify={"space-evenly"}>
        {/* Column 1: Shipping Address */}
        <Col xs={24} sm={12} md={7} className="border-column">
          <div className="ship-address">
            <p className="shipping-txt">Billing Address</p>
          </div>
          <Form layout="vertical">
            <Form.Item
              label="Email Address"
              className="input-heading-email"
              rules={[{ required: true, message: "Please enter your email!" }]}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Input className="input-email" placeholder="Email" />
                <IconMessage />
              </div>
            </Form.Item>
            {[
              "First Name",
              "Last Name",
              "Street Address",
              "City",
              "Zip/Postal Code",
              "Phone Number",
            ].map((label) => (
              <Form.Item
                key={label}
                label={label}
                className="input-heading"
                rules={[
                  {
                    required: true,
                    message: `Please enter your ${label.toLowerCase()}!`,
                  },
                ]}
              >
                <Input
                  className="input"
                  placeholder={`Enter your ${label.toLowerCase()}`}
                />
              </Form.Item>
            ))}
            <Form.Item
              label="Country"
              className="input-heading"
              rules={[{ required: true, message: "Please select your country!" }]}
            >
              <Select placeholder="Select your country" required>
                <Option value="usa">United States</Option>
                <Option value="canada">Canada</Option>
                <Option value="uk">United Kingdom</Option>
                <Option value="australia">Australia</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="State/Province"
              className="input-heading"
              rules={[
                {
                  required: true,
                  message: "Please enter your state or province!",
                },
              ]}
            >
              <Select placeholder="Select your state/province" required>
                <Option value="california">California</Option>
                <Option value="ontario">Ontario</Option>
                <Option value="london">London</Option>
                <Option value="new-south-wales">New South Wales</Option>
              </Select>
            </Form.Item>
          </Form>
        </Col>

        {/* Column 2: Shipping and Payment Method */}
        <Col xs={24} sm={12} md={8} className="border-column">
          <div className="shipping-method">
            <div className="ship-address">
              <p className="shipping-txt">Shipping Method</p>
            </div>

            {/* Added Input for shipping message with space above */}
            <Form.Item
              label=""
              className="shipping-message-label"
              rules={[{ required: false }]} // Message is optional
              style={{ marginBottom: "20px" }} // Added space below the item
            >
              <div className="ship-method-input">
                <Input.TextArea
                  placeholder="Enter a message for shipping instructions"
                  rows={4}
                  className="shipping-message-input"
                  style={{ marginTop: "10px" }} // Optional: Adding a small margin between label and the text area
                />
              </div>
            </Form.Item>

            {/* Payment Method */}
            <div className="ship-address" style={{ marginTop: "20px" }}>
              <p className="shipping-txt">Payment Method</p>
            </div>

            {/* Proceed to Pay button */}
            <Button
              type="primary"
              style={{
                backgroundColor: "#808080", // Gray color for the button
                borderColor: "#808080",
                color: "#fff",
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                marginTop: "20px", // Space above the button
              }}
              onClick={redirectToPayPal}
            >
              Proceed to Pay
            </Button>
          </div>
        </Col>

        {/* Column 3: Order Summary */}
        <Col xs={24} sm={12} md={8}>
          <div className="summary-main">
            <p className="order-summary-txt">Order Summary</p>
            <p
              className="cart-txt"
              onClick={toggleDropdown}
              style={{ cursor: "pointer" }}
            >
              2 Items in Cart <DownOutlined />
            </p>
            <hr style={{ border: "1px solid gray", margin: "10px 0" }} />
            {dropdownVisible && (
              <div className="dropdown-content">
                <Row>
                  <Col>
                    <img
                      src="../../images/paypal.png"
                      alt="PayPal"
                      className="img-item-cart"
                    />
                  </Col>
                  <Col className="cart-dropdown">
                    <p>Custom Woven Labels</p>
                    <p>Qty: 5</p>
                    <p onClick={toggleDropdown1} style={{ cursor: "pointer" }}>
                      View Details <DownOutlined />
                    </p>
                  </Col>
                  <Col className="amount-cart">
                    <p className="amount-cart-txt">$46.00</p>
                  </Col>

                  {dropdownVisible1 && (
                    <div className="dropdown-content2">
                      {/* Order details wrapped in <p> tags */}
                      {[
                        "Area",
                        "Style",
                        "Size",
                        "Backing Options",
                        "Metallic Thread",
                        "Size Symbols or Color Versions?",
                        "Proof Options",
                        "Turnaround Options",
                        "Quantity",
                      ].map((label, index) => (
                        <div key={index}>
                          <p>
                            <strong>{label}</strong>
                          </p>
                          <p>
                            5 x{" "}
                            {label === "Area"
                              ? "1 +$40.00"
                              : label === "Style"
                              ? "Straight Cut (Flat)"
                              : "None"}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </Row>
                <hr style={{ border: "1px solid gray", margin: "10px 0" }} />
              </div>
            )}
            <div className="total-details">
              <div className="total-item">
                <p>Cart Subtotal:</p>
                <p>$100.00</p>
              </div>
              <div className="total-item">
                <p>Shipping Fee:</p>
                <p>$5.00</p>
              </div>
              <div className="total-item">
                <p>Total:</p>
                <p>$105.00</p>
              </div>
            </div>
            <div className="btn-main">
              <Button type="primary" className="place-button">
                Place Order
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default CheckoutBelow1;

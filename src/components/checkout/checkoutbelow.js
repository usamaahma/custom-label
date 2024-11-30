import React, { useState } from "react";
import { Row, Col, Form, Input, Button, Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useCart } from "../../context/cartcontext"; // Import Cart Context
import "./checkoutbelow.css";
import IconMessage from "./iconmessage";

const { Option } = Select;

function CheckoutBelow1() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownVisible1, setDropdownVisible1] = useState(false);

  const { cart, removeFromCart } = useCart(); // Get cart data from context

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const toggleDropdown1 = () => {
    setDropdownVisible1(!dropdownVisible1);
  };

  const redirectToPayPal = () => {
    window.location.href = "https://www.paypal.com"; // Redirect to PayPal website
  };

  // Calculate Total Price
  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="checkout-container">
      <div className="check-below"></div>
      <div className="check-below">
        <p className="check-txt">CHECKOUT</p>
      </div>
      <Row flex justify={"space-evenly"}>
        {/* Column 1: Billing Address */}
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
              rules={[
                { required: true, message: "Please select your country!" },
              ]}
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

        {/* Column 2: Shipping and Payment */}
        <Col xs={24} sm={12} md={8} className="border-column">
          <div className="shipping-method">
            <div className="ship-address">
              <p className="shipping-txt">Shipping Method</p>
            </div>
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
            {/* Payment Button */}
            <div className="ship-address" style={{ marginTop: "20px" }}>
              <p className="shipping-txt">Payment Method</p>
            </div>
            <Button
              type="primary"
              style={{
                backgroundColor: "#808080",
                borderColor: "#808080",
                color: "#fff",
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                marginTop: "20px",
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
              {cart.length} Items in Cart <DownOutlined />
            </p>
            <hr style={{ border: "1px solid gray", margin: "10px 0" }} />
            {dropdownVisible && (
              <div className="dropdown-content">
                {cart.map((item, index) => {
                  console.log("Cart Item:", item); // Log the current item in the cart
                  return (
                    <Row key={index} style={{ marginBottom: "10px" }}>
                      <p className="custom-viewedit">{item.name}</p>

                      <Col>
                        <img
                          src={item.artwork} // Assuming item has an image property
                          alt={item.name}
                          className="img-item-cart"
                        />
                      </Col>
                      <Col className="cart-dropdown">
                        <p>Options: {item.options}</p>
                        <p>Size: {item.size}</p>
                        <p>Style: {item.style}</p>
                        <p>Comments: {item.comments}</p>
                        <p>Qty: {item.quantity}</p>
                      </Col>
                      <Col className="amount-cart">
                        <p className="amount-cart-txt">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </Col>
                      <Col>
                        <Button
                          type="danger"
                          onClick={() => removeFromCart(item)}
                          style={{ marginLeft: "10px" }}
                        >
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  );
                })}
              </div>
            )}
            <div className="total-details">
              <div className="total-item">
                <p>Cart Subtotal:</p>
                <p>${calculateTotal()}</p>
              </div>
              <div className="total-item">
                <p>Shipping Fee:</p>
                <p>$5.00</p>
              </div>
              <div className="total-item">
                <p>Total:</p>
                <p>${(parseFloat(calculateTotal()) + 5).toFixed(2)}</p>
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

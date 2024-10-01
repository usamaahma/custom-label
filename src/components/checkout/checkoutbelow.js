import React, { useState } from "react";
import { Row, Col, Form, Input, Button, Radio, Card, Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./checkoutbelow.css";
import IconMessage from "./iconmessage"; // Assuming this is your icon component
import Vieweditcart from "./vieweditcart";
import Cartmodal1 from "./cartmodal";

const { Option } = Select;

function CheckoutBelow1() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, index) => currentYear + index); // 11 years including current

  const [paymentMethod, setPaymentMethod] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownVisible1, setDropdownVisible1] = useState(false);

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const toggleDropdown1 = () => {
    setDropdownVisible1(!dropdownVisible1);
  };

  const [visible, setVisible] = useState(false);
  return (
    <div className="checkout-container">
      <div className="check-below">
        <p className="check-txt">CHECKOUT BELOW</p>
      </div>
      <Row gutter={[16, 16]}>
        {/* Column 1: Shipping Address */}
        <Col xs={24} sm={12} md={8}>
          <div className="ship-address">
            <p className="shipping-txt">Shipping Address</p>
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

        {/* Column 2: Shipping and Payment Method */}
        <Col xs={24} sm={12} md={8}>
          <div className="shipping-method">
            <div className="ship-address">
              <p className="shipping-txt">Shipping Method</p>
            </div>{" "}
            <p className="enter-txt">
              Enter a valid shipping address to calculate shipping options.
              Ensure zip code and country are correct.
            </p>
            <div className="ship-address">
              <p className="shipping-txt">Payment Method</p>
            </div>{" "}
            <Radio.Group onChange={handlePaymentChange} value={paymentMethod}>
              <Card className="card1" hoverable>
                <Radio value="credit-card">
                  Credit Card (Authorize.Net CIM)
                </Radio>
                {paymentMethod === "credit-card" && (
                  <div className="payment-details">
                    <img
                      src="../../images/visacard.png"
                      alt="Visa Card"
                      className="card-image"
                    />
                    <Form.Item
                      label="Card Number"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your card number!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter your card number" />
                    </Form.Item>
                    <Form.Item label="Expiry Date">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Select placeholder="MM" className="expiry-select">
                          {[...Array(12)].map((_, index) => (
                            <Option key={index} value={index + 1}>
                              {(index + 1).toString().padStart(2, "0")}
                            </Option>
                          ))}
                        </Select>
                        <Select placeholder="YY" className="expiry-select">
                          {years.map((year) => (
                            <Option key={year} value={year}>
                              {year.toString().slice(-2)}
                            </Option>
                          ))}
                        </Select>
                      </div>
                    </Form.Item>
                    <Form.Item
                      label="CVV"
                      rules={[{ required: true, message: "Please enter CVV!" }]}
                    >
                      <Input placeholder="Enter CVV" />
                    </Form.Item>
                  </div>
                )}
              </Card>
              <Card className="card2" hoverable>
                <Radio value="paypal">
                  <img
                    src="../../images/paypal.png"
                    alt="PayPal"
                    className="paypal-image"
                  />
                  PayPal Express
                </Radio>
                {paymentMethod === "paypal" && (
                  <p>You will be redirected to the PayPal website.</p>
                )}
              </Card>
            </Radio.Group>
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
            <hr style={{ border: '1px solid gray', margin: '10px 0' }} />
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
                <hr style={{ border: '1px solid gray', margin: '10px 0' }} />
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
      <Vieweditcart />
      <div>
      <Button onClick={() => setVisible(true)}>Open Cart</Button>
      <Cartmodal1 visible={visible} onClose={() => setVisible(false)} />
    </div>
    </div>
  );
}

export default CheckoutBelow1;

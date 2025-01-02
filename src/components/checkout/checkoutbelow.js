import React, { useState } from "react";
import { Row, Col, Form, Input, Button, Select, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useCart } from "../../context/cartcontext"; // Import Cart Context
import "./checkoutbelow.css";
import IconMessage from "./iconmessage";
import { useNavigate } from "react-router-dom";
import { checkout } from "../../utils/axios";

const { Option } = Select;

function CheckoutBelow1() {
  const navigate = useNavigate();
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
  const onFinish = async (values) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    console.log(userData, "userdata");
    const userDataCheckout = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      phoneNumber: userData.phonenumber,
    };
    console.log(userDataCheckout); // Output should reflect the extracted values

    const billingvalues = {
      firstName: values.billfirstname,
      lastName: values.billlastname,
      middleName: values.billmiddlename,
      companyName: values.billcompanyname,
      phoneNumber: values.billphonenumber,
      streetAddress: values.billaddress,
      city: values.billcity,
      stateOrProvince: values.billstate,
      zipOrPostalCode: values.billzipcode,
      country: values.billcountry,
    };

    const shippingvalues = {
      firstName: values.shipFirstName,
      lastName: values.shipLastName,
      middleName: values.shipMiddleName,
      companyName: values.shipCompanyName,
      phoneNumber: values.shipPhoneNumber,
      streetAddress: values.shipStreetAddress,
      city: values.shipCity,
      stateOrProvince: values.shipState,
      zipOrPostalCode: values.shipZipCode,
      country: values.shipCountry,
    };
    console.log("dgduowbuwvdwdvwu", cart);

    const cartdata = cart.map((item) => ({
      productName: item.name,
      artworkFile: item.artwork,
      size: item.size,
      style: item.style,
      comments: item.comments,
      quantity: item.quantity,
      totalPrice: item.totalPrice,
      qty: 1,
    }));
    const totalAmount = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const paymentDetails = {
      method: "PayPal",
      totalAmount: totalAmount,
      currency: "USD",
      transactionId: "dw", // Optional, will be set after PayPal response
      payerEmail: "usa@gmail.com", // Optional
      status: "Pending", // Default status
    };
    console.log("Billing Values:", billingvalues);
    console.log("Shipping Values:", shippingvalues);
    console.log("Cart Data:", cartdata);
    console.log("Payment Details:", paymentDetails);
    console.log("Userdata:", userDataCheckout);

    try {
      // Call the Checkout API with both cart data and payment details
      const response = await checkout.post("/", {
        user: userDataCheckout,
        checkoutProducts: cartdata,
        billingAddress: billingvalues,
        shippingAddress: shippingvalues,
        payment: paymentDetails,
      });
      console.log("Checkout Successful:", response.data);
      message.success("your order is placed!");
      navigate("/thank-you");
    } catch (error) {
      console.error("Error during checkout:", error);
      message.error("your order is not completed!");
    }
  };

  return (
    <div className="checkout-container">
      <div className="check-below"></div>
      <div className="check-below">
        <p className="check-txt">CHECKOUT</p>
      </div>
      <Form layout="vertical" onFinish={onFinish}>
        <Row flex justify={"space-evenly"}>
          {/* Column 1: Billing Address */}
          <Col xs={24} sm={12} md={7} className="border-column">
            <div className="ship-address">
              <p className="shipping-txt">Billing Address</p>
            </div>
            <Form.Item
              label="First Name"
              className="input-heading"
              name="billfirstname"
              rules={[
                { required: true, message: "Please enter your first name!" },
              ]}
            >
              <Input className="input" placeholder="Enter your first name" />
            </Form.Item>
            <Form.Item
              label="Middle Name"
              className="input-heading"
              name="billmiddlename"
            >
              <Input
                className="input"
                placeholder="Enter your middle name (optional)"
              />
            </Form.Item>
            <Form.Item
              label="Last Name"
              className="input-heading"
              name="billlastname"
              rules={[
                { required: true, message: "Please enter your last name!" },
              ]}
            >
              <Input className="input" placeholder="Enter your last name" />
            </Form.Item>
            <Form.Item
              label="Company Name"
              className="input-heading"
              name="billcompanyname"
            >
              <Input
                className="input"
                placeholder="Enter your company name (optional)"
              />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              className="input-heading"
              name="billphonenumber"
              rules={[
                {
                  required: true,
                  message: "Please enter your phone number!",
                },
                {
                  len: 11, // Ensures the phone number is exactly 11 digits
                  message: "Phone number must be exactly 11 digits!",
                },
                {
                  pattern: /^[0-9]{11}$/, // Ensures the phone number is numeric
                  message: "Phone number must be numeric!",
                },
              ]}
            >
              <Input
                className="input"
                placeholder="Enter your phone number"
                maxLength={11} // Limits input to 11 characters
                type="tel" // Open numeric keypad on mobile devices
              />
            </Form.Item>

            <Form.Item
              label="Street Address"
              className="input-heading"
              name="billaddress"
              rules={[
                { required: true, message: "Please enter your address!" },
              ]}
            >
              <Input className="input" placeholder="Enter your address" />
            </Form.Item>
            <Form.Item
              label="City"
              className="input-heading"
              name="billcity"
              rules={[{ required: true, message: "Please enter your city!" }]}
            >
              <Input className="input" placeholder="Enter your city" />
            </Form.Item>
            <Form.Item
              label="State/Province"
              className="input-heading"
              name="billstate"
              rules={[
                {
                  required: true,
                  message: "Please select your state or province!",
                },
              ]}
            >
              <Select placeholder="Select your state/province">
                <Option value="california">California</Option>
                <Option value="ontario">Ontario</Option>
                <Option value="london">London</Option>
                <Option value="new-south-wales">New South Wales</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Zip/Postal Code"
              name="billzipcode"
              className="input-heading"
              rules={[
                { required: true, message: "Please enter your zip code!" },
                {
                  pattern: /^[0-9]+$/, // Ensures that only numeric characters are allowed
                  message: "Zip code must be numeric!",
                },
              ]}
            >
              <Input
                className="input"
                placeholder="Enter your zip code"
                maxLength={6} // Optional: Restrict the maximum length for the zip code (adjust as per your requirement)
              />
            </Form.Item>

            <Form.Item
              label="Country"
              name="billcountry"
              className="input-heading"
              rules={[
                { required: true, message: "Please select your country!" },
              ]}
            >
              <Select placeholder="Select your country">
                <Option value="usa">United States</Option>
                <Option value="canada">Canada</Option>
                <Option value="uk">United Kingdom</Option>
                <Option value="australia">Australia</Option>
              </Select>
            </Form.Item>
          </Col>

          {/* Column 2: Shipping and Payment */}
          <Col xs={24} sm={12} md={8} className="border-column">
            <div className="shipping-method">
              <div className="ship-address">
                <p className="shipping-txt">Shipping Method</p>
              </div>
              <Form.Item
                label="First Name"
                name="shipFirstName"
                className="input-heading"
                rules={[
                  {
                    required: true,
                    message: "Please enter your first name!",
                  },
                ]}
              >
                <Input className="input" placeholder="Enter your first name" />
              </Form.Item>
              <Form.Item
                label="Middle Name"
                name="shipMiddleName"
                className="input-heading"
              >
                <Input
                  className="input"
                  placeholder="Enter your middle name (optional)"
                />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="shipLastName"
                className="input-heading"
                rules={[
                  { required: true, message: "Please enter your last name!" },
                ]}
              >
                <Input className="input" placeholder="Enter your last name" />
              </Form.Item>
              <Form.Item
                label="Company Name"
                name="shipCompanyName"
                className="input-heading"
              >
                <Input
                  className="input"
                  placeholder="Enter your company name (optional)"
                />
              </Form.Item>
              <Form.Item
                label="Phone Number"
                name="shipPhoneNumber"
                className="input-heading"
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number!",
                  },
                  {
                    len: 11, // Ensures the phone number is exactly 11 digits
                    message: "Phone number must be exactly 11 digits!",
                  },
                  {
                    pattern: /^[0-9]{11}$/, // Ensures the phone number is numeric
                    message: "Phone number must be numeric!",
                  },
                ]}
              >
                <Input
                  className="input"
                  placeholder="Enter your phone number"
                  maxLength={11} // Limits input to 11 characters
                  type="tel" // Open numeric keypad on mobile devices
                />
              </Form.Item>

              <Form.Item
                label="Street Address"
                name="shipStreetAddress"
                className="input-heading"
                rules={[
                  { required: true, message: "Please enter your address!" },
                ]}
              >
                <Input className="input" placeholder="Enter your address" />
              </Form.Item>
              <Form.Item
                label="City"
                name="shipCity"
                className="input-heading"
                rules={[{ required: true, message: "Please enter your city!" }]}
              >
                <Input className="input" placeholder="Enter your city" />
              </Form.Item>
              <Form.Item
                label="State/Province"
                name="shipState"
                className="input-heading"
                rules={[
                  {
                    required: true,
                    message: "Please select your state or province!",
                  },
                ]}
              >
                <Select placeholder="Select your state/province">
                  <Option value="california">California</Option>
                  <Option value="ontario">Ontario</Option>
                  <Option value="london">London</Option>
                  <Option value="new-south-wales">New South Wales</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Zip/Postal Code"
                name="shipZipCode"
                className="input-heading"
                rules={[
                  { required: true, message: "Please enter your zip code!" },
                  {
                    pattern: /^[0-9]+$/, // Ensures that only numeric characters are allowed
                    message: "Zip code must be numeric!",
                  },
                ]}
              >
                <Input
                  className="input"
                  placeholder="Enter your zip code"
                  maxLength={6} // Restrict the maximum length for the zip code (adjust as per your requirement)
                />
              </Form.Item>

              <Form.Item
                label="Country"
                name="shipCountry"
                className="input-heading"
                rules={[
                  { required: true, message: "Please select your country!" },
                ]}
              >
                <Select placeholder="Select your country">
                  <Option value="usa">United States</Option>
                  <Option value="canada">Canada</Option>
                  <Option value="uk">United Kingdom</Option>
                  <Option value="australia">Australia</Option>
                </Select>
              </Form.Item>
            </div>
          </Col>

          {/* Column 3: Order Summary */}
          <Col xs={24} sm={12} md={8}>
            <div className="summary-main">
              {/* Payment Button */}
              <div className="ship-address" style={{ marginTop: "" }}>
                <p className="shipping-txt">Order Summary</p>
              </div>
              {/* <Button
                type="primary"
                style={{
                  backgroundColor: "#808080",
                  borderColor: "#808080",
                  color: "#fff",
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                  marginTop: "20px",
                  marginBottom: "3rem",
                }}
                onClick={redirectToPayPal}
              >
                Proceed to Pay
              </Button> */}
              <p className="order-summary-txt">Summary</p>
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
                          <p>
                            Options:
                            {Array.isArray(item.options)
                              ? item.options.map((option) => (
                                  <span key={option._id}>
                                    {option.title || ""}
                                  </span>
                                ))
                              : "No options"}
                          </p>{" "}
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
                  <p></p>
                </div>
                <div className="total-item">
                  <p>Total:</p>
                  <p>${parseFloat(calculateTotal()).toFixed(2)}</p>
                </div>
              </div>
              <div className="btn-main">
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%", padding: "20px", marginTop: "20px" }}
                >
                  Place Order
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default CheckoutBelow1;

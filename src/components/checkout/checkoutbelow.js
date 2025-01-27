import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  message,
  Modal,
  notification,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useCart } from "../../context/cartcontext"; // Import Cart Context
import "./checkoutbelow.css";
import { useNavigate } from "react-router-dom";
import { checkout } from "../../utils/axios";
import { manageaddresses } from "../../utils/axios";
import PayPalCheckoutButton from "./paypalcheckoutbutton";

const { Option } = Select;

function CheckoutBelow1() {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownVisible1, setDropdownVisible1] = useState(false);
  const [form] = Form.useForm(); // Use Ant Design's form instance
  const [addresses, setAddresses] = useState(null); // State to store address data
  const [sameAsBilling, setSameAsBilling] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [billAdd, setBillAdd] = useState(null); // To store API response
  const [shipAdd, setShipAdd] = useState(null); // To store API response
  const [paymentApproved, setPaymentApproved] = useState(false);
  const [countryCode, setCountryCode] = useState("1");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { cart, removeFromCart } = useCart(); // Get cart data from context
  const userData = JSON.parse(localStorage.getItem("user"));
  const userid = userData?.id;

  const totalPrice = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  // Calculate Total Price
  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        if (userid) {
          setLoading(true);
          const response = await manageaddresses.get(`?userId=${userid}`);
          console.log(response);

          if (
            response.data &&
            response.data.addresses &&
            response.data.addresses.length > 0
          ) {
            const billingAddresses = response.data.addresses[0]?.billingAddress;
            const shippingAddresses =
              response.data.addresses[0]?.shippingAddress;

            // Set state for billing and shipping
            setBillAdd(billingAddresses);
            setShipAdd(shippingAddresses);

            // Fill the form fields
            form.setFieldsValue({
              billfirstname: billingAddresses?.firstName,
              billmiddlename: billingAddresses?.middleName,
              billlastname: billingAddresses?.lastName,
              billcompanyname: billingAddresses?.companyName,
              billphonenumber: billingAddresses?.phoneNumber,
              billaddress: billingAddresses?.streetAddress,
              billcity: billingAddresses?.city,
              billstate: billingAddresses?.stateOrProvince,
              billzipcode: billingAddresses?.zipOrPostalCode,
              billcountry: billingAddresses?.country,

              shipFirstName: shippingAddresses?.firstName,
              shipMiddleName: shippingAddresses?.middleName,
              shipLastName: shippingAddresses?.lastName,
              shipCompanyName: shippingAddresses?.companyName,
              shipPhoneNumber: shippingAddresses?.phoneNumber,
              shipStreetAddress: shippingAddresses?.streetAddress,
              shipCity: shippingAddresses?.city,
              shipState: shippingAddresses?.stateOrProvince,
              shipZipCode: shippingAddresses?.zipOrPostalCode,
              shipCountry: shippingAddresses?.country,
            });
          } else {
            setError("No addresses found for the user");
          }
        } else {
          setError("User ID not found");
        }
      } catch (err) {
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [userid]);

  // Create the Form instance
  // Runs on mount, ensures we fetch the data when the component is first rendered

  // Handle "Same as billing" checkbox
  const handleSameAsBillingChange = (e) => {
    setSameAsBilling(e.target.checked);
    if (e.target.checked && addresses) {
      // If checked, copy the billing address to the shipping fields
      form.setFieldsValue({
        shipFirstName: form.getFieldValue("billfirstname"),
        shipLastName: form.getFieldValue("billlastname"),
        shipStreetAddress: form.getFieldValue("billaddress"),
        shipCity: form.getFieldValue("billcity"),
        shipState: form.getFieldValue("billstate"),
        shipZipCode: form.getFieldValue("billzipcode"),
        shipCountry: form.getFieldValue("billcountry"),
        shipPhoneNumber: form.getFieldValue("billphonenumber"),
      });
    }
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Function to hide the modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    const fetchCountryCode = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        console.log("Fetched Data:", data);
        setCountryCode(`${data.country_calling_code || "1"}`);
      } catch (error) {
        console.error("Error fetching country code:", error);
        setCountryCode("+1");
      }
    };

    fetchCountryCode();
  }, []);
  const onFinish = async (values) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    // Check if the user is logged in
    if (!userData) {
      notification.error({
        message: "Login Required",
        description: "Please log in or sign up to place your order.",
      });
      return; // Stop further execution if the user is not logged in
    }
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
      options:item.options,
      comments: item.comments,
      quantity: item.quantity,
      totalPrice: item.totalPrice,
      qty: 1,
    }));
    const status = paymentApproved ? "Completed" : "Pending";
    const paymentDetails = {
      status: status, // Default status
    };
    console.log("Billing Values:", billingvalues);
    console.log("Shipping Values:", shippingvalues);
    console.log("Cart Data:", cartdata);
    console.log("Payment Details:", paymentDetails);
    console.log("Userdata:", userDataCheckout);

    try {
      if (!paymentApproved) {
        // If payment is not approved, display a message and don't proceed with checkout
        notification.error({
          message: "Payment is Pending",
          description: "Please Pay first by clicking PayPal button.",
        });
        return; // Stop further execution if payment is not approved
      }

      // If payment is approved, proceed with the checkout API call
      const response = await checkout.post("/", {
        user: userDataCheckout,
        checkoutProducts: cartdata,
        billingAddress: billingvalues,
        shippingAddress: shippingvalues,
        payment: paymentDetails,
      });

      console.log("Checkout Successful:", response.data);
      message.success("Your order is placed!");
      sessionStorage.removeItem("cart");
      navigate("/thank-you"); // Redirect to the thank-you page
    } catch (error) {
      console.error("Error during checkout:", error);
      message.error("Your order is not completed!"); // Display error message if checkout fails
    }
  };

  return (
    <div className="checkout-container">
      <div className="check-below"></div>
      <div className="check-below">
        <p className="check-txt">CHECKOUT</p>
      </div>
      <Form
        form={form}
        name="checkout-form"
        layout="vertical"
        onFinish={onFinish}
      >
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
              name="billphonenumber"
              label="Phone Number"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <input
                placeholder={`${countryCode} Phone Number`}
                className="create-input"
                type="tel"
                maxLength={10}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault(); // Prevent non-numeric input
                  }
                }}
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
                name="shipPhoneNumber"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <input
                  placeholder={`${countryCode} Phone Number`}
                  className="create-input"
                  type="tel"
                  maxLength={10}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault(); // Prevent non-numeric input
                    }
                  }}
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
                {/* Price Match Button above Place Order Button */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: "2px",
                  }}
                >
                  <Button
                    type="dashed" // dashed type for a subtle button
                    style={{
                      width: "50%",
                      padding: "15px",
                      marginBottom: "2px", // Space between Price Match and Place Order button
                    }}
                    onClick={showModal}
                  >
                    We Price Match
                  </Button>
                </div>

                {/* Place Order Button */}
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    width: "100%",
                    padding: "20px",
                    marginTop: "20px",
                    marginBottom: "1rem",
                  }}
                >
                  Place Order
                </Button>

                {/* Conditionally render PayPal button after clicking Place Order */}
                {totalPrice > 0 && !paymentApproved && (
                  <>
                    {console.log("Rendering PayPalCheckoutButton", {
                      totalPrice,
                      paymentApproved,
                    })}
                    <PayPalCheckoutButton
                      amount={totalPrice}
                      cart={cart}
                      onPaymentApproved={(status) => {
                        console.log("Payment approved:", status);
                        setPaymentApproved(status);
                      }}
                    />
                  </>
                )}

                {/* Display the payment status */}
                {paymentApproved ? (
                  <div>Payment was successful!</div>
                ) : (
                  <div>Payment is Pending.</div>
                )}
                <Modal
                  visible={isModalVisible}
                  onCancel={handleCancel}
                  footer={null}
                  bodyStyle={{ padding: "20px" }} // Optional: Adjust body padding
                  width={500} // Optional: Adjust modal width
                  style={{ top: 20 }} // Optional: Adjust position if needed
                >
                  {/* Modal Header Customization */}
                  <div
                    style={{
                      backgroundColor: "#5F5B5B",
                      marginBottom: "10px",
                      padding: "10px",
                      color: "white",
                    }}
                  >
                    <h2 style={{ margin: 0 }}>Price Match Policy</h2>
                  </div>

                  <p>
                    If you have a lower quote from a competitor for the same
                    product and specifications,
                    <a
                      href="mailto:sales@theclothinglabels.com"
                      style={{ color: "blue", textDecoration: "underline" }}
                    >
                      &nbsp;email us&nbsp;
                    </a>
                    the quote and we will do our best to match the price for
                    you. Make sure you include tax and shipping in your quote.
                  </p>

                  <Button style={{ marginTop: "7px" }} onClick={handleCancel}>
                    Ok
                  </Button>
                </Modal>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default CheckoutBelow1;

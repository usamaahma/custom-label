import React, { useEffect, useState } from "react";
import "./dashboard.css";
import {
  Card,
  Button,
  Modal,
  Typography,
  Row,
  Col,
  Form,
  Input,
  message,
} from "antd";
import { useAuth } from "../../context/authcontext";
import { FaEnvelope, FaUserAlt, FaBox, FaEye } from "react-icons/fa"; // Add the FaEye icon for View
import { manageaddresses } from "../../utils/axios";

import CustomLoader from "../clothingsection/loader";
import Updatemodal1 from "./updatemodal";

const { Title, Paragraph } = Typography;

function AccountDashboard() {
  const { user } = useAuth();
  const [isManageModalVisible, setIsManageModalVisible] = useState(false); // State to control manage modal visibility
  const [isViewModalVisible, setIsViewModalVisible] = useState(false); // State to control view modal visibility
  const [viewAddressData, setViewAddressData] = useState(null); // State for storing the address data for view modal
  const [addressData, setAddressData] = useState({}); // State to manage the address data input
  const [billAdd, setBillAdd] = useState(null); // To store API response
  const [shipAdd, setShipAdd] = useState(null); // To store API response
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [reload, setReload] = useState(false); // Error state
  const [countryCode, setCountryCode] = useState("+1");
  const [form] = Form.useForm(); // Initialize the form instance here
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to show the manage modal
  const showUpdateModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showManageModal = () => {
    setIsManageModalVisible(true);
  };

  // Function to close the manage modal
  const handleManageCancel = () => {
    setIsManageModalVisible(false);
  };

  // Function to show the view modal and populate address data
  const showViewModal = () => {
    // Set the address data for the modal (use your address data here)
    setViewAddressData({
      billing: {
        firstName: user?.firstName || "N/A",
        middleName: user?.middleName || "N/A", // Add middle name here
        lastName: user?.lastName || "N/A",
        streetAddress: user?.streetAddress || "N/A",
        city: user?.city || "N/A",
        state: user?.state || "N/A",
        zipCode: user?.zipCode || "N/A",
        country: user?.country || "N/A",
        phoneNumber: user?.phoneNumber || "N/A", // Add phone number
        companyName: user?.companyName || "N/A", // Add company name
      },
      shipping: {
        firstName: user?.shippingFirstName || "N/A",
        middleName: user?.shippingMiddleName || "N/A", // Add middle name for shipping
        lastName: user?.shippingLastName || "N/A",
        streetAddress: user?.shippingStreetAddress || "N/A",
        city: user?.shippingCity || "N/A",
        state: user?.shippingState || "N/A",
        zipCode: user?.shippingZipCode || "N/A",
        country: user?.shippingCountry || "N/A",
        phoneNumber: user?.shippingPhoneNumber || "N/A", // Add phone number for shipping
        companyName: user?.shippingCompanyName || "N/A", // Add company name for shipping
      },
    });
    setIsViewModalVisible(true);
  };

  // Function to close the view modal
  const handleViewCancel = () => {
    setIsViewModalVisible(false);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressData({
      ...addressData,
      [name]: value,
    });
  };

  // Handle form submission
  // const handleSubmit = async () => {
  //   try {
  //     const response = await axios.post("/api/address", addressData); // Replace with your actual API endpoint
  //     console.log("Address submitted successfully:", response.data);
  //     setIsManageModalVisible(false); // Close the modal after successful submission
  //   } catch (error) {
  //     console.error("Error submitting address:", error);
  //   }
  // };
  const userid = user?.id;

  const onFinish = (values) => {
    console.log("Form Values:", values);
    // Retrieve the user data from localStorage
    const userData = user;
    // Check if the user has already submitted an address
    const addressSubmitted = localStorage.getItem(
      `addressSubmitted_${userData.id}`
    );

    if (addressSubmitted) {
      message.warning(
        "You have already updated your address. You cannot update it again."
      );
      return; // Prevent further execution
    }

    const data1 = {
      userId: userData.id, // Ensure userId is passed as a string
      shippingAddress: {
        firstName: values.shippingFirstName,
        middleName: values.shippingMiddleName,
        lastName: values.shippingLastName,
        streetAddress: values.shippingStreetAddress,
        city: values.shippingCity,
        stateOrProvince: values.shippingState,
        zipOrPostalCode: values.shippingZipCode,
        country: values.shippingCountry,
        phoneNumber: values.shippingPhoneNumber,
        companyName: values.shippingCompanyName,
      },
      billingAddress: {
        firstName: values.billingFirstName,
        middleName: values.billingMiddleName,
        lastName: values.billingLastName,
        streetAddress: values.billingStreetAddress,
        city: values.billingCity,
        stateOrProvince: values.billingState,
        zipOrPostalCode: values.billingZipCode,
        country: values.billingCountry,
        phoneNumber: values.billingPhoneNumber,
        companyName: values.billingCompanyName,
      },
    };

    // Check if the address already exists for this user in localStorage
    const existingData =
      JSON.parse(localStorage.getItem("userAddresses")) || [];
    const isAddressExist = existingData.some((address) => {
      return (
        address.userId === data1.userId &&
        (JSON.stringify(address.shippingAddress) ===
          JSON.stringify(data1.shippingAddress) ||
          JSON.stringify(address.billingAddress) ===
            JSON.stringify(data1.billingAddress))
      );
    });

    if (isAddressExist) {
      // If address already exists for the user, show a message and don't proceed
      message.warning("You have already updated your address.");
      return;
    }

    // If the address does not exist, make the API call to update
    manageaddresses({
      method: "post",
      data: data1,
    })
      .then((res) => {
        console.log("API Response:", res);
        message.success("Thank you for updating your address!");
        // Optionally, store the new address in localStorage

        existingData.push(data1);
        localStorage.setItem("userAddresses", JSON.stringify(existingData));

        // Set a flag that the user has submitted their address
        localStorage.setItem(`addressSubmitted_${userData.id}`, true);

        // Reset the form and close the modal
        form.resetFields(); // This will reset all form fields to their initial state
        setIsManageModalVisible(false);

        // Reload the page to fetch the new data
        window.location.reload();
      })
      .catch(() => {
        message.error("Something went wrong, please try again!");
      });
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
        setCountryCode("1");
      }
    };

    fetchCountryCode();
  }, []);
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        // Ensure userId is available
        if (userid) {
          setLoading(true); // Start loading
          const response = await manageaddresses.get(`?userId=${userid}`);
          // Ensure that there are addresses in the response
          if (
            response.data &&
            response.data.addresses &&
            response.data.addresses.length > 0
          ) {
            // Loop through each address and extract both billingAddress and shippingAddress
            const billingAddresses = response.data.addresses.map(
              (address) => address.billingAddress
            );
            const shippingAddresses = response.data.addresses.map(
              (address) => address.shippingAddress
            );

            // Set both billing and shipping addresses in the state
            setBillAdd(billingAddresses); // Set all billing addresses
            setShipAdd(shippingAddresses); // Set all shipping addresses
            localStorage.setItem("addressid", response.data.addresses[0]._id);
          } else {
            setError("No addresses found for the user");
          }
        } else {
          setError("User ID not found");
        }
      } catch (err) {
        setError("Error fetching data: " + err.message); // Handle any errors
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchAddresses();
  }, [userid]);

  // Handling loading, error, and displaying addresses
  if (loading) {
    return <CustomLoader />;
  }

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1 level={2} className="header-title">
          Account Information
        </h1>
      </div>

      <Row gutter={[16, 24]} justify="space-between">
        {/* Contact Information Card */}
        <Col xs={24} sm={12} md={8}>
          <Card
            className="user-card"
            title={
              <div className="card-title">
                <FaUserAlt /> Contact Information
              </div>
            }
          >
            <Paragraph>Name: {user?.name || "No Username"}</Paragraph>
            <Paragraph>Email: {user?.email || "No Email"}</Paragraph>
          </Card>
        </Col>

        {/* Newsletter Subscription Card */}
        <Col xs={24} sm={12} md={8}>
          <Card
            className="newsletter-card"
            title={
              <div className="card-title">
                <FaEnvelope /> Newsletters
              </div>
            }
          >
            <Paragraph>You aren't subscribed to our newsletter.</Paragraph>
          </Card>
        </Col>

        {/* Manage Addresses Card */}
        <Col xs={24} sm={12} md={8}>
          <Card
            className="manage-addresses-card"
            title={
              <div className="card-title">
                <FaBox /> Manage Addresses
              </div>
            }
          >
            <Button
              type="primary"
              className="manage-addresses-btn"
              onClick={showManageModal}
              style={{ width: "100%", marginBottom: "10px" }}
            >
              <FaBox /> Add Address
            </Button>
            <Button
              type="default"
              className="view-addresses-btn"
              onClick={showViewModal}
              style={{ width: "100%", marginBottom: "10px" }}
            >
              <FaEye /> View
            </Button>
            {/* Update Address Button */}
            <Button
              type="dashed"
              className="update-address-btn"
              onClick={showUpdateModal}
              style={{ width: "100%" }}
            >
              <FaBox /> Update Address
            </Button>
          </Card>

          {/* Update Address Modal */}
          <Modal visible={isModalVisible} footer={null} onCancel={handleCancel}>
            <Updatemodal1 setModalVisible={setIsModalVisible} />
          </Modal>
        </Col>
      </Row>

      {/* Modal for add Addresses */}
      <Modal
        visible={isManageModalVisible}
        onCancel={handleManageCancel}
        footer={[]}
        width={1000} // Increased width to accommodate both sections in one row
        className="address-modal"
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div
            style={{
              textAlign: "center",
              backgroundColor: "#5F5B5B",
              padding: "10px",
              marginTop: "25px",
              marginBottom: "10px",
              borderRadius: "0.5rem",
              border: "dotted 0.1rem white",
            }}
          >
            <p style={{ fontSize: "24px", color: "white" }}>
              Please Add the Addresses
            </p>
          </div>

          {/* Row for Shipping and Billing Address */}
          <Row gutter={24}>
            {/* Shipping Address Column */}
            <Col span={12}>
              <Title level={4} style={{ fontWeight: "bold" }}>
                Shipping Address
              </Title>
              <Form.Item
                label="First Name"
                name="shippingFirstName"
                rules={[
                  { required: true, message: "Please enter your first name!" },
                ]}
              >
                <Input className="input-txt-dark" />
              </Form.Item>
              <Form.Item label="Middle Name" name="shippingMiddleName">
                <Input className="input-txt-dark" />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="shippingLastName"
                rules={[
                  { required: true, message: "Please enter your last name!" },
                ]}
              >
                <Input className="input-txt-dark" />
              </Form.Item>
              <Form.Item
                label="Street Address"
                name="shippingStreetAddress"
                rules={[
                  {
                    required: true,
                    message: "Please enter your street address!",
                  },
                ]}
              >
                <Input className="input-txt-dark" />
              </Form.Item>
              <Form.Item
                label="City"
                name="shippingCity"
                rules={[{ required: true, message: "Please enter your city!" }]}
              >
                <Input className="input-txt-dark" />
              </Form.Item>
              <Form.Item
                label="State/Province"
                name="shippingState"
                rules={[
                  {
                    required: true,
                    message: "Please enter your state/province!",
                  },
                ]}
              >
                <Input className="input-txt-dark" />
              </Form.Item>
              <Form.Item
                label="Zip/Postal Code"
                name="shippingZipCode"
                rules={[
                  {
                    required: true,
                    message: "Please enter your zip/postal code!",
                  },
                ]}
              >
                <Input className="input-txt-dark" />
              </Form.Item>
              <Form.Item
                label="Country"
                name="shippingCountry"
                rules={[
                  { required: true, message: "Please enter your country!" },
                ]}
              >
                <Input className="input-txt-dark" />
              </Form.Item>
              <Form.Item
                label="Phone Number"
                name="shippingPhoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <input
                  placeholder={`${countryCode} Phone Number`}
                  className="create-input input-txt-dark"
                  type="tel"
                  maxLength={10}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault(); // Prevent non-numeric input
                    }
                  }}
                />
              </Form.Item>
              <Form.Item label="Company Name" name="shippingCompanyName">
                <Input className="input-txt-dark" />
              </Form.Item>
            </Col>

            {/* Billing Address Column */}
            <Col span={12}>
              <Title level={4} style={{ fontWeight: "bold" }}>
                Billing Address
              </Title>
              <Form.Item
                label="First Name"
                name="billingFirstName"
                rules={[
                  { required: true, message: "Please enter your first name!" },
                ]}
              >
                <Input className="input-txt-dark" />
              </Form.Item>
              <Form.Item label="Middle Name" name="billingMiddleName">
                <Input className="input-txt-dark" />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="billingLastName"
                rules={[
                  { required: true, message: "Please enter your last name!" },
                ]}
              >
                <Input className="input-txt-dark" />
              </Form.Item>
              <Form.Item
                label="Street Address"
                name="billingStreetAddress"
                rules={[
                  {
                    required: true,
                    message: "Please enter your street address!",
                  },
                ]}
              >
                <Input className="input-txt-dark" />
              </Form.Item>
              <Form.Item
                label="City"
                name="billingCity"
                rules={[{ required: true, message: "Please enter your city!" }]}
              >
                <Input className="input-txt-dark" />
              </Form.Item>
              <Form.Item
                label="State/Province"
                name="billingState"
                rules={[
                  {
                    required: true,
                    message: "Please enter your state/province!",
                  },
                ]}
              >
                <Input className="input-txt-dark" />
              </Form.Item>
              <Form.Item
                label="Zip/Postal Code"
                name="billingZipCode"
                rules={[
                  {
                    required: true,
                    message: "Please enter your zip/postal code!",
                  },
                ]}
              >
                <Input className="input-txt-dark" />
              </Form.Item>
              <Form.Item
                label="Country"
                name="billingCountry"
                rules={[
                  { required: true, message: "Please enter your country!" },
                ]}
              >
                <Input className="input-txt-dark" />
              </Form.Item>
              <Form.Item
                label="Phone Number"
                name="billingPhoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <input
                  placeholder={`${countryCode} Phone Number`}
                  className="create-input input-txt-dark"
                  type="tel"
                  maxLength={10}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault(); // Prevent non-numeric input
                    }
                  }}
                />
              </Form.Item>
              <Form.Item label="Company Name" name="billingCompanyName">
                <Input className="input-txt-dark" />
              </Form.Item>
            </Col>
          </Row>

          {/* Submit and Cancel Buttons */}
          <Form.Item>
            <Button
              key="cancel"
              onClick={handleManageCancel}
              style={{ marginRight: "8px" }} // Optional: Add space between buttons
            >
              Cancel
            </Button>
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              style={{ marginTop: "10px" }} // Adding margin-top to the Submit button
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal for Viewing Address */}
      <Modal
        visible={isViewModalVisible}
        onCancel={handleViewCancel}
        footer={null}
        width={800}
        className="view-address-modal"
      >
        {billAdd && shipAdd && (
          <div>
            <div
              style={{
                textAlign: "center",
                backgroundColor: "#5F5B5B",
                padding: "10px",
                marginTop: "25px",
                marginBottom: "10px",
                borderRadius: "0.5rem",
                border: "dotted 0.1rem white",
              }}
            >
              <p style={{ fontSize: "24px", color: "white" }}>View Address</p>
            </div>

            <Row
              gutter={16}
              style={{
                marginTop: "20px",
                marginBottom: "10px",
                fontWeight: "bold",
              }}
            >
              {/* Billing Address Column */}
              <Col span={12}>
                <div className="address-column">
                  <Title level={4} style={{ fontWeight: "bold" }}>
                    Billing Address
                  </Title>
                  {/* Loop through billAdd array and display each address */}
                  {billAdd.length > 0 ? (
                    billAdd.map((address, index) => (
                      <div key={index}>
                        <Paragraph>
                          <strong>First Name:</strong>
                          <Input
                            value={address.firstName}
                            disabled
                            className="input-txt-dark"
                          />
                        </Paragraph>
                        <Paragraph>
                          <strong>Middle Name:</strong>
                          <Input
                            value={address.middleName}
                            disabled
                            className="input-txt-dark"
                          />
                        </Paragraph>
                        <Paragraph>
                          <strong>Last Name:</strong>
                          <Input
                            value={address.lastName}
                            disabled
                            className="input-txt-dark"
                          />
                        </Paragraph>
                        <Paragraph>
                          <strong>Street Address:</strong>
                          <Input
                            value={address.streetAddress}
                            disabled
                            className="input-txt-dark"
                          />
                        </Paragraph>
                        <Paragraph>
                          <strong>City:</strong>
                          <Input
                            value={address.city}
                            disabled
                            className="input-txt-dark"
                          />
                        </Paragraph>
                        <Paragraph>
                          <strong>State/Province:</strong>
                          <Input
                            value={address.stateOrProvince}
                            disabled
                            className="input-txt-dark"
                          />
                        </Paragraph>
                        <Paragraph>
                          <strong>Zip/Postal Code:</strong>
                          <Input
                            value={address.zipOrPostalCode}
                            disabled
                            className="input-txt-dark"
                          />
                        </Paragraph>
                        <Paragraph>
                          <strong>Country:</strong>
                          <Input
                            value={address.country}
                            disabled
                            className="input-txt-dark"
                          />
                        </Paragraph>
                        <Paragraph>
                          <strong>Phone Number:</strong>
                          <Input
                            value={address.phoneNumber}
                            disabled
                            className="input-txt-dark"
                          />
                        </Paragraph>
                        <Paragraph>
                          <strong>Company Name:</strong>
                          <Input
                            value={address.companyName}
                            disabled
                            className="input-txt-dark"
                          />
                        </Paragraph>
                      </div>
                    ))
                  ) : (
                    <p>No billing address available.</p>
                  )}
                </div>
              </Col>

              {/* Shipping Address Column */}
              <Col span={12}>
                <div className="address-column">
                  <Title level={4} style={{ fontWeight: "bold" }}>
                    Shipping Address
                  </Title>
                  {/* Loop through shipAdd array and display each address */}
                  {shipAdd.length > 0 ? (
                    shipAdd.map((address, index) => (
                      <div key={index}>
                        <Paragraph>
                          <strong>First Name:</strong>
                          <Input
                            value={address.firstName}
                            disabled
                            className="input-txt-dark"
                          />
                        </Paragraph>
                        <Paragraph>
                          <strong>Middle Name:</strong>
                          <Input
                            value={address.middleName}
                            disabled
                            className="input-txt-dark"
                          />
                        </Paragraph>
                        <Paragraph>
                          <strong>Last Name:</strong>
                          <Input
                            value={address.lastName}
                            disabled
                            className="input-txt-dark"
                          />
                        </Paragraph>
                        <Paragraph>
                          <strong>Street Address:</strong>
                          <Input
                            value={address.streetAddress}
                            disabled
                            className="input-txt-dark"
                          />
                        </Paragraph>
                        <Paragraph>
                          <strong>City:</strong>
                          <Input
                            value={address.city}
                            disabled
                            className="input-txt-dark"
                          />
                        </Paragraph>
                        <Paragraph>
                          <strong>State/Province:</strong>
                          <Input
                            value={address.stateOrProvince}
                            disabled
                            className="input-txt-dark"
                          />
                        </Paragraph>
                        <Paragraph>
                          <strong>Zip/Postal Code:</strong>
                          <Input
                            value={address.zipOrPostalCode}
                            disabled
                            className="input-txt-dark"
                          />
                        </Paragraph>
                        <Paragraph>
                          <strong>Country:</strong>
                          <Input
                            value={address.country}
                            disabled
                            className="input-txt-dark"
                          />
                        </Paragraph>
                        <Paragraph>
                          <strong>Phone Number:</strong>
                          <Input
                            value={address.phoneNumber}
                            disabled
                            className="input-txt-dark"
                          />
                        </Paragraph>
                        <Paragraph>
                          <strong>Company Name:</strong>
                          <Input
                            value={address.companyName}
                            disabled
                            className="input-txt-dark"
                          />
                        </Paragraph>
                      </div>
                    ))
                  ) : (
                    <p>No shipping address available.</p>
                  )}
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default AccountDashboard;

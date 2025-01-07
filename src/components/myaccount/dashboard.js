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
import Addresses from "../myaccount/addresses"; // Ensure you have the Addresses component imported
import { FaEnvelope, FaUserAlt, FaBox, FaEye } from "react-icons/fa"; // Add the FaEye icon for View
import { manageaddresses } from "../../utils/axios";
import axios from "axios";
import CustomLoader from "../clothingsection/loader";

const { Title, Paragraph } = Typography;

function AccountDashboard() {
  const user = JSON.parse(localStorage.getItem("user")); // Parse the user object
  const [isManageModalVisible, setIsManageModalVisible] = useState(false); // State to control manage modal visibility
  const [isViewModalVisible, setIsViewModalVisible] = useState(false); // State to control view modal visibility
  const [viewAddressData, setViewAddressData] = useState(null); // State for storing the address data for view modal
  const [addressData, setAddressData] = useState({}); // State to manage the address data input
  const [billAdd, setBillAdd] = useState(null); // To store API response
  const [shipAdd, setShipAdd] = useState(null); // To store API response
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [reload, setReload] = useState(false); // Error state

  const [form] = Form.useForm(); // Initialize the form instance here

  // Function to show the manage modal
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
  const userData = JSON.parse(localStorage.getItem("user"));
  const userid = userData?.id;

  const onFinish = (values) => {
    console.log("Form Values:", values);

    // Retrieve the user data from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));

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
            console.log(billAdd);
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
        <Title level={2} className="header-title">
          Account Information
        </Title>
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
              <FaBox /> Manage
            </Button>
            <Button
              type="default"
              className="view-addresses-btn"
              onClick={showViewModal}
              style={{ width: "100%" }}
            >
              <FaEye /> View
            </Button>
          </Card>
        </Col>
      </Row>

      {/* Modal for Managing Addresses */}
      <Modal
        title={
          <span
            style={{
              fontSize: "28px",
              width: "100%",
              fontFamily: "Space Grotesk",
            }}
          >
            Please Enter a Shipping & Billing Addresses
          </span>
        }
        visible={isManageModalVisible}
        onCancel={handleManageCancel}
        footer={[]}
        width={800} // Increased width to accommodate both sections
        className="address-modal"
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          {/* Shipping Address Section */}
          <Title level={4}>Shipping Address</Title>
          {/* First Name */}
          <Form.Item
            label="First Name"
            name="shippingFirstName"
            rules={[
              { required: true, message: "Please enter your first name!" },
            ]}
          >
            <Input />
          </Form.Item>
          {/* Middle Name */}
          <Form.Item label="Middle Name" name="shippingMiddleName">
            <Input />
          </Form.Item>
          {/* Last Name */}
          <Form.Item
            label="Last Name"
            name="shippingLastName"
            rules={[
              { required: true, message: "Please enter your last name!" },
            ]}
          >
            <Input />
          </Form.Item>
          {/* Street Address */}
          <Form.Item
            label="Street Address"
            name="shippingStreetAddress"
            rules={[
              { required: true, message: "Please enter your street address!" },
            ]}
          >
            <Input />
          </Form.Item>
          {/* City */}
          <Form.Item
            label="City"
            name="shippingCity"
            rules={[{ required: true, message: "Please enter your city!" }]}
          >
            <Input />
          </Form.Item>
          {/* State/Province */}
          <Form.Item label="State/Province" name="shippingState">
            <Input />
          </Form.Item>
          {/* Zip/Postal Code */}
          <Form.Item
            label="Zip/Postal Code"
            name="shippingZipCode"
            rules={[
              { required: true, message: "Please enter your zip/postal code!" },
            ]}
          >
            <Input />
          </Form.Item>
          {/* Country */}
          <Form.Item
            label="Country"
            name="shippingCountry"
            rules={[{ required: true, message: "Please enter your country!" }]}
          >
            <Input />
          </Form.Item>
          {/* Phone Number */}
          <Form.Item
            label="Phone Number"
            name="shippingPhoneNumber"
            rules={[
              { required: true, message: "Please enter your phone number!" },
            ]}
          >
            <Input />
          </Form.Item>
          {/* Company Name */}
          <Form.Item label="Company Name" name="shippingCompanyName">
            <Input />
          </Form.Item>
          <hr /> {/* Separator between Shipping and Billing */}
          {/* Billing Address Section */}
          <Title level={4}>Billing Address</Title>
          {/* First Name */}
          <Form.Item
            label="First Name"
            name="billingFirstName"
            rules={[
              { required: true, message: "Please enter your first name!" },
            ]}
          >
            <Input />
          </Form.Item>
          {/* Middle Name */}
          <Form.Item label="Middle Name" name="billingMiddleName">
            <Input />
          </Form.Item>
          {/* Last Name */}
          <Form.Item
            label="Last Name"
            name="billingLastName"
            rules={[
              { required: true, message: "Please enter your last name!" },
            ]}
          >
            <Input />
          </Form.Item>
          {/* Street Address */}
          <Form.Item
            label="Street Address"
            name="billingStreetAddress"
            rules={[
              { required: true, message: "Please enter your street address!" },
            ]}
          >
            <Input />
          </Form.Item>
          {/* City */}
          <Form.Item
            label="City"
            name="billingCity"
            rules={[{ required: true, message: "Please enter your city!" }]}
          >
            <Input />
          </Form.Item>
          {/* State/Province */}
          <Form.Item label="State/Province" name="billingState">
            <Input />
          </Form.Item>
          {/* Zip/Postal Code */}
          <Form.Item
            label="Zip/Postal Code"
            name="billingZipCode"
            rules={[
              { required: true, message: "Please enter your zip/postal code!" },
            ]}
          >
            <Input />
          </Form.Item>
          {/* Country */}
          <Form.Item
            label="Country"
            name="billingCountry"
            rules={[{ required: true, message: "Please enter your country!" }]}
          >
            <Input />
          </Form.Item>
          {/* Phone Number */}
          <Form.Item
            label="Phone Number"
            name="billingPhoneNumber"
            rules={[
              { required: true, message: "Please enter your phone number!" },
            ]}
          >
            <Input />
          </Form.Item>
          {/* Company Name */}
          <Form.Item label="Company Name" name="billingCompanyName">
            <Input />
          </Form.Item>
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
        title="View Address"
        visible={isViewModalVisible}
        onCancel={handleViewCancel}
        footer={null}
        width={800}
        className="view-address-modal"
      >
        {viewAddressData && (
          <Row gutter={16}>
            {/* Billing Address Column */}
            <Col span={12}>
              <div className="address-column">
                <Title level={4}>Billing Address</Title>
                {/* Loop through billAdd array and display each address */}
                {billAdd && billAdd.length > 0 ? (
                  billAdd.map((address, index) => (
                    <div key={index}>
                      <Paragraph>
                        <strong>First Name:</strong> {address.firstName}
                      </Paragraph>
                      <Paragraph>
                        <strong>Middle Name:</strong> {address.middleName}
                      </Paragraph>
                      <Paragraph>
                        <strong>Last Name:</strong> {address.lastName}
                      </Paragraph>
                      <Paragraph>
                        <strong>Street Address:</strong> {address.streetAddress}
                      </Paragraph>
                      <Paragraph>
                        <strong>City:</strong> {address.city}
                      </Paragraph>
                      <Paragraph>
                        <strong>State/Province:</strong>{" "}
                        {address.stateOrProvince}
                      </Paragraph>
                      <Paragraph>
                        <strong>Zip/Postal Code:</strong>{" "}
                        {address.zipOrPostalCode}
                      </Paragraph>
                      <Paragraph>
                        <strong>Country:</strong> {address.country}
                      </Paragraph>
                      <Paragraph>
                        <strong>Phone Number:</strong> {address.phoneNumber}
                      </Paragraph>
                      <Paragraph>
                        <strong>Company Name:</strong> {address.companyName}
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
                <Title level={4}>Shipping Address</Title>
                {/* Loop through billAdd array and display each address */}
                {shipAdd && shipAdd.length > 0 ? (
                  shipAdd.map((address, index) => (
                    <div key={index}>
                      <Paragraph>
                        <strong>First Name:</strong> {address.firstName}
                      </Paragraph>
                      <Paragraph>
                        <strong>Middle Name:</strong> {address.middleName}
                      </Paragraph>
                      <Paragraph>
                        <strong>Last Name:</strong> {address.lastName}
                      </Paragraph>
                      <Paragraph>
                        <strong>Street Address:</strong> {address.streetAddress}
                      </Paragraph>
                      <Paragraph>
                        <strong>City:</strong> {address.city}
                      </Paragraph>
                      <Paragraph>
                        <strong>State/Province:</strong>{" "}
                        {address.stateOrProvince}
                      </Paragraph>
                      <Paragraph>
                        <strong>Zip/Postal Code:</strong>{" "}
                        {address.zipOrPostalCode}
                      </Paragraph>
                      <Paragraph>
                        <strong>Country:</strong> {address.country}
                      </Paragraph>
                      <Paragraph>
                        <strong>Phone Number:</strong> {address.phoneNumber}
                      </Paragraph>
                      <Paragraph>
                        <strong>Company Name:</strong> {address.companyName}
                      </Paragraph>
                    </div>
                  ))
                ) : (
                  <p>No shipping address available.</p>
                )}
              </div>
            </Col>
          </Row>
        )}
      </Modal>
    </div>
  );
}

export default AccountDashboard;

import React, { useState } from "react";
import "./dashboard.css";
import { Card, Button, Modal, Typography, Row, Col } from "antd";
import Addresses from "../myaccount/addresses"; // Ensure you have the Addresses component imported
import { FaEnvelope, FaUserAlt, FaBox, FaEye } from "react-icons/fa"; // Add the FaEye icon for View

const { Title, Paragraph } = Typography;

function AccountDashboard() {
  const user = JSON.parse(localStorage.getItem("user")); // Parse the user object
  const [isManageModalVisible, setIsManageModalVisible] = useState(false); // State to control manage modal visibility
  const [isViewModalVisible, setIsViewModalVisible] = useState(false); // State to control view modal visibility
  const [viewAddressData, setViewAddressData] = useState(null); // State for storing the address data for view modal

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

  return (
    <div className="dashboard-container">
      <div className="header">
        <Title level={2} className="header-title">Account Information</Title>
      </div>

      <Row gutter={[16, 24]} justify="space-between">
        {/* Contact Information Card */}
        <Col xs={24} sm={12} md={8}>
          <Card className="user-card" title={<div className="card-title"><FaUserAlt /> Contact Information</div>}>
            <Paragraph>Name: {user?.name || "No Username"}</Paragraph>
            <Paragraph>Email: {user?.email || "No Email"}</Paragraph>
          </Card>
        </Col>

        {/* Newsletter Subscription Card */}
        <Col xs={24} sm={12} md={8}>
          <Card className="newsletter-card" title={<div className="card-title"><FaEnvelope /> Newsletters</div>}>
            <Paragraph>You aren't subscribed to our newsletter.</Paragraph>
          </Card>
        </Col>

        {/* Manage Addresses Card */}
        <Col xs={24} sm={12} md={8}>
          <Card className="manage-addresses-card" title={<div className="card-title"><FaBox /> Manage Addresses</div>}>
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
        title="Manage Addresses"
        visible={isManageModalVisible}
        onCancel={handleManageCancel}
        footer={null}
        width={600}
        className="address-modal"
      >
        <Addresses />
      </Modal>

      {/* Modal for Viewing Address */}
      <Modal
        title="View Address"
        visible={isViewModalVisible}
        onCancel={handleViewCancel}
        footer={null}
        width={800}  // Increase width for better view of two columns
        className="view-address-modal"
      >
        {viewAddressData && (
          <Row gutter={16}>
            {/* Billing Address Column */}
            <Col span={12}>
              <div className="address-column">
                <Title level={4}>Billing Address</Title>
                <Paragraph><strong>First Name:</strong> {viewAddressData.billing.firstName}</Paragraph>
                <Paragraph><strong>Middle Name:</strong> {viewAddressData.billing.middleName}</Paragraph> {/* Added Middle Name */}
                <Paragraph><strong>Last Name:</strong> {viewAddressData.billing.lastName}</Paragraph>
                <Paragraph><strong>Street Address:</strong> {viewAddressData.billing.streetAddress}</Paragraph>
                <Paragraph><strong>City:</strong> {viewAddressData.billing.city}</Paragraph>
                <Paragraph><strong>State/Province:</strong> {viewAddressData.billing.state}</Paragraph>
                <Paragraph><strong>Zip/Postal Code:</strong> {viewAddressData.billing.zipCode}</Paragraph>
                <Paragraph><strong>Country:</strong> {viewAddressData.billing.country}</Paragraph>
                <Paragraph><strong>Phone Number:</strong> {viewAddressData.billing.phoneNumber}</Paragraph> {/* Added phone number */}
                <Paragraph><strong>Company Name:</strong> {viewAddressData.billing.companyName}</Paragraph> {/* Added company name */}
              </div>
            </Col>

            {/* Shipping Address Column */}
            <Col span={12}>
              <div className="address-column">
                <Title level={4}>Shipping Method</Title>
                <Paragraph><strong>First Name:</strong> {viewAddressData.shipping.firstName}</Paragraph>
                <Paragraph><strong>Middle Name:</strong> {viewAddressData.shipping.middleName}</Paragraph> {/* Added Middle Name */}
                <Paragraph><strong>Last Name:</strong> {viewAddressData.shipping.lastName}</Paragraph>
                <Paragraph><strong>Street Address:</strong> {viewAddressData.shipping.streetAddress}</Paragraph>
                <Paragraph><strong>City:</strong> {viewAddressData.shipping.city}</Paragraph>
                <Paragraph><strong>State/Province:</strong> {viewAddressData.shipping.state}</Paragraph>
                <Paragraph><strong>Zip/Postal Code:</strong> {viewAddressData.shipping.zipCode}</Paragraph>
                <Paragraph><strong>Country:</strong> {viewAddressData.shipping.country}</Paragraph>
                <Paragraph><strong>Phone Number:</strong> {viewAddressData.shipping.phoneNumber}</Paragraph> {/* Added phone number for shipping */}
                <Paragraph><strong>Company Name:</strong> {viewAddressData.shipping.companyName}</Paragraph> {/* Added company name for shipping */}
              </div>
            </Col>
          </Row>
        )}
      </Modal>
    </div>
  );
}

export default AccountDashboard;

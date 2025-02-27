import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Row, Col } from "antd";
import { manageaddresses } from "../../utils/axios"; // Make sure you have a correct API call in this utility
import "./updatemodal.css";
import { useAuth } from "../../context/authcontext";

function Updatemodal1({ setModalVisible }) {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [countryCode, setCountryCode] = useState("1");

  const onFinish = async (values) => {
    console.log("Form Values:", values);

    const userData = user;
    const token = localStorage.getItem("token");
    const addressId = localStorage.getItem("addressid");

    if (!addressId) {
      message.error("Address ID is missing or invalid.");
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`, // Add token to Authorization header
      "Content-Type": "application/json",
    };

    const data1 = {
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

    // If the address exists in localStorage, update the correct one
    const updatedAddresses = existingData.map((address) => {
      if (address.userId === userData.id && address._id === addressId) {
        // Update the address data
        return { ...address, ...data1 };
      }
      return address;
    });
    console.log(addressId);
    try {
      // Send the PATCH request to update the address
      const response = await manageaddresses.patch(
        `${addressId}`, // The URL with the valid addressId
        data1, // The data to update the address with
        { headers } // Send the headers as part of the request
      );

      console.log("API Response:", response);
      message.success("Thank you for updating your address!");

      // Store the updated addresses in localStorage
      localStorage.setItem("userAddresses", JSON.stringify(updatedAddresses));

      // Set a flag that the user has submitted their address
      localStorage.setItem(`addressSubmitted_${userData.id}`, true);

      // Reset the form
      form.resetFields();

      // Close the modal after successful update
      setModalVisible(false); // Close the modal here
      window.location.reload(); // This will reload the page
    } catch (error) {
      console.error("Error updating address:", error);
      message.error("Something went wrong, please try again!");
    }
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

  return (
    <div style={{ width: "100%", maxWidth: "2400px", margin: "0 auto" }}>
      {/* Directly display the form without modal */}
      <Form form={form} onFinish={onFinish} layout="vertical">
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
            Please Update Your Addresses
          </p>
        </div>

        {/* Row for Shipping and Billing Address */}
        <Row gutter={24}>
          {/* Shipping Address Column */}
          <Col span={12}>
            <h3 style={{ fontWeight: "bold" }}>Shipping Address</h3>
            <Form.Item
              name="shippingFirstName"
              label="First Name"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input className="input-txt-dark" />
            </Form.Item>
            <Form.Item name="shippingMiddleName" label="Middle Name">
              <Input className="input-txt-dark" />
            </Form.Item>
            <Form.Item
              name="shippingLastName"
              label="Last Name"
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
            >
              <Input className="input-txt-dark" />
            </Form.Item>
            <Form.Item
              name="shippingStreetAddress"
              label="Street Address"
              rules={[
                {
                  required: true,
                  message: "Please input your street address!",
                },
              ]}
            >
              <Input className="input-txt-dark" />
            </Form.Item>
            <Form.Item
              name="shippingCity"
              label="City"
              rules={[{ required: true, message: "Please input your city!" }]}
            >
              <Input className="input-txt-dark" />
            </Form.Item>
            <Form.Item
              name="shippingState"
              label="State/Province"
              rules={[
                {
                  required: true,
                  message: "Please input your state or province!",
                },
              ]}
            >
              <Input className="input-txt-dark" />
            </Form.Item>
            <Form.Item
              name="shippingZipCode"
              label="Zip/Postal Code"
              rules={[
                { required: true, message: "Please input your zip code!" },
              ]}
            >
              <Input className="input-txt-dark" />
            </Form.Item>
            <Form.Item
              name="shippingCountry"
              label="Country"
              rules={[
                { required: true, message: "Please input your country!" },
              ]}
            >
              <Input className="input-txt-dark" />
            </Form.Item>
            <Form.Item
              name="shippingPhoneNumber"
              label="Phone Number"
              rules={[
                { required: true, message: "Please input your phone number!" },
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
            <Form.Item name="shippingCompanyName" label="Company Name">
              <Input className="input-txt-dark" />
            </Form.Item>
          </Col>

          {/* Billing Address Column */}
          <Col span={12}>
            <h3 style={{ fontWeight: "bold" }}>Billing Address</h3>
            <Form.Item
              name="billingFirstName"
              label="First Name"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input className="input-txt-dark" />
            </Form.Item>
            <Form.Item name="billingMiddleName" label="Middle Name">
              <Input className="input-txt-dark" />
            </Form.Item>
            <Form.Item
              name="billingLastName"
              label="Last Name"
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
            >
              <Input className="input-txt-dark" />
            </Form.Item>
            <Form.Item
              name="billingStreetAddress"
              label="Street Address"
              rules={[
                {
                  required: true,
                  message: "Please input your street address!",
                },
              ]}
            >
              <Input className="input-txt-dark" />
            </Form.Item>
            <Form.Item
              name="billingCity"
              label="City"
              rules={[{ required: true, message: "Please input your city!" }]}
            >
              <Input className="input-txt-dark" />
            </Form.Item>
            <Form.Item
              name="billingState"
              label="State/Province"
              rules={[
                {
                  required: true,
                  message: "Please input your state or province!",
                },
              ]}
            >
              <Input className="input-txt-dark" />
            </Form.Item>
            <Form.Item
              name="billingZipCode"
              label="Zip/Postal Code"
              rules={[
                { required: true, message: "Please input your zip code!" },
              ]}
            >
              <Input className="input-txt-dark" />
            </Form.Item>
            <Form.Item
              name="billingCountry"
              label="Country"
              rules={[
                { required: true, message: "Please input your country!" },
              ]}
            >
              <Input className="input-txt-dark" />
            </Form.Item>
            <Form.Item
              name="billingPhoneNumber"
              label="Phone Number"
              rules={[
                { required: true, message: "Please input your phone number!" },
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
            <Form.Item name="billingCompanyName" label="Company Name">
              <Input className="input-txt-dark" />
            </Form.Item>
          </Col>
        </Row>

        {/* Submit button */}
        <Form.Item>
          <div style={{ textAlign: "center" }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: "1rem" }}
            >
              Update Address
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Updatemodal1;

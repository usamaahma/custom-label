import "./addresses.css";
import { Col, Row, Button, Form, Input, Select } from "antd";

const { Option } = Select;

function Addresses() {
  return (
    <div className="addresses-container">
      {/* Billing Address Section */}
      <div className="address-section">
        <p className="section-title" style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>Billing Address</p>
        <Form layout="vertical">
          {/* Billing First Name */}
          <Form.Item
            label="First Name"
            name="billfirstname"
            rules={[{ required: true, message: "Please enter your first name!" }]}
          >
            <Input placeholder="Enter your first name" />
          </Form.Item>

          {/* Billing Middle Name */}
          <Form.Item
            label="Middle Name"
            name="billmiddlename"
            rules={[{ required: false }]} // Not required
          >
            <Input placeholder="Enter your middle name" />
          </Form.Item>

          {/* Billing Last Name */}
          <Form.Item
            label="Last Name"
            name="billlastname"
            rules={[{ required: true, message: "Please enter your last name!" }]}
          >
            <Input placeholder="Enter your last name" />
          </Form.Item>

          {/* Billing Phone Number */}
          <Form.Item
            label="Phone Number"
            name="billphonenumber"
            rules={[{ required: true, message: "Please enter your phone number!" }]}
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item>

          {/* Billing Company Name */}
          <Form.Item
            label="Company Name"
            name="billcompanyname"
            rules={[{ required: false }]} // Not required
          >
            <Input placeholder="Enter your company name" />
          </Form.Item>

          {/* Billing Street Address */}
          <Form.Item
            label="Street Address"
            name="billaddress"
            rules={[{ required: true, message: "Please enter your street address!" }]}
          >
            <Input placeholder="Enter your street address" />
          </Form.Item>

          {/* Billing City */}
          <Form.Item
            label="City"
            name="billcity"
            rules={[{ required: true, message: "Please enter your city!" }]}
          >
            <Input placeholder="Enter your city" />
          </Form.Item>

          {/* Billing State/Province */}
          <Form.Item
            label="State/Province"
            name="billstate"
            rules={[{ required: true, message: "Please select your state/province!" }]}
          >
            <Select placeholder="Select your state/province">
              <Option value="california">California</Option>
              <Option value="ontario">Ontario</Option>
              <Option value="london">London</Option>
              <Option value="new-south-wales">New South Wales</Option>
            </Select>
          </Form.Item>

          {/* Billing Zip/Postal Code */}
          <Form.Item
            label="Zip/Postal Code"
            name="billzipcode"
            rules={[{ required: true, message: "Please enter your zip code!" }]}
          >
            <Input placeholder="Enter your zip code" />
          </Form.Item>

          {/* Billing Country */}
          <Form.Item
            label="Country"
            name="billcountry"
            rules={[{ required: true, message: "Please select your country!" }]}
          >
            <Select placeholder="Select your country">
              <Option value="usa">United States</Option>
              <Option value="canada">Canada</Option>
              <Option value="uk">United Kingdom</Option>
              <Option value="australia">Australia</Option>
            </Select>
          </Form.Item>
        </Form>
      </div>

      {/* Shipping Address Section */}
      <div className="address-section">
        <p className="section-title" style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>Shipping Method</p>
        <Form layout="vertical">
          {/* Shipping First Name */}
          <Form.Item
            label="First Name"
            name="shipFirstName"
            rules={[{ required: true, message: "Please enter your first name!" }]}
          >
            <Input placeholder="Enter your first name" />
          </Form.Item>

          {/* Shipping Middle Name */}
          <Form.Item
            label="Middle Name"
            name="shipMiddleName"
            rules={[{ required: false }]} // Not required
          >
            <Input placeholder="Enter your middle name" />
          </Form.Item>

          {/* Shipping Last Name */}
          <Form.Item
            label="Last Name"
            name="shipLastName"
            rules={[{ required: true, message: "Please enter your last name!" }]}
          >
            <Input placeholder="Enter your last name" />
          </Form.Item>

          {/* Shipping Phone Number */}
          <Form.Item
            label="Phone Number"
            name="shipPhoneNumber"
            rules={[{ required: true, message: "Please enter your phone number!" }]}
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item>

          {/* Shipping Company Name */}
          <Form.Item
            label="Company Name"
            name="shipCompanyName"
            rules={[{ required: false }]} // Not required
          >
            <Input placeholder="Enter your company name" />
          </Form.Item>

          {/* Shipping Street Address */}
          <Form.Item
            label="Street Address"
            name="shipStreetAddress"
            rules={[{ required: true, message: "Please enter your street address!" }]}
          >
            <Input placeholder="Enter your street address" />
          </Form.Item>

          {/* Shipping City */}
          <Form.Item
            label="City"
            name="shipCity"
            rules={[{ required: true, message: "Please enter your city!" }]}
          >
            <Input placeholder="Enter your city" />
          </Form.Item>

          {/* Shipping State/Province */}
          <Form.Item
            label="State/Province"
            name="shipState"
            rules={[{ required: true, message: "Please select your state/province!" }]}
          >
            <Select placeholder="Select your state/province">
              <Option value="california">California</Option>
              <Option value="ontario">Ontario</Option>
              <Option value="london">London</Option>
              <Option value="new-south-wales">New South Wales</Option>
            </Select>
          </Form.Item>

          {/* Shipping Zip/Postal Code */}
          <Form.Item
            label="Zip/Postal Code"
            name="shipZipCode"
            rules={[{ required: true, message: "Please enter your zip code!" }]}
          >
            <Input placeholder="Enter your zip code" />
          </Form.Item>

          {/* Shipping Country */}
          <Form.Item
            label="Country"
            name="shipCountry"
            rules={[{ required: true, message: "Please select your country!" }]}
          >
            <Select placeholder="Select your country">
              <Option value="usa">United States</Option>
              <Option value="canada">Canada</Option>
              <Option value="uk">United Kingdom</Option>
              <Option value="australia">Australia</Option>
            </Select>
          </Form.Item>

          <div className="form-actions">
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Save Address
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Addresses;

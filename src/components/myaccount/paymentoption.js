import React from "react";
import { Col, Row, Button, Form, Input, Select } from "antd";
import { useAuth } from "../../context/authcontext";

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const { Option } = Select;
const country = [
  "Alberta",
  "British Columbia",
  "California",
  "New York",
  "Ontario",
  "Texas",
  // Add more as needed
];

function PaymentOptions() {
  const { user } = useAuth();
  const userdata = user;

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <Row flex justify={"space-evenly"}>
        <Col>
          <h4 style={{ marginBottom: "2rem" }}>
            Credit Card (Authorize.Net CIM)
          </h4>
        </Col>
        <Col>
          <h4>Add A Credit Card</h4>
          <h6>Cardholder Information</h6>
          <Form
            name="contact"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{
              email: userdata?.email, // Optionally set initial value for email
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              className="formitem-address"
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              className="formitem-address"
              label="Company"
              name="company"
              rules={[
                { required: true, message: "Please input your Company!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              className="formitem-address"
              label="Phone Number"
              name="phonenumber"
              rules={[
                { required: true, message: "Please input your Phone Number!" },
              ]}
            >
              <Input />
            </Form.Item>
            <br />
            <h6>Cardholder Information</h6>
            <br />
            <Form.Item
              className="formitem-address"
              label="Street Address"
              name="streetAddress"
              rules={[
                {
                  required: true,
                  message: "Please input your street address!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              className="formitem-address"
              label="City"
              name="city"
              rules={[{ required: true, message: "Please input your city!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              className="formitem-address"
              label="State/Province "
              name="state"
              rules={[
                {
                  required: true,
                  message: "Please input your State/Province !",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              className="formitem-address"
              label="Postal Code"
              name="postalCode"
              rules={[
                { required: true, message: "Please input your postal code!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              className="formitem-address"
              label="Country"
              name="country"
              rules={[
                {
                  required: true,
                  message: "Please select your Country!",
                },
              ]}
            >
              <Select
                placeholder="Select your country"
                allowClear
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {country.map((state) => (
                  <Option key={state} value={state}>
                    {state}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button htmlType="submit" className="submit-button">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default PaymentOptions;

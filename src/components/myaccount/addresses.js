import "./addresses.css";
import { Col, Row, Button, Form, Input, Select } from "antd";

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

const style = {
  padding: "8px 0",
};

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function Addresses() {
  return (
    <div className="addresses-container">
      <h2>Shipping Address</h2>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} className="gutter-row">
          <div style={style}>
            <p className="form-title">Contact Information</p>
            <Form
              name="contact"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                className="formitem-address"
                label="User Name"
                name="username"
                rules={[
                  { required: true, message: "Please input your User name!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                className="formitem-address"
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
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
                  {
                    required: true,
                    message: "Please input your Phone Number!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item wrapperCol={{ span: 24 }}>
                <Button htmlType="submit" className="submit-button">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>

        <Col xs={24} md={12} className="gutter-row">
          <div style={style}>
            <p className="form-title">Address</p>
            <Form
              name="address"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
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
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Addresses;

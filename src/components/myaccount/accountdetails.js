import React from "react";
import { Button, Form, Input } from "antd";

    const onFinish = (values) => {
    console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    };

function AccountDetails() {
  const user = JSON.parse(localStorage.getItem("user")); // Parse the user object

  return (
    <div>
      <div style={{ width: "60%", margin: "0 auto" }}>
        <h4>Account Details & Password Change</h4>
        <Form
          name="contact"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          initialValues={{
            username: user?.email, // Set initial value for username here
            email: user?.email, // Optionally set initial value for email
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            className="formitem-address"
            label="Update Username"
            name="username" // Field name for form submission
            rules={[
              { required: true, message: "Please input your User name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            className="formitem-address"
            label="Update Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            className="formitem-address"
            label="Update Password"
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password /> {/* Use Input.Password for better security */}
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button htmlType="submit" className="submit-button">
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default AccountDetails;

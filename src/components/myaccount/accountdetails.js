import React from "react";
import { Button, Form, Input, message } from "antd";

const onFinish = (values) => {
  console.log("Success:", values);

  const { password, confirmPassword } = values;

  // Check if password and confirmPassword match
  if (password !== confirmPassword) {
    message.error("The two passwords do not match!");
    return;
  }

  // Password reset logic can be added here or called as per your need
  message.success("Password reset successfully!");
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
          name="accountDetails"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          initialValues={{
            email: user?.email, // Set initial value for email
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* Display email (non-editable) */}
          <Form.Item
            className="formitem-address"
            label="Email"
            name="email"
          >
            <Input value={user?.email} readOnly /> {/* Email field is non-editable */}
          </Form.Item>

          {/* Reset Password */}
          <Form.Item
            className="formitem-address"
            label="Reset Password"
            name="password"
            rules={[
              { required: true, message: "Please input your Password!" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password /> {/* Input for new password */}
          </Form.Item>

          {/* Re-enter Password */}
          <Form.Item
            className="formitem-address"
            label="Re-enter Password"
            name="confirmPassword"
            rules={[
              { required: true, message: "Please re-enter your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("The two passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button htmlType="submit" className="submit-button">
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default AccountDetails;

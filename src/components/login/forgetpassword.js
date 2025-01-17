import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import './forgetpassword.css'; // Import your custom styles
import { forgetPassword } from "../../utils/axios";

function ForgotPassword1() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
  
    try {
      const response = await forgetPassword.post("/", { email });
      console.log(response); 
      message.success(response.data.message); 
    } catch (err) {
      message.error("Failed to send password reset email. Please try again.");
      console.error(err); 
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="forgot-password-wrapper">
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        <Form onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }, { type: "email", message: "Please enter a valid email!" }]}
          >
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="forgot-password-input"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} className="forgot-password-btn">
              Send Reset Link
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default ForgotPassword1;

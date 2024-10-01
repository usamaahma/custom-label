import React, { useState } from "react";
import { Form, Input, Button, Alert } from 'antd';
import { Link } from "react-router-dom";
import "./loginregister.css";

function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validatePassword = (password) => {
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return password.length >= 8 && specialCharacterRegex.test(password);
  };

  const handleSubmit = (values) => {
    const { email, password } = values;
    console.log(values);
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long and include a special character.');
      return;
    }

    // Handle login logic here
    setError('');
    alert(`Logged in successfully! Email: ${email}`);
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2 className="login-title">Sign In</h2>

        <Form
          className="login-form"
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input className="inputs" placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              className="inputs"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          {error && <Alert message={error} type="error" style={{ marginBottom: '16px' }} />}

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-button">
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <div className="login-options">
          <Button className="login-social-button login-google-button">
            Continue with Google
          </Button>
          <Button className="login-social-button login-facebook-button">
            Continue with Facebook
          </Button>
        </div>

        <p className="login-text">
          <Link to="/forgot-password" className="forgot-text">
            Forgot password?
          </Link>
        </p>
        <p className="login-text">
          No account yet?{" "}
          <Link to="/create-account" className="login-create-account">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

// Login Component
import React, { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { Link, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/authcontext";
import { login } from "../../utils/axios"; // Import the login API function
import "./loginregister.css";

function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false); // State for redirect
  const { login: loginUser } = useAuth();

  const validatePassword = (password) => {
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return password.length >= 8 && specialCharacterRegex.test(password);
  };

  const handleSubmit = async (values) => {
    const { email, password } = values;

    // Validate password
    if (!validatePassword(password)) {
      toast.error(
        "Password must be at least 8 characters long and include a special character."
      );
      return;
    }

    try {
      // API Call for login
      const response = await login.post("/login", { email, password });
      loginUser(response.data.user); // Use the login function from AuthContext to set the user
      toast.success(`Logged in successfully!`);

      // Redirect after a brief delay to allow the toast to be seen
      setTimeout(() => {
        setRedirect(true); // Set redirect to true on successful login
      }, 2000); // 2000 milliseconds = 2 seconds
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      toast.error("Login failed. Please check your credentials.");
      console.error(err);
    }
  };

  if (redirect) {
    return <Navigate to="/my-account" />;
  }

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="login-form-container">
        <h2 className="login-title">Sign In</h2>

        <Form className="login-form" onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input className="inputs" placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              className="inputs"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          {error && (
            <Alert
              message={error}
              type="error"
              style={{ marginBottom: "16px" }}
            />
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" className="create-button">
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

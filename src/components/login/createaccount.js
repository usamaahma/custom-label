import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, notification,message } from "antd";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { register,newsletteremail } from "../../utils/axios";
import { google } from "../../utils/axios";
import { jwtDecode } from "jwt-decode";
import "./createaccount.css";

function Create() {
  const [form] = Form.useForm();

  const validatePassword = (password) => {
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return password.length >= 8 && specialCharacterRegex.test(password);
  };

  const onFinish = async (values) => {
    const { password, confirmPassword, name, phone, email } = values;

    if (!validatePassword(password)) {
      notification.error({
        message: "Password Error",
        description:
          "Password must be at least 8 characters long and include a special character.",
      });
      return;
    }

    if (password !== confirmPassword) {
      notification.error({
        message: "Password Error",
        description: "Passwords do not match.",
      });
      return;
    }

    const requestData = {
      email,
      password,
      name,
      phonenumber: phone,
      role: "user",
    };

    try {
      const response = await register.post("/register", requestData);
      if (response.status === 201) {
        notification.success({
          message: "Account Created",
          description: "Your account has been created successfully.",
        });
        form.resetFields();
      }
    } catch (error) {
      notification.error({
        message: "Registration Error",
        description: "Error creating your account. Please try again.",
      });
    }
    const data1 = {
      email: values.email,
    };

    newsletteremail({
      method: "post",
      data: data1,
    })
      .then((response) => {
        console.log("API Response:", response); // Log the entire response to inspect it

        if (
          response.data &&
          response.data.message === "Email already subscribed"
        ) {
          message.info("You already subscribed, thank you!");
        } else {
          message.success("You have successfully subscribed!");
        }
      })
      .catch((error) => {
        console.log("API Error:", error); // Log the API error to the console

        if (error.response) {
          // Handle error based on server response status
          if (error.response.status === 400) {
            if (error.response.data.message === "Email already subscribed") {
              message.warning("You already subscribed, thank you!");
            } else {
              message.error("Something went wrong, please try again!");
            }
          } else {
            // Handle other error statuses
            message.error("Something went wrong, please try again!");
          }
        } else if (error.request) {
          // Handle network error
          console.log("No response received from the API");
          message.error("Network error, please try again later.");
        } else {
          // General error
          console.log("Error during request setup", error.message);
          message.error("Something went wrong, please try again!");
        }
      });
  };

  
  const handleGoogleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    const userInfo = jwtDecode(token); // Decode JWT to get user info
  
    const requestData = {
      email: userInfo.email,
      name: userInfo.name,
      googleId: userInfo.sub,
      role: "user",
    };
  
    try {
      const response = await google.post("/register/google", requestData);
      if (response.status === 201) {
        notification.success({
          message: "Google Account Linked",
          description: "You are registered using Google!",
        });
      }
    } catch (error) {
      notification.error({
        message: "Google Registration Error",
        description: "Error registering via Google. Try again later.",
      });
    }
  };
  
  return (
    <GoogleOAuthProvider clientId="421180583946-i2gkvkdsg8pptarbune4p29hssqckq1g.apps.googleusercontent.com">
      <div className="create-container">
        <div className="create-form-container">
          <h2 className="create-title">Create an Account</h2>
          <Form
            form={form}
            name="create-account"
            className="create-form"
            onFinish={onFinish}
            initialValues={{ remember: true }}
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input placeholder="Name" className="create-input" />
            </Form.Item>

            <Form.Item
              name="phone"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input
                placeholder="Phone Number"
                className="create-input"
                maxLength="11"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input placeholder="Email" className="create-input" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 8, message: "Password must be at least 8 characters." },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Password" className="create-input" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match!")
                    );
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password
                placeholder="Confirm Password"
                className="create-input"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="create-button"
              >
                Create an Account
              </Button>
            </Form.Item>
          </Form>

          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              notification.error({
                message: "Google Login Error",
                description: "Unable to authenticate with Google.",
              });
            }}
          />

          <p className="signup-prompt">
            Do you have an account?{" "}
            <Link className="SIGN-UP-TEXT" to="/login">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Create;

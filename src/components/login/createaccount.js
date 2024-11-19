import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { Form, Input, Button, notification } from "antd";
import { register } from "../../utils/axios"; // Import your axios instance
import "./createaccount.css";

function Create() {
  const [captchaValue, setCaptchaValue] = useState(null);
  const [form] = Form.useForm(); // Create a reference to the form instance

  const validatePassword = (password) => {
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return password.length >= 8 && specialCharacterRegex.test(password);
  };

  const onCaptchaChange = (value) => {
    setCaptchaValue(value);
    console.log("Captcha value:", value); // This will give you the token value
  };

  const onFinish = async (values) => {
    const { password, confirmPassword, name, phone, email } = values;

    // Password validation
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
        description:
          "Passwords do not match. Please enter the correct password.",
      });
      return;
    }

    if (!captchaValue) {
      notification.error({
        message: "Captcha Error",
        description: "Please verify that you are not a robot.",
      });
      return;
    }

    // Prepare data for the API call
    const requestData = {
      email,
      password,
      name,
      phonenumber: phone,
      role: "user", // Adjust if you have other roles
    };

    try {
      // Call the register API
      const response = await register.post("/register", requestData);

      // Handle successful registration
      if (response.status === 201) {
        // Success notification
        notification.success({
          message: "Account Created Successfully",
          description: "Your account has been created successfully.",
        });

        // Reset the form fields after successful registration
        form.resetFields(); // Reset all fields in the form

        // Optionally, redirect to login or another page
      }
    } catch (error) {
      // Handle error
      console.error("Error during registration:", error);
      notification.error({
        message: "Registration Error",
        description:
          "There was an error while creating your account. Please try again later.",
      });
    }
  };

  return (
    <div className="create-container">
      <div className="create-form-container">
        <h2 className="create-title">Create an Account</h2>
        <Form
          form={form} // Add form reference here
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
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
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

          {/* Include the ReCAPTCHA component here */}
          <Form.Item
            name="captcha"
            rules={[
              {
                required: true,
                message: "Please verify that you are not a robot!",
              },
            ]}
          >
            <ReCAPTCHA
              sitekey="6LchFVQqAAAAAGiEtOkCRUt6e1z6oZiy4Uoh5DfI" // Use your actual reCAPTCHA v3 site key here
              onChange={onCaptchaChange}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="create-button">
              Create an Account
            </Button>
          </Form.Item>
        </Form>

        <p className="signup-prompt">
          Do you have an account?{" "}
          <Link className="SIGN-UP-TEXT" to="/login">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Create;

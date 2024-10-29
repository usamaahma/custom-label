import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import "./createaccount.css";

function Create() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);

  const validatePassword = (password) => {
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return password.length >= 8 && specialCharacterRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long and include a special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please enter the correct password.");
      return;
    }

    if (!captchaValue) {
      setError("Please verify that you are not a robot.");
      return;
    }

    // Handle account creation logic here
    setError("");
    alert("Account created successfully!");
  };

  const onCaptchaChange = (value) => {
    setCaptchaValue(value);
    console.log("Captcha value:", value); // This will give you the token value
  };

  return (
    <div className="create-container">
      <div className="create-form-container">
        <h2 className="create-title">Create an Account</h2>

        <form className="create-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            className="create-input"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className="create-input"
            required
          />
          <input
            type="number"
            placeholder="Phone Number"
            className="create-input"
            maxLength="11"

            required
          />
          <input
            type="email"
            placeholder="Email"
            className="create-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="create-input"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="create-input"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && <div className="error-message">{error}</div>}

          {/* Include the ReCAPTCHA component here */}
          <ReCAPTCHA
            sitekey="6LchFVQqAAAAAGiEtOkCRUt6e1z6oZiy4Uoh5DfI" // Use your actual reCAPTCHA v3 site key here
            onChange={onCaptchaChange}
          />

          <button type="submit" className="create-button">
            Create an Account
          </button>
        </form>

        <p className="signup-prompt">
          Do you have an account?{" "}
          <Link className="SIGN-UP-TEXT" to="/login">
            Sign In
          </Link>
        </p>
      </div>
      <style>{`
        .grecaptcha-badge {
          visibility: hidden;
        }
      `}</style>
    </div>
  );
}

export default Create;

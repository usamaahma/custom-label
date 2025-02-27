import React, { useState } from "react";
import "./accountdetails.css";
import { resetpassword } from "../../utils/axios";
import { useAuth } from "../../context/authcontext";

const AccountDetails = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const userData = user;
  const userId = userData?.id;
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming you have a route like 'resetpassword' for password reset
      const response = await resetpassword.post(`/${userId}`, {
        currentPassword,
        newPassword,
      });

      if (response.status === 200) {
        setMessage("Password reset successfully!");
        setCurrentPassword("");
        setNewPassword("");
      } else {
        setMessage("Failed to reset password");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="account-details-container">
      <h2 className="account-title">Reset Your Password</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="account-form">
        <div className="form-group">
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="input-field"
          />
        </div>

        <button type="submit" className="submit-btn">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default AccountDetails;

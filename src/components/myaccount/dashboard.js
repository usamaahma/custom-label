import React from "react";
import "./dashboard.css";
import { Card } from "antd";

function AccountDashboard() {
  const user = JSON.parse(localStorage.getItem("user")); // Parse the user object
  return (
    <div>
      <p className="dash-p op">Account Information</p>
      <div className="dash-first-card">
        <Card title="Contact Information" className="card-dash">
          <p>Name: {user?.userName || "No Username"}</p>
          <p>Email: {user?.email || "No Email"}</p>
          <div
            className="card-footer"
            style={{
              borderTop: "1px solid #f0f0f0",
              marginTop: "1rem",
              paddingTop: "1rem",
            }}
          ></div>
        </Card>
        <Card title="Newsletters" className="card-dash">
          <p>You aren't subscribed to our newsletter.</p>
          <div
            className="card-footer"
            style={{
              borderTop: "1px solid #f0f0f0",
              marginTop: "1rem",
              paddingTop: "1rem",
            }}
          ></div>
        </Card>
      </div>
      <br />
      <div className="dash-gap-between">
        {" "}
        <p className="dash-p">Address Book</p>
        <p className="dash-p-manage">Manage Addresses</p>
      </div>
      <div className="dash-first-card">
        <Card title="Default Billing Address" className="card-dash">
          <p>You have not set a default billing address.</p>
          <div
            className="card-footer"
            style={{
              borderTop: "1px solid #f0f0f0",
              marginTop: "1rem",
              paddingTop: "1rem",
            }}
          ></div>
        </Card>
        <Card title="Default Shipping Address" className="card-dash">
          <p>You have not set a default shipping address.</p>
          <div
            className="card-footer"
            style={{
              borderTop: "1px solid #f0f0f0",
              marginTop: "1rem",
              paddingTop: "1rem",
            }}
          ></div>
        </Card>
      </div>
    </div>
  );
}

export default AccountDashboard;

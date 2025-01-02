import React, { useEffect } from "react";
import { Layout, Tabs } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./accdash.css";

const { Header, Content } = Layout;

const Accdash = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { key: "account-dashboard", label: "Account Dashboard" },
    // { key: "pending-approvals", label: "Pending Approvals" },
    { key: "order-history", label: "Order History" },
    // { key: "addresses", label: "Addresses" },
    // { key: "newsletter", label: "Newsletter Subscriptions" },
    { key: "account-details", label: "Account Details & Password Change" },
    // { key: "payment-options", label: "My Payment Options" },
  ];

  // Get the active key from the current location
  const activeKey = location.pathname.split("/").pop() || "account-dashboard"; // Fallback to 'account-dashboard'

  const handleTabChange = (key) => {
    navigate(key);
  };

  // Redirect to default tab if location path is just '/myaccount'
  useEffect(() => {
    if (location.pathname === "/my-account") {
      navigate("/my-account/account-dashboard");
    }
  }, [location.pathname, navigate]);

  return (
    <Layout style={{ background: "transparent" }} className="accdash-layout">
      <Header style={{ background: "#fff", marginTop: "1.5rem" }}>
        <Tabs
          activeKey={activeKey} // Set active key based on the URL
          onChange={handleTabChange}
          style={{ marginTop: "1rem" }}
        >
          {tabs.map((tab) => (
            <Tabs.TabPane tab={tab.label} key={tab.key}></Tabs.TabPane>
          ))}
        </Tabs>
      </Header>
      <Content
        style={{
          padding: "24px",
          margin: 0,
          minHeight: 280,
          background: "#fff",
          width: "100%",
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
};

export default Accdash;

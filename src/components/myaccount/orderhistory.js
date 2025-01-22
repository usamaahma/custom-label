import React, { useState, useEffect } from "react";
import { Table, Spin, Empty } from "antd"; // Import Ant Design components
import './orderhistory.css'; // Import custom CSS file for styling

function OrderHistory() {
  // State to store checkout data (orders)
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  // Simulate fetching order history with demo data
  useEffect(() => {
    setLoading(true);

    // Simulated data (mock orders)
    const demoData = [
      { userId: "12345", productName: "custom woven labels", totalPrice: 25.0 },
      { userId: "12345", productName: "t shirt label", totalPrice: 40.0 },
      { userId: "67890", productName: "cotton tag", totalPrice: 30.0 },
    ];

    // Grouping orders by userId and calculating total price for each user
    const groupedData = demoData.reduce((acc, order) => {
      const { userId, productName, totalPrice } = order;
      if (!acc[userId]) {
        acc[userId] = {
          userId,
          products: [],
          totalPrice: 0,
        };
      }
      acc[userId].products.push(productName);
      acc[userId].totalPrice += totalPrice;
      return acc;
    }, {});

    // Convert grouped data to an array for use with Ant Design Table
    const formattedData = Object.values(groupedData).map(user => ({
      ...user,
      products: user.products.map((product, index) => `${index + 1}. ${product}`), // Add numbering to products
    }));

    // Simulate some delay before setting the data (like an API call)
    setTimeout(() => {
      setOrderData(formattedData); // Set formatted data as order history
      setLoading(false); // Stop loading after data is set
    }, 1000); // Delay of 1 second to simulate fetching

  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Columns for the Ant Design Table
  const columns = [
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
      sorter: (a, b) => a.userId.localeCompare(b.userId), // Sorting by user ID
    },
    {
      title: 'Products Ordered',
      dataIndex: 'products',
      key: 'products',
      render: (products) => (
        <ul>
          {products.map((product, index) => (
            <li key={index}>{product}</li> // Render each product as a list item
          ))}
        </ul>
      ), // Render products as an unordered list
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (text) => `$${text.toFixed(2)}`, // Format price as currency
      sorter: (a, b) => a.totalPrice - b.totalPrice, // Sorting by total price
    },
  ];

  // If loading, show a spinner
  if (loading) {
    return (
      <div className="orderhistory-loading">
        <Spin size="large" />
      </div>
    );
  }

  // If no orders, show a message
  if (!orderData || orderData.length === 0) {
    return (
      <div className="orderhistory-empty">
        <Empty description="You have placed no orders." />
      </div>
    );
  }

  return (
    <div className="orderhistory-container">
      <h2>Your Order History</h2>
      <Table
        columns={columns}
        dataSource={orderData}
        rowKey="userId"
        pagination={false} // Optional: Disable pagination if you don't need it
        className="orderhistory-table"
      />
    </div>
  );
}

export default OrderHistory;

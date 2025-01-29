import React, { useState } from "react";
import { Table, Button } from "antd";
import "./lasttable.css";
import { Link } from "react-router-dom";

const columns = [
  {
    title: <b style={{ fontSize: "16px" }}>Quantity</b>,
    dataIndex: "quantity",
    key: "quantity",
    render: (text) => <a>{text}</a>,
  },
  {
    title: <b style={{ fontSize: "16px" }}>Unit Price</b>,
    dataIndex: "unitPrice",
    key: "unitPrice",
  },
  {
    title: <b style={{ fontSize: "16px" }}>Total</b>,
    dataIndex: "total",
    key: "total",
  },
];

const LastTable1 = ({ allQuantityPrices, onRowClick }) => {
  const [selectedRowKey, setSelectedRowKey] = useState(null);

  // Check if allQuantityPrices has data
  const hasData = Array.isArray(allQuantityPrices) && allQuantityPrices.length > 0;

  if (!hasData) {
    // Show message if no size is selected or data is empty
    return (
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <h3 style={{ color: "#888" }}>Please select any size to get its pricing</h3>
      </div>
    );
  }

  // Map allQuantityPrices to create the data array for the table
  const data = allQuantityPrices.map((item, index) => ({
    key: index,
    quantity: `${item.quantity} pcs`,
    unitPrice: `$${item.price.toFixed(2)} Each`,
    total: `$${(item.quantity * item.price).toFixed(2)}`,
  }));

  // Add an additional entry for "1000+ pcs"
  data.push({
    key: data.length,
    quantity: "1000+ pcs",
    unitPrice: "Wholesale Pricing",
    total: (
      <Link to="/get-quote">
        <Button style={{ background: "#007AB7", color: "#fff" }}>
          Get a Quote
        </Button>
      </Link>
    ),
  });

  const handleRowClick = (record) => {
    setSelectedRowKey(record.key); // Update selected row key
    onRowClick(record); // Send the clicked row data to the parent
  };

  const rowClassName = (record) =>
    record.key === selectedRowKey ? "selected-row" : "";

  return (
    <div className="height-table">
      <Table
        columns={columns}
        dataSource={data}
        onRow={(record) => ({
          onClick: () => handleRowClick(record), // Attach row click handler
        })}
        rowClassName={rowClassName} // Apply class to rows
      />
    </div>
  );
};

export default LastTable1;

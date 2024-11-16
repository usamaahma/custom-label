import React from "react";
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
    onRowClick(record); // Send the clicked row data to the parent
  };
  return (
    <div className="height-table">
      <Table
        columns={columns}
        dataSource={data}
        onRow={(record) => ({
          onClick: () => handleRowClick(record), // Attach row click handler
        })}
      />
    </div>
  );
};

export default LastTable1;

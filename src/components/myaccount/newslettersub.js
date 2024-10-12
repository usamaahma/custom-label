import React from "react";
import { Radio } from "antd";
import { Button } from "react-bootstrap";

function NewsletterSubscriptions() {
  return (
    <div>
      <h3>Newsletter Subscriptions</h3>
      <div style={{ display: "grid",marginTop:"2rem" }}>
        {" "}
        <Radio>Radio</Radio>
        <Button htmlType="submit" className="submit-button-news">
          Save
        </Button>{" "}
      </div>
    </div>
  );
}

export default NewsletterSubscriptions;

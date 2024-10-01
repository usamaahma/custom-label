import React from "react";
import "./vieweditcart.css";
import { Button } from "antd";

function Vieweditcart() {
  return (
    <div style={{ display: "flex", width: "100%" }}>
      {/* Column 1 */}
      <div
        style={{
          flex: 1,
          padding: "10px",
          textAlign: "left",
          fontWeight: "bold",
        }}
      >
        <div>Item</div>
        <img
          className="image-viewcart"
          src="../images/cardclothing.jpg"
          alt="Placeholder"
        />
      </div>

      {/* Column 2 */}
      <div style={{ flex: 1, padding: "10px" }}>
        <p className="custom-viewedit">Custom Woven Labels</p>
        <div
          style={{
            overflowY: "scroll",
            height: "200px",
          }}
        >
          <p>
            <strong>Style:</strong> 5 x Loop Fold
          </p>
          <p>
            <strong>Size:</strong> 5 x 2 x 0.625
          </p>
          <p>
            <strong>Backing Options:</strong> 5 x None (Sew-On)
          </p>
          <p>
            <strong>Metallic Thread:</strong> 5 x None (Regular Thread)
          </p>
          <p>
            <strong>Size Symbols or Color Versions?:</strong> 5 x None
          </p>
          <p>
            <strong>Proof Options:</strong> Digital Proof Only
          </p>
          <p>
            <strong>Turnaround Options:</strong> 5 x Standard 15 Business Days
          </p>
          <p>
            <strong>Quantity:</strong> 5 x 5
          </p>
        </div>
      </div>

      {/* Column 3 */}
      <div style={{ flex: 1, padding: "10px" }}>Column 3</div>

      {/* Column 4 */}
      <div style={{ flex: 1, padding: "10px", backgroundColor: "lightgray" }}>
        <p className="summary-viewedit">Summary</p>
        <p className="estimated-view">Estimated Shipping and Tax</p>
        <hr />
        <div className="sub-viewed">
          <p>Sub Total</p>
          <p>$46.50</p>
        </div>
        <hr />
        <div className="order-viewed">
          <p>Order Total</p>
          <p>$46.50</p>
        </div>
        <Button className="Button-viewed">
          <p className="check-but">Go to Checkout</p>
        </Button>
      </div>
    </div>
  );
}

export default Vieweditcart;

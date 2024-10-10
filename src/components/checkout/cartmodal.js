import React, { useState } from "react";
import { Modal, Button, Input, Divider } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cartcontext"; // Import the useCart hook
import "./cartmodal.css";

function Cartmodal1({ visible, onClose }) {
  // State to manage quantity of items
  const [quantities, setQuantities] = useState({}); // State for multiple quantities
  const { cart, removeFromCart } = useCart(); // Access cart items and remove function from context
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to handle quantity change
  const handleQuantityChange = (id, value) => {
    if (value > 0) {
      // Ensure quantity is positive
      setQuantities((prev) => ({ ...prev, [id]: value })); // Update quantity for the specific item
    }
  };

  // Calculate the subtotal based on cart items and their quantities
  const subtotal = cart.reduce((total, item) => {
    const itemQuantity = quantities[item.id] || 1; // Default to 1 if quantity is not set
    return total + item.price * itemQuantity;
  }, 0);

  // Function to handle checkout
  const handleCheckout = () => {
    onClose(); // Close modal
    navigate("/checkout"); // Navigate to checkout page
  };

  // Function to handle navigation to view and edit cart page
  const handleViewAndEditCart = () => {
    onClose(); // Close modal
    navigate("/view-and-edit-cart"); // Navigate to view and edit cart page
  };

  // Function to remove item from cart
  const handleRemoveFromCart = (item) => {
    removeFromCart(item); // Call remove function from context
  };

  return (
    <Modal
      title="Shopping Cart"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <div className="cart-modal-content">
        {cart.length === 0 ? ( // Check if the cart is empty
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              {/* Item details */}
              <div className="cart-item-details">
                <h4>{item.name}</h4>
                <p className="price-txt">Price: ${item.price}</p>
                <Input
                  type="number"
                  min={1}
                  value={quantities[item.id] || 1} // Default to 1
                  onChange={(e) =>
                    handleQuantityChange(item.id, e.target.value)
                  }
                  style={{ width: "60px", marginRight: "8px" }}
                />
                <span className="price-txt">
                  Subtotal: $
                  {(item.price * (quantities[item.id] || 1)).toFixed(2)}(
                  {quantities[item.id] || 1} item
                  {(quantities[item.id] || 1) > 1 ? "s" : ""})
                </span>
              </div>

              {/* Item actions (edit and delete) */}
              <div className="cart-item-actions">
                <Button
                  icon={<EditOutlined />}
                  onClick={() =>
                    handleQuantityChange(item.id, quantities[item.id] || 1)
                  }
                />
                <Button
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemoveFromCart(item)}
                />
              </div>
            </div>
          ))
        )}

        <Divider />

        {/* Cart summary and checkout button */}
        <div className="cart-summary">
          <h3>Cart Subtotal: ${subtotal.toFixed(2)}</h3>
          <Button
            type="primary"
            block
            className="btn-cart"
            onClick={handleCheckout}
            style={{ marginBottom: "1rem" }}
          >
            Checkout
          </Button>
        </div>

        <Divider />

        {/* View and edit cart button */}
        <Button
          type="primary"
          block
          className="btn-cart"
          onClick={handleViewAndEditCart}
          style={{ marginBottom: "0" }}
        >
          View and Edit Cart
        </Button>
      </div>
    </Modal>
  );
}

export default Cartmodal1;

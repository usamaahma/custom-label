import React, { useState } from "react";
import { Drawer } from "antd"; // Import Drawer and Button from antd
import { useCart } from "../../context/cartcontext"; // Import useCart hook for accessing cart context
import { useNavigate } from "react-router-dom";
import "./drawerviewedit.css";

function Drawerviewedit() {
  const { cart, removeFromCart, addToCart } = useCart(); // Get cart and functions from context
  const [visible, setVisible] = useState(true); // State to manage drawer visibility
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Handle quantity change for specific item
  const handleQuantityChange = (e, item) => {
    const newQuantity = Number(e.target.value); // Get the new quantity from input
    // Update the item quantity in the cart by calling addToCart with the updated item
    const updatedItem = { ...item, quantity: newQuantity };
    addToCart(updatedItem); // Update cart with the new quantity
  };

  // Handle item removal from the cart
  const handleRemoveItem = (item) => {
    removeFromCart(item); // Remove item from the cart
  };

  // Close the drawer and navigate to checkout page
  const onClose = () => {
    setVisible(false);
    navigate("/checkout"); // Navigate to checkout page (or wherever needed)
  };

  // Calculate subtotal for a single item
  const calculateSubtotal = (item) => (item.price * item.quantity).toFixed(2); // Use the item's price and quantity

  return (
    <div>
      <Drawer
        title="View and Edit Cart"
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
        width={600}
      >
        {/* Main Cart Content */}
        <div className="main-view-cart">
          {cart.length === 0 ? (
            <p>Your cart is empty!</p>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="cart-item">
                {/* Column 1 - Item Image */}
                <div className="cart-item-column">
                  <div className="item-header">Item</div>
                  <img
                    className="image-viewcart"
                    src={item.artwork} // Dynamically use the item artwork
                    alt="Item"
                  />
                </div>

                {/* Column 2 - Item Details */}
                <div className="cart-other-columns">
                  <div className="cart-details-column">
                    <p className="custom-viewedit">{item.name}</p>
                    <div className="cart-detail-list">
                      <p>
                        <strong>Style:</strong> {item.style}
                      </p>
                      <p>
                        <strong>Size:</strong> {item.size}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {item.quantity}
                      </p>
                      <p>
                        <strong>Comments:</strong> {item.comments}
                      </p>

                      {/* Add other item details as needed */}
                    </div>
                  </div>

                  {/* Column 3 - Price, Qty, Subtotal */}
                  <div className="cart-price-column">
                    <div className="cart-item-detail">
                      <span className="price-label">Price:</span>
                      {/* <span className="price-value">${item.price.toFixed(2)}</span> */}
                    </div>
                    <div className="cart-item-detail">
                      <span className="qty-label">Qty:</span>
                      <input
                        type="number"
                        className="qty-input"
                        value={item.quantity}
                        min="1"
                        onChange={(e) => handleQuantityChange(e, item)} // Update quantity here
                      />
                    </div>
                    <div className="cart-item-detail">
                      <span className="subtotal-label">Subtotal:</span>
                      <span className="subtotal-value">
                        ${calculateSubtotal(item)}
                      </span>
                    </div>
                  </div>

                  {/* Column 4 - Remove Item */}
                  <div className="cart-summary-column">
                    <button
                      onClick={() => handleRemoveItem(item)} // Remove item from cart
                      className="remove-item-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Summary and Checkout */}
          {cart.length > 0 && (
            <div className="cart-summary-column">
              <p className="summary-viewedit">Summary</p>
              <p className="estimated-view">Estimated Shipping and Tax</p>
              <hr />
              <div className="sub-viewed">
                <p>Sub Total</p>
                <p>
                  $
                  {cart.reduce(
                    (total, item) => total + calculateSubtotal(item),
                    0
                  )}
                </p>
              </div>
              <hr />
              <div className="order-viewed">
                <p>Order Total</p>
                <p>
                  $
                  {cart.reduce(
                    (total, item) => total + calculateSubtotal(item),
                    0
                  )}
                </p>
              </div>
              <div className="button1-container">
                <button className="Button1-viewed" onClick={onClose}>
                  Go to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
}

export default Drawerviewedit;

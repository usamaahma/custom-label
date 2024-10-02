import React, { useState } from 'react';
import { Modal, Button, Input, Divider } from 'antd';
import {  EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import './cartmodal.css';
 

function Cartmodal1({ visible, onClose }) {
  const [quantity, setQuantity] = useState(1);
  
  // Sample cart items
  const cartItems = [
    {
      id: 1,
      name: "Custom woven labels",
      image: "../../images/straight.png", 
      price: 20,
    },
  ];

  const subtotal = cartItems.reduce((total, item) => total + item.price * quantity, 0);

  return (
    <Modal
      title="Shopping Cart"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <div className="cart-modal-content">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h4>{item.name}</h4>
              <p className='price-txt'>Price: ${item.price}</p>
              <Input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                style={{ width: '60px', marginRight: '8px' }}
              />
              <span className='price-txt'>Subtotal: ${subtotal.toFixed(2)} ({quantity} item{quantity > 1 ? 's' : ''})</span>
            </div>
            <div className="cart-item-actions">
              <Button icon={<EditOutlined />} />
              <Button icon={<DeleteOutlined />} />
            </div>
          </div>
        ))}
        <Divider />
        <div className="cart-summary">
          <h3>Cart Subtotal: ${subtotal.toFixed(2)}</h3>
          <Link to="/checkout" >
          <Button type="primary" block className='btn-cart' style={{ marginBottom: '1rem' }}>
            Checkout
          </Button>
        </Link>
          
        </div>
        <Divider />
        <Link to="/view and edit cart" >
        <Button type="primary" block  className='btn-cart'  style={{ marginBottom: '0' }}>
            View and Edit Cart
          </Button>
          </Link>
      </div>
    </Modal>
  );
}

export default Cartmodal1;

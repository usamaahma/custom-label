import React, { createContext, useReducer, useContext } from "react";

// Action Types
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";

// Context
const CartContext = createContext();

// Reducer
const cartReducer = (state, action) => {
  let updatedState;
  switch (action.type) {
    case ADD_TO_CART:
      // Check for duplicates
      if (state.some((item) => item.id === action.payload.id)) {
        return state; // Return current state if item exists
      }
      updatedState = [...state, action.payload];
      break;

    case REMOVE_FROM_CART:
      updatedState = state.filter((item) => item.id !== action.payload.id);
      break;

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }

  // Save updated cart to sessionStorage
  sessionStorage.setItem("cart", JSON.stringify(updatedState));

  return updatedState;
};
// Provider
export const CartProvider = ({ children }) => {
  // Load cart from sessionStorage if available
  const initialCart = JSON.parse(sessionStorage.getItem("cart")) || [];

  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  const addToCart = (item) => {
    dispatch({ type: ADD_TO_CART, payload: item });
  };

  const removeFromCart = (item) => {
    dispatch({ type: REMOVE_FROM_CART, payload: item });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

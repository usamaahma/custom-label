import React, { createContext, useReducer, useContext, useEffect } from "react";

// Action Types
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const CLEAR_CART = "CLEAR_CART";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";

// Context
const CartContext = createContext();

// Reducer
const cartReducer = (state, action) => {
  switch (action.type) {  
    case ADD_TO_CART: {
      const existingItem = state.find((item) => item.id === action.payload.id);
      return existingItem
        ? state.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state, { ...action.payload, quantity: 1 }];
    }

    case REMOVE_FROM_CART: {
      return state
        .map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
    }

    case UPDATE_QUANTITY: {
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    }

    case CLEAR_CART:
      return [];

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// Provider
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    const storedCart = sessionStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // ✅ Session Storage ko Update karo jab bhi `cart` change ho
  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => dispatch({ type: ADD_TO_CART, payload: item });
  const removeFromCart = (item) =>
    dispatch({ type: REMOVE_FROM_CART, payload: item });
  const updateQuantity = (item, quantity) =>
    dispatch({ type: UPDATE_QUANTITY, payload: { ...item, quantity } });
  const clearCart = () => dispatch({ type: CLEAR_CART });

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

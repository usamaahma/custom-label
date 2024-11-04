import React, { createContext, useReducer, useContext, useEffect } from "react";
import { login } from "../utils/axios"; // Use named import for the login instance

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload, isLoggedIn: true }; // Set isLoggedIn to true on login
    case "LOGOUT":
      return { ...state, user: null, isLoggedIn: false }; // Set isLoggedIn to false on logout
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isLoggedIn: false,
  });

  // Check localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedLoginState = localStorage.getItem("loginstate");

    if (storedLoginState === "true") {
      // If login state is true, restore the user from localStorage
      dispatch({ type: "LOGIN", payload: JSON.parse(storedUser) });
    }
  }, []);

  const loginUser = async (email, password) => {
    try {
      const response = await login.post("/login", { email, password }); // Use the login instance
      dispatch({ type: "LOGIN", payload: response.data.user });
      localStorage.setItem("user", JSON.stringify(response.data.user)); // Store only user data
      localStorage.setItem("loginstate", "true"); // Store login state
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // Propagate the error for handling in the component
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    localStorage.setItem("loginstate", "false"); // Update login state
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, isLoggedIn: state.isLoggedIn, login: loginUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

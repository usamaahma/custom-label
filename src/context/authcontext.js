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

// AuthContext
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isLoggedIn: false,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedLoginState = localStorage.getItem("loginstate");

    if (storedLoginState === "true") {
      dispatch({ type: "LOGIN", payload: JSON.parse(storedUser) });
    }
  }, []);

  const loginUser = (userData) => {
    dispatch({ type: "LOGIN", payload: userData });
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("loginstate", "true");
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    localStorage.setItem("loginstate", "false");
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        login: loginUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

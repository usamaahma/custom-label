import React, { createContext, useReducer, useContext, useEffect } from "react";
import CryptoJS from "crypto-js";

const AuthContext = createContext();
const SECRET_KEY = process.env.REACT_APP_SECRET_KEY || "your_secret_key"; // ✅ Environment variable use karo

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoggedIn: true,
      };
    case "LOGOUT":
      return { ...state, user: null, token: null, isLoggedIn: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: null,
    isLoggedIn: false,
  });

  let logoutTimer;

  // ✅ Encrypt Data
  const encryptData = (data) => {
    if (!data) return null;
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
  };

  // ✅ Decrypt Data (Fix Applied)
  const decryptData = (data) => {
    try {
      if (!data) return null;
      const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return decrypted ? JSON.parse(decrypted) : null;
    } catch (error) {
      console.error("Decryption Error:", error.message);
      return null;
    }
  };

  // ✅ Logout Timer Function
  const setLogoutTimer = (expirationTime) => {
    logoutTimer = setTimeout(() => {
      logout();
    }, expirationTime);
  };

  const clearLogoutTimer = () => {
    if (logoutTimer) clearTimeout(logoutTimer);
  };

  // ✅ Check Previous Login on Load
  useEffect(() => {
    const encryptedUser = localStorage.getItem("user");
    const encryptedToken = localStorage.getItem("token");
    const expiryTime = localStorage.getItem("token_expiry");

    console.log("Checking localStorage:", {
      encryptedUser,
      encryptedToken,
      expiryTime,
    });

    if (encryptedUser && encryptedToken && expiryTime) {
      const user = decryptData(encryptedUser);
      const token = decryptData(encryptedToken);
      const expiration = new Date(expiryTime);

      if (user && token && expiration > new Date()) {
        console.log("User found, logging in...");
        dispatch({ type: "LOGIN", payload: { user, token } });
        setLogoutTimer(expiration.getTime() - new Date().getTime());
      } else {
        console.warn("Session expired or data is invalid. Logging out.");
        logout();
      }
    }
  }, []); // ✅ Empty dependency array ensures this runs only once on mount
  useEffect(() => {
    const handleTabClose = (event) => {
      event.preventDefault(); // Optional: Prevent the tab from closing immediately
      logout();
    };

    window.addEventListener("onclose", handleTabClose);

    return () => {
      window.removeEventListener("onclose", handleTabClose);
    };
  }, []);
  // ✅ Login Function
  const loginUser = (userData, token, expiresIn) => {
    console.log("Logging in:", { userData, token });

    const encryptedUser = encryptData(userData);
    const encryptedToken = encryptData(token);
    const expirationTime = new Date(new Date().getTime() + expiresIn * 1000);

    console.log("Encrypted Data:", { encryptedUser, encryptedToken });

    localStorage.setItem("user", encryptedUser); // ✅ Store encrypted user
    localStorage.setItem("token", encryptedToken);
    localStorage.setItem("token_expiry", expirationTime.toISOString());

    dispatch({ type: "LOGIN", payload: { user: userData, token } });

    setLogoutTimer(expiresIn * 1000);
  };

  // ✅ Logout Function
  const logout = () => {
    console.log("Logging out...");
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("token_expiry");
    clearLogoutTimer();
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
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

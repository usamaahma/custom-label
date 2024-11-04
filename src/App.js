import React, { useState } from "react";
import "./App.css";
import { CartProvider } from "../src/context/cartcontext"; // Import the CartProvider
import { AuthProvider } from "../src/context/authcontext"; // Import the AuthProvider
import AppRoutes from "./routes/routes";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Login from "./components/loginMainVerification/LoginMainVerify"; // Import the Login component

function App() {
  const [isVerified, setIsVerified] = useState(false);

  return (
    <AuthProvider>
      <CartProvider>
        <div className="App">
          {isVerified ? (
            <AppRoutes /> // Show the main app routes if the user is verified
          ) : (
            <Login onVerified={setIsVerified} /> // Show login if not verified
          )}
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

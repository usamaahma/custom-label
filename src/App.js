import React, { useState } from "react";
import "./App.css";
import { CartProvider } from "../src/context/cartcontext"; // Import the CartProvider
import { AuthProvider } from "../src/context/authcontext"; // Import the AuthProvider
import AppRoutes from "./routes/routes";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Login from "./components/loginMainVerification/LoginMainVerify"; // Import the Login component
import { Helmet } from "react-helmet"; // Import React Helmet

function App() {
  const [isVerified, setIsVerified] = useState(false);

  return (
    <AuthProvider>
      <CartProvider>
        {/* <Helmet>
          <title>My Website - Best Products & Services</title>
          <meta name="description" content="Welcome to My Website. Discover amazing products and services here!" />
          <meta name="keywords" content="ecommerce, products, services, shopping" />
          <meta name="author" content="My Website Team" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="og:title" content="My Website - Best Products & Services" />
          <meta property="og:description" content="Explore the best products and services at My Website." />
          <meta property="og:image" content="https://example.com/logo.png" />
          <meta property="og:url" content="https://mywebsite.com" />
        </Helmet> */}
        <div className="App">
          {isVerified ? (
            <AppRoutes /> // Show the main app routes if the user is verified
          ) : (
            <Login onVerified={setIsVerified} /> // Show login if not verified
          )}
        </div>
        {/* <AppRoutes /> // Show the main app routes if the user is verified */}
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

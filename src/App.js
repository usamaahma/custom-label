import "./App.css";
 import { CartProvider } from "../src/context/cartcontext"; // Import the CartProvider
import { AuthProvider  } from "../src/context/authcontext"; // Import the CartProvider
import AppRoutes from "./routes/routes";


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="App">
          <AppRoutes/>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

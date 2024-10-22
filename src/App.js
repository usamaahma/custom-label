import "./App.css";
import { CartProvider } from "../src/context/cartcontext"; // Import the CartProvider
import { AuthProvider } from "../src/context/authcontext"; // Import the CartProvider
import AppRoutes from "./routes/routes";
import WhatsappButton from "./components/navbars/whatsapp";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="App">
          <AppRoutes />
          <WhatsappButton />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

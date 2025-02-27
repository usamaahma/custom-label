import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // To handle page navigation
import { message } from "antd";
import "./orderhistory.css"; // Import custom CSS file for styling
import { orderhistory } from "../../utils/axios"; // Axios instance for API calls
import CustomLoader from "../clothingsection/loader"; // Loader component
import { useAuth } from "../../context/authcontext";

function OrderHistory() {
  const navigate = useNavigate(); // Navigation hook for redirecting
  const { user } = useAuth();
  const userData = user;
  const userid = userData?.id;

  // Log to see what userId is being fetched
  console.log("User ID from localStorage: ", userid);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // If userId is not found, redirect to login page
  useEffect(() => {
    if (!userid) {
      message.error("User ID not found. Please log in again.");
      console.log("user nhi aa rha");
    }
  }, [userid]);

  // Fetch user order history from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (userid) {
          setLoading(true); // Start loading
          // Make the API call to get orders for the logged-in user
          const response = await orderhistory.get(`?userId=${userid}`);
          console.log(response, "res");
          // Check if response has data
          if (
            response.data &&
            response.data.orders &&
            response.data.orders.length > 0
          ) {
            setOrders(response.data.orders); // Set the orders to state
          } else {
            setError("No orders found for the user");
          }
        } else {
          setError("User ID not found");
        }
      } catch (err) {
        setError("Error fetching data: " + err.message); // Handle errors
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchOrders(); // Call the function to fetch orders
  }, [userid]);

  // Handling loading, error, and displaying orders
  if (loading) {
    return <CustomLoader />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
      {" "}
      <h1 className="order-heading">Orders History</h1>
      <div className="orderhistory-container">
        {orders.length > 0 ? (
          <table className="orderhistory-table">
            <thead>
              <tr>
                <th className="orderhistory-th">Product Id</th>
                <th className="orderhistory-th">Item Name</th>
                <th className="orderhistory-th">Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  {" "}
                  {/* Using _id for the key */}
                  <td className="orderhistory-td">{order.itemId}</td>
                  <td className="orderhistory-td">{order.itemName}</td>
                  <td className="orderhistory-td">${order.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No orders found for this user.</p>
        )}
      </div>
    </div>
  );
}

export default OrderHistory;

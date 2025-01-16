import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const PayPalCheckoutButton = ({ amount, onPaymentApproved }) => {
  useEffect(() => {
    // Dynamically load the PayPal script
    const loadPayPalScript = async () => {
      if (!window.paypal) {
        const script = document.createElement("script");
        script.src = "https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=USD"; // Replace with your PayPal client ID
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
          if (window.paypal) {
            window.paypal.Buttons.driver("react", { React, ReactDOM });
            window.paypal.Buttons({
              createOrder: (data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: amount, // Amount for payment
                      },
                    },
                  ],
                });
              },
              onApprove: (data, actions) => {
                return actions.order.capture().then((details) => {
                  alert(`Transaction completed by ${details.payer.name.given_name}`);
                  onPaymentApproved(true); // Payment successful, set state to true
                });
              },
              onError: (err) => {
                console.error("Error during PayPal transaction", err);
                onPaymentApproved(false); // Payment failed, set state to false
              },
            }).render("#paypal-button-container");
          }
        };
      }
    };

    loadPayPalScript();
  }, [amount, onPaymentApproved]);

  return <div id="paypal-button-container"></div>;
};

export default PayPalCheckoutButton;

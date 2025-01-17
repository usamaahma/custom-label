import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const PayPalCheckoutButton = ({ amount, onPaymentApproved }) => {
  useEffect(() => {
    const loadPayPalScript = async () => {
      // Check if PayPal script is already loaded
      if (!window.paypal) {
        const script = document.createElement("script");
        script.src =
          "https://www.paypal.com/sdk/js?client-id=AWJHaK_Et0eFKh67Nn28i1s_sSZgkr78LntE8cD50xw3o6MKJ6rsHgYOdriUefkASGinYtMdGkfAkJBl&currency=USD";
        script.async = true;
        document.body.appendChild(script);

        // Handle script load event
        script.onload = () => {
          if (window.paypal) {
            // Render PayPal button only after script has loaded
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
                  alert(
                    `Transaction completed by ${details.payer.name.given_name}`
                  );
                  onPaymentApproved(true); // Payment successful
                });
              },
              onError: (err) => {
                console.error("Error during PayPal transaction", err);
                onPaymentApproved(false); // Payment failed
              },
            }).render("#paypal-button-container"); // Render PayPal button here
          } else {
            console.error("PayPal SDK not loaded correctly");
          }
        };

        // Handle script load error
        script.onerror = (err) => {
          console.error("Error loading PayPal script:", err);
        };
      }
    };

    loadPayPalScript();
  }, [amount, onPaymentApproved]);

  return <div id="paypal-button-container" />; // PayPal button will be rendered here
};

export default PayPalCheckoutButton;

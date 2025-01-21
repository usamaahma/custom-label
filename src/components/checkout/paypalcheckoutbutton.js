import React, { useEffect } from "react";

const PayPalCheckoutButton = ({ cart, onPaymentApproved }) => {
  useEffect(() => {
    const loadPayPalScript = async () => {
      if (!window.paypal) {
        const script = document.createElement("script");
        script.src =
          "https://www.paypal.com/sdk/js?client-id=AWJHaK_Et0eFKh67Nn28i1s_sSZgkr78LntE8cD50xw3o6MKJ6rsHgYOdriUefkASGinYtMdGkfAkJBl&currency=USD";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
          if (window.paypal) {
            window.paypal
              .Buttons({
                fundingSource: window.paypal.FUNDING.PAYPAL, // Only PayPal button
                style: {
                  layout: "horizontal", // Horizontal layout
                  background: "black",
                  label: "paypal", // PayPal button
                },
                createOrder: (data, actions) => {
                  // Calculate total amount
                  const totalAmount = cart
                    .reduce((sum, item) => sum + item.totalPrice, 0)
                    .toFixed(2);

                  // Map cart items to PayPal item format
                  const items = cart.map((item) => ({
                    name: item.name, // Item name
                    sku: item.id, // Unique item ID
                    unit_amount: {
                      value: item.price.toFixed(2), // Single item price
                      currency_code: "USD",
                    },
                    quantity: item.quantity, // Quantity of the item
                  }));

                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: totalAmount, // Total cart amount
                          breakdown: {
                            item_total: {
                              value: totalAmount, // Total item price
                              currency_code: "USD",
                            },
                          },
                        },
                        items: items, // Pass items to PayPal
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
              })
              .render("#paypal-button-container"); // Render PayPal button
          } else {
            console.error("PayPal SDK not loaded correctly");
          }
        };

        script.onerror = (err) => {
          console.error("Error loading PayPal script:", err);
        };
      }
    };

    loadPayPalScript();
  }, [cart, onPaymentApproved]);

  return <div id="paypal-button-container" />; // PayPal button will be rendered here
};

export default PayPalCheckoutButton;

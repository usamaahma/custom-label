import React, { useEffect, useRef, useState } from "react";

const PayPalCheckoutButton = ({ cart, onPaymentApproved }) => {
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const buttonContainerRef = useRef(null);
  const isButtonRendered = useRef(false);

  useEffect(() => {
    const loadPayPalScript = () => {
      if (document.getElementById("paypal-sdk")) {
        setPaypalLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src =
        "https://www.paypal.com/sdk/js?client-id=AWJHaK_Et0eFKh67Nn28i1s_sSZgkr78LntE8cD50xw3o6MKJ6rsHgYOdriUefkASGinYtMdGkfAkJBl&currency=USD";
      script.id = "paypal-sdk";
      script.async = true;
      script.onload = () => setPaypalLoaded(true);
      script.onerror = () => console.error("Failed to load PayPal SDK");
      document.body.appendChild(script);
    };

    loadPayPalScript();

    return () => {
      // ✅ Cleanup: Remove PayPal script on unmount (Optional)
      const script = document.getElementById("paypal-sdk");
      if (script) script.remove();
      
      // ✅ Cleanup: Remove PayPal button container
      if (buttonContainerRef.current) {
        buttonContainerRef.current.innerHTML = "";
      }
    };
  }, []);

  useEffect(() => {
    if (!paypalLoaded || !window.paypal || isButtonRendered.current) return;

    if (!buttonContainerRef.current) {
      console.error("PayPal container not found");
      return;
    }

    isButtonRendered.current = true; // ✅ Prevent multiple renders

    window.paypal
      .Buttons({
        fundingSource: window.paypal.FUNDING.PAYPAL,
        style: {
          layout: "horizontal",
          color: "black",
          label: "paypal",
        },
        createOrder: (data, actions) => {
          const totalAmount = cart
            .reduce((sum, item) => sum + item.totalPrice, 0)
            .toFixed(2);

          const items = cart.map((item) => ({
            name: item.name,
            sku: item.id,
            unit_amount: {
              value: item.price.toFixed(2),
              currency_code: "USD",
            },
            quantity: item.quantity,
          }));

          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: totalAmount,
                  breakdown: {
                    item_total: {
                      value: totalAmount,
                      currency_code: "USD",
                    },
                  },
                },
                items: items,
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert(`Transaction completed by ${details.payer.name.given_name}`);
            onPaymentApproved(true);
          });
        },
        onError: (err) => {
          console.error("Error during PayPal transaction", err);
          onPaymentApproved(false);
        },
      })
      .render(buttonContainerRef.current);
  }, [paypalLoaded, cart, onPaymentApproved]);

  return <div ref={buttonContainerRef} id="paypal-button-container" />;
};

export default PayPalCheckoutButton;

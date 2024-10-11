import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("your-stripe-public-key");

const Checkout = () => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: "your-price-id", quantity: 1 }],
      mode: "payment",
      successUrl: "http://localhost:3000/success",
      cancelUrl: "http://localhost:3000/cancel",
    });
    if (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <div className="container">
      <h2>Complete Checkout</h2>
      <button onClick={handleCheckout}>Pay & Publish</button>
    </div>
  );
};

export default Checkout;

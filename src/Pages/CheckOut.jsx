import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./CSS/LoginSignup.css";

import CartPayment from "../Components/CartItems/CartPayment";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckOut = () => {
  return (
    <div className="logInSignUp">
      <div className="logInSignUp-container">
        <Elements stripe={stripePromise}>
          <CartPayment />
        </Elements>
      </div>
    </div>
  );
};

export default CheckOut;
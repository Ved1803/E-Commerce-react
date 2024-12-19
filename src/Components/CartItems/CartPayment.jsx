import React, { useState, useContext } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { createOrder, payments } from "../../api/apiFunctions";
import { ShopContext } from "../../Context/ShopContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./CartItems.css";

const CartPayment = () => {
  const { cart } = useContext(ShopContext);
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateOrder = async () => {
    try {
      const response = await createOrder();
      console.log(response.data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const data = {
        cart_total: cart.total,
      };
      const response = await payments(data);
      const { client_secret: clientSecret, error } = response.data;
      if (error) {
        alert(`Payment Error: ${error}`);
        setLoading(false);
        return;
      }

      // Confirm the payment
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });

      if (stripeError) {
        alert(`Payment failed: ${stripeError.message}`);
      } else if (paymentIntent.status === "succeeded") {
        alert("Payment successful!");
        await handleCreateOrder();
        navigate("/OrderCompleted");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cartItems-down">
      <div className="cartItems-total">
        <h1>Cart Total</h1>
        <div>
          <div className="cartItems-total-item">
            <p>SubTotal</p>
            <p>${cart.total}</p>
          </div>
          <hr />
          <div className="cartItems-total-item">
            <p>Shipping Fee</p>
            <p>Free</p>
          </div>
          <hr />
          <div className="cartItems-total-item">
            <h3>Total</h3>
            <h3>${cart.total}</h3>
          </div>
        </div>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          onClick={handleCheckout}
          disabled={loading || !stripe || !elements}
        >
          {loading ? "Processing..." : "PAY"}
        </button>
      </div>
    </div>
  );
};

export default CartPayment;

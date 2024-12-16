import React from 'react'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CartItems from '../Components/CartItems/CartItems'
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Cart = () => {
    return (
      <div>
        <Elements stripe={stripePromise}>
            <CartItems />
        </Elements>
      </div>
    )
}

export default Cart
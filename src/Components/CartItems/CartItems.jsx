import React, { useContext, useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import { Link } from "react-router-dom";

const CartItems = () => {
  const {
    cartItems,
    cart,
    removeFromCartItem,
    handleQuantityChange,
    allCardItemsHere,
  } = useContext(ShopContext);

  useEffect(()=>{
    console.log("xsartkrsgljdfsjgkfslfg");
    allCardItemsHere()
  },[])

  return (
    <div className="cartItems">
      <div className="cartItems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {cartItems.map((e) => {
        return (
          <div key={e.id}>
            <p>product Id: {e.collection.id}</p>
            <div className="cartItems-format cartItems-format-main">
              <Link to={`/product/${e.collection.id}`}>
                <img
                  src={e.collection.image_url}
                  alt=""
                  className="cartItem-product-icon"
                />
              </Link>
              <p>{e.collection.name}</p>
              <p>$ {e.collection.new_price}</p>

              <select
                value={e.quantity}
                onChange={(event) =>
                  handleQuantityChange(e.id, Number(event.target.value))
                }
              >
                {[...Array(10).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
              <p>$ {e.total}</p>
              <img
                className="cartItem-remove-icon"
                src={remove_icon}
                alt="remove"
                onClick={() => {
                  removeFromCartItem(e.id);
                }}
              />
            </div>
            <hr />
          </div>
        );
        return null;
      })}

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
          <Link to={`/checkout`}>
            <button>PROCEED TO CHECKOUT</button>
          </Link>
        </div>
        <div className="cartItems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartItems-promobox">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;

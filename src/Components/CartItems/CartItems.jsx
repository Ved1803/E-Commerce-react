import React, { useContext, useEffect } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import { getCart, removeCartItem, updateCartItemQuantity } from "../../api/apiFunctions";
import { useState } from "react";

const CartItems = () => {
  const [items, setitems] = useState([]);
  const [cart, setCart]= useState({})
  const {
    allProduct,
    cartItems,
    removeFromCart,
    getTotalCartAmount,
  } = useContext(ShopContext);
           
  useEffect(() => {
    const allCardItemsHere = async () => {
      try {
        const response = await getCart();
         console.log( response , "vedddddddddd................."
         )
        setitems(response.data.cart_items);
        setCart(response.data)
      } catch (error) {
        console.log(error);
      }
    };
    allCardItemsHere();
  }, []);
  
  const removeFromCartItem = async (id) => {
    try {
      const response = await removeCartItem(id);
      setitems((prevItems) => prevItems.filter((item) => item.collection.id !== id));
      console.log(response)
    } catch (e) {
      console.log(e)
    }
  };

  const handleQuantityChange = async (id, newQuantity) => {
    try {
      const updatedData = {
        quantity: newQuantity,
      };
      const response = await updateCartItemQuantity(id, updatedData);

      setCart((prevCart) => ({
        ...prevCart,
        total: response.data.cart.total, 
      })); 

        setitems((prevItems) =>
        prevItems.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: newQuantity,
                total: newQuantity * item.collection.new_price,
              }
            : item
        )
      );
    } catch (e) {
      console.log(e);
    }
  }

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

      {items.map((e) => {
        {
          /* if (cartiItems[e.id] > 0) { */
        }
        return (
          <div key={e.id}>
            <p>product Id: {e.collection.id}</p>

            <div className="cartItems-format cartItems-format-main">
              <img
                src={e.collection.image_url}
                alt=""
                className="cartItem-product-icon"
              />
              <p>{e.collection.name}</p>
              <p>$ {e.collection.new_price}</p>

              <select
                value={e.quantity}
                onChange={(event) =>
                  handleQuantityChange(e.id, Number(event.target.value))
                }
                // className="cartItem-quantity-select"
              >
                {[...Array(10).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
              {/* <button className="cartItem-quantity">{cartItems[e.id]}</button> */}
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
        {
          /* } */
        }
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
          <button>PROCEED TO CHECKOUT</button>
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

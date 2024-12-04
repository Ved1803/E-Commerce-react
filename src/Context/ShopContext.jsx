import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  createCartItems,
  getAllCollections,
  getCart,
  removeCartItem,
  updateCartItemQuantity,
} from "../api/apiFunctions";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [allProduct, setAllProduct] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cart, setCart] = useState({});

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await getAllCollections();
        setAllProduct(response.data);
      } catch (err) {
        console.error("Error fetching collections:", err);
      }
    };
    fetchCollections();
  }, [cartItems]);

  const allCardItemsHere = async () => {
    try {
      const response = await getCart();
      setCartItems(response.data.cart_items);
      setCart(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    allCardItemsHere();
  }, []);

  const removeFromCartItem = async (id) => {
    console.log(id,'sadfghjhgfdsfsghffgdssfsgdhf');
    try {
      const response = await removeCartItem(id);
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
      const data = response.data.cart.total;
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
      setCart((prev) => ({
        ...prev, 
        cart_items: prev.cart_items.filter((item) => item.id !== id),
        total: data,
      }));
    } catch (e) {
      toast.error(e, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
      console.log(e);
    }
  };
  console.log(cart, "A FTERcart");

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

      setCartItems((prevItems) =>
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
  };

  const getTotalCartItems = () => {
    let totalItem = cartItems.length;
    return totalItem;
  };

  const addToCardData = async (id, total) => {
    console.log(id, "dsfadsfafadsf");
    const updatedData = {
      collection_id: id,
      quantity: 1,
      total: total,
    };
    try {
      const response = await createCartItems(updatedData);
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
        });
    } catch (error) {
        toast.error("Failed to add item to cart!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
        });
      console.log(error);
    }
  };

  const contextValue = {
    allProduct,
    cartItems,
    cart,
    removeFromCartItem,
    handleQuantityChange,
    addToCardData,
    // addToCart,
    // removeFromCart,
    // getTotalCartAmount,
    getTotalCartItems,
    allCardItemsHere,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

import React, { createContext, useState, useEffect } from "react";
import Image from "../Components/Assets/product_13.png";
import { getAllCollections } from "../api/apiFunctions";


export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [allProduct, setAllProduct] = useState([]);
  const [cartItems, setCartItems] = useState({});

  // Fetch collections when the component mounts
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await getAllCollections();
        setAllProduct(
          response.data
        );
      } catch (err) {
        console.error("Error fetching collections:", err);
      }
    };
    fetchCollections();
  }, []);

  // Initialize default cart based on allProduct data
  useEffect(() => {
    const initializeCart = () => {
      let cart = {};
      for (let index = 0; index < allProduct.length; index++) {
        cart[allProduct[index].id] = 0;
      }
      setCartItems(cart);
    };
    initializeCart();
  }, [allProduct]);

  const addToCart = (itemId) => {
    console.log(itemId, "pehla pehla pyar hai 76545678765676666657765756576")
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    console.log(cartItems, "dusra pyar hai");
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max(prev[itemId] - 1, 0),
    }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = allProduct.find(
          (product) => product.id === Number(item)
        );
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    allProduct,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

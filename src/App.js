import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import Footer from "./Components/Footer/Footer";
import men_banner from "./Components/Assets/banner_mens.png";
import women_banner from "./Components/Assets/banner_women.png";
import kid_banner from "./Components/Assets/banner_kids.png";
import React, { useState, useEffect } from "react";
import CollectionsManager from "./Components/CollectionsManager";
import FormShow from "./Components/FormShow";
import Collection from "./Components/Collection";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckOut from "./Pages/CheckOut";
import OrderCompleted from "./Pages/OrderCompleted";
import Orders from "./Components/Users/Orders";
import AccountSettings from "./Components/Users/AccountSettings";
import Wishlist from "./Components/Users/Wishlist";
import Coupons from "./Components/Users/Coupons";
import GiftCards from "./Components/Users/GiftCards";
import HelpCenter from "./Components/Users/HelpCenter";
import AccountLayout from "./Pages/AccountLayout";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route
            path="/mens"
            element={<ShopCategory banner={men_banner} category="men" />}
          />
          <Route
            path="/womens"
            element={<ShopCategory banner={women_banner} category="women" />}
          />
          <Route
            path="/kids"
            element={<ShopCategory banner={kid_banner} category="kid" />}
          />
          <Route path="/FormShow" element={<FormShow />} />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/logout" element={<handleLogout />} />
          <Route path="/collections" element={<CollectionsManager />} />
          <Route path="/collections/:id" element={<Collection />} />
          <Route path="/collections/:id" element={<CollectionsManager />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/OrderCompleted" element={<OrderCompleted />} />

          <Route path="/account" element={<AccountLayout />}>
            <Route index element={<Orders />} />
            <Route path="orders" element={<Orders />} />
            <Route path="settings" element={<AccountSettings />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="coupons" element={<Coupons />} />
            <Route path="giftcards" element={<GiftCards />} />
            <Route path="help" element={<HelpCenter />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;

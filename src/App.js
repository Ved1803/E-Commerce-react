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
// import { handleLogout } from "./Components/Navbar/Navbar";

const App = () => {

  console.log("mainn render");
  useEffect(() => {
    console.log("mainn render");
  })
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
        </Routes>
        <Footer />
      </BrowserRouter>

      {/* <CollectionsManager /> */}
    </div>
  );
};

export default App;

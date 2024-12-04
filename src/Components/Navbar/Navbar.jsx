import React, { useContext, useState, useEffect } from "react";
import Classes from "./navbar.module.css";
import cart_icon from "../Assets/cart_image.png";
import logo from "../Assets/logo.jpeg"
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { LogOutUser } from "../../api/apiFunctions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const handleLogout = async (navigate, setIsAuthenticated) => {
  try {
    const response = await LogOutUser();
    const result = response.data;

    if (result.status === 200) {
      toast.success(result.message);
      localStorage.removeItem("token"); // Clear token from local storage
      setIsAuthenticated(false); // Update authentication state
      navigate("/login"); // Redirect to login page
    } else {
      toast.error("Logout failed!");
    }
  } catch (error) {
    toast.error("An error occurred during logout.");
  }
};

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { getTotalCartItems} = useContext(ShopContext);
  const navigate = useNavigate();
    const token = localStorage.getItem("token");

  useEffect(() => {
    setIsAuthenticated(!!token);
    console.log("usee effect", token);
  }, [token]);

  return (
    <div className={Classes.navbar}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className={Classes.nav_logo}>
        <img src={logo} alt="logo" />
        <p>SHOPPER</p>
      </div>
      <ul className={Classes.nav_menu}>
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/">
            Shop
          </Link>{" "}
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("mens");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/mens">
            Men
          </Link>{" "}
          {menu === "mens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("womens");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/womens">
            Women
          </Link>{" "}
          {menu === "womens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("kids");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/kids">
            Kids
          </Link>{" "}
          {menu === "kids" ? <hr /> : <></>}
        </li>

        <li
          onClick={() => {
            setMenu("FormShow");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/FormShow">
            FormShow
          </Link>{" "}
          {menu === "FormShow" ? <hr /> : <></>}
        </li>
      </ul>
      <div className={Classes.cart}>

        {isAuthenticated ? (
          <button onClick={() => handleLogout(navigate, setIsAuthenticated)}>
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
        <Link to="/cart">
          <img src={cart_icon} alt="cart" />
        </Link>
        <div className={Classes.nav_cart_count}>
          {getTotalCartItems()}
        </div>
      </div>
    </div>
  );
};

export default Navbar;






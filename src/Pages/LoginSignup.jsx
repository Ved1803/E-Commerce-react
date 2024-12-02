import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CSS/LoginSignup.css";
import { LoginUser, LogOutUser, SignUpUser } from "../api/apiFunctions";
import { Link, useNavigate } from "react-router-dom";

const LoginSignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [token, setToken] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  }

  const handleSignup = async () => {
    try {
      const response = await SignUpUser({ user: formData });
      console.log(response, "signip............................");
      console.log(response.data.status.code, "asdfghgfdsdfghgfdsdfghygfdsdefrt")
      if (response.data.status.code === 200) {

        toast.success(response.data.status.message, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
        });

      } else {
        toast.error("Signup failed!");
      }
    } catch (error) {
      toast.error("An error occurred during signup.");
    }
  }

  const handleLogin = async () => {
    try {
      const response = await LoginUser({ user: formData });
      console.log(response.data);

      if (response.data.status.code === 200) {
        toast.success(response.data.status.message, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
        });
        setToken(response.data.status.token);
        console.log(token, "token", response.data.status.token);
        localStorage.setItem("token", response.data.status.token);
        navigate("/");
      } else {
        toast.error("Login failed!");
      }
    } catch (error) {
      toast.error("An error occurred, Please try again.");
    }
  }
  
  const handleLogout = async () => {
    try {
      const response = await LogOutUser();
      const result = response.data;

      if (result.status === 200) {
        toast.success(result.message);
        setToken(null); // Clear token on logout
      } else {
        toast.error("Logout failed!");
      }
    } catch (error) {
      toast.error("An error occurred during logout.");
    }
  };


  return (
    <div className="logInSignUp">
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
      { !token ? <>
      <div className="logInSignUp-container">
        <h1>{isLogin ? "Log In" : "Sign Up"}</h1>
        <div className="logInSignUp-fields">
          {!isLogin && (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
            />
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email Address"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
          />
        </div>
        {!token ? (
          <>
        <button onClick={isLogin ? handleLogin : handleSignup}>Continue</button>
        <p className="logInSignUp-login" onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Don't have an account? Sign Up Here"
            : "Already have an account? Log In Here"}
        </p>,
        <div className="logInSignUp-agree">
          {!isLogin && (
            <>
              <input type="checkbox" />
              <p>
                By continuing, I agree to the terms of use & privacy policy.
              </p>
            </>
          )}
        </div>
        </>
        ): (<button onClick={handleLogout}>Logout</button>
        )}
      </div>
      </> : ""}
    </div>
  );


};

export default LoginSignUp;

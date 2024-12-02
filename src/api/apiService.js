import axios from "axios";
const token = localStorage.getItem('token')

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:3001", // API base URL
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve the token from local storage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Add Authorization header
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);


// src/api/apiEndpoints.js
const apiEndpoints = {
  // Collections APIs
  getAllCollections: '/collections',
  getCollectionById: (id) => `/collections/${id}`,
  createCollection: '/collections',
  updateCollection: (id) => `/collections/${id}`,
  deleteCollection: (id) => `/collections/${id}`,
  // Users APIs
  SignUpUser: '/signup',
  LoginUser: '/login',
  LogOutUser: '/logout',
  // Cart
  getCart: '/cart',
  // CartItems
  createCartItems: '/cart/cart_items',
  removeCartItem: (id) => `/cart/cart_items/${id}`,
  updateCartItemQuantity: (id) => `/cart/cart_items/${id}`
};

export { api, apiEndpoints };

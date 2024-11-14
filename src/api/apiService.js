import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:3001', // API base URL
  headers: {
    // 'Content-Type': 'application/json',
  },
});

// Centralized error handling (can be customized)
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API error:', error);
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
};

export { api, apiEndpoints };

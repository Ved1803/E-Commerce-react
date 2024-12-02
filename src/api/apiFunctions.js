import { api, apiEndpoints } from "./apiService";

// Collection APIs
export const getAllCollections = () => api.get(apiEndpoints.getAllCollections);
export const getCollectionById = (id) =>
  api.get(apiEndpoints.getCollectionById(id));
export const createCollection = (data) =>
  api.post(apiEndpoints.createCollection, data);
export const updateCollection = (id, data) =>
  api.put(apiEndpoints.updateCollection(id), data);
export const deleteCollection = (id) => api.delete(apiEndpoints.deleteCollection(id));
export const SignUpUser = (data) => api.post(apiEndpoints.SignUpUser, data);
export const LoginUser = (data) => api.post(apiEndpoints.LoginUser, data);
export const LogOutUser = (data) => api.delete(apiEndpoints.LogOutUser,data);
export const getCart = () => api.get(apiEndpoints.getCart);
export const createCartItems = (data) => api.post(apiEndpoints.createCartItems, data);
export const removeCartItem = (id) => api.delete(apiEndpoints.removeCartItem(id));
export const updateCartItemQuantity = (id, data) => api.patch(apiEndpoints.updateCartItemQuantity(id), data);

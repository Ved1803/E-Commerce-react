import { api, apiEndpoints } from "./apiService";

// Collection APIs
export const getAllCollections = () => api.get(apiEndpoints.getAllCollections);
export const getCollectionById = (id) =>
  api.get(apiEndpoints.getCollectionById(id));
export const createCollection = (data) =>
  api.post(apiEndpoints.createCollection, data);
export const updateCollection = (id, data) =>
  api.put(apiEndpoints.updateCollection(id), data);
export const deleteCollection = (id) =>
  api.delete(apiEndpoints.deleteCollection(id));

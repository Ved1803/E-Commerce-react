import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAllCollections, deleteCollection } from "../api/apiFunctions";


const CollectionsManager = () => {
  const [collections, setCollections] = useState([]);
  const navigate = useNavigate(); // Use the navigate hook for redirection

  // Fetch collections from API
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await getAllCollections();
        setCollections(response.data);
        console.log(collections);
      } catch (err) {
        console.error("Error fetching collections:", err);
      }
    };

    fetchCollections();
  }, []);

  // Redirect to the details page when clicking a collection name
  const handleNameClick = (id) => {
    navigate(`/collections/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCollection(id); // Call the delete API
      setCollections(collections.filter((collection) => collection.id !== id)); // Update the state
      alert("Collection deleted successfully");
    } catch (error) {
      console.error("Error deleting collection:", error);
      alert("Failed to delete the collection");
    }
  };

  return (
    <div>
      <h2>All Collections</h2>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>New Price</th>
            <th>Old Price</th>
            <th>Category</th>
            <th>New Collection</th>
            <th>Manage</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {collections.map((collection) => (
            <tr key={collection.id}>
              <td
                style={{
                  cursor: "pointer",
                  color: "black",
                  textDecoration: "underline",
                }}
                onClick={() => handleNameClick(collection.id)}
              >
                {collection.name}
              </td>
              <td>${collection.new_price}</td>
              <td>${collection.old_price}</td>
              <td>{collection.category}</td>
              <td>{collection.new_collection ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => handleDelete(collection.id)}>
                  Delete
                </button>
              </td>
              <td>{collection.image_url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CollectionsManager;

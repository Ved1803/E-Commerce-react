// Components/CollectionsManager.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import CollectionForm from "./CollectionForm";

const CollectionsManager = () => {
  const [formV, setFormV] = useState(false);
  const [formDataManage, setFormDataManage] = useState(false)
  const [collections, setCollections] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    newCollection: false,
  });
  const [selectedCollection, setSelectedCollection] = useState(null);

  // Fetch collections from API
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get("http://localhost:3001/collections");
        setCollections(response.data);
      } catch (err) {
        console.error("Error fetching collections:", err);
      }
    };

    fetchCollections();
  }, []);

  // Handle adding a new collection
  const handleAddCollection = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/collections",
        formData
      );
      setCollections([...collections, response.data]);
      console.log(response.data);
      setFormData({
        name: "",
        newCollection: false,
      }); // Reset form
    } catch (error) {
      console.error("Error creating collection:", error);
    }
  };

  // Handle input change for form
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    const newValue =
      type === "number" ? Number(value) : type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  // Handle clicking a collection to fetch details
  const handleCollectionClick = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/collections/${id}`
      );
      setSelectedCollection(response.data);
    } catch (error) {
      console.error("Error fetching collection details:", error);
    }
  };

  return (
    <div>
      <h1>Collections</h1>
      <button
        onClick={() => {
          setFormV(!formV);
        }}
      >
        {formV ? "Close Form" : "Add New Collection"}
      </button>

      {formV && (
        <CollectionForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleAddCollection={handleAddCollection}
        />
      )}
      <button onClick={()=> {
        setFormDataManage(!formDataManage)
      }}>All Collections</button>

      {
        formDataManage ? (<>
         <h2>All Collections</h2>
      <ul>
        {collections.map((collection) => (
          <li
            key={collection.id}
            onClick={() => handleCollectionClick(collection.id)}
          >
            <h3>Name: {collection.name}</h3>
            <p>New Price: ${collection.new_price}</p>
            <p>Old Price: ${collection.old_price}</p>
            <p>
              {collection.new_collection
                ? "New Collection!"
                : "Regular Collection"}
            </p>
          </li>
        ))}
      </ul>

      {selectedCollection && (
        <div>
          <h2>Collection Details</h2>
          <p>Name: {selectedCollection.name}</p>
          <p>New Price: ${selectedCollection.new_price}</p>
          <p>Old Price: ${selectedCollection.old_price}</p>
          <p>
            {selectedCollection.new_collection
              ? "New Collection!"
              : "Regular Collection"}
          </p>
        </div>
      )}
        </>) : ("")
      }

    </div>
  );
};

export default CollectionsManager;

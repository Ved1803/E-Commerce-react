import React, { useState, useEffect } from "react";
import CollectionForm from './CollectionForm';
import { createCollection } from "../api/apiFunctions";

const FormShow = () => {

    const [collections, setCollections] = useState([]);
    const [formData, setFormData] = useState({
      name: "",
      category: "",
      newCollection: false,
      image: null, 
    });
    
    // Handle adding a new collection
    const handleAddCollection = async () => {
      try {
        console.log(formData, "formdata----------");
        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
          console.log(typeof key, 'key value');
          formDataToSend.append(key, formData[key]);
        });
        console.log(formDataToSend, "formdata to semnnd:----------");
        const response = await createCollection(formDataToSend);
        setCollections([...collections, response.data]);
        console.log(response.data);
        setFormData({
          name: "",
          category: "",
          new_price: "",
          old_price: "",
          new_collection: false,
          image: null,
        }); // Reset formjm
      } catch (error) {
        console.error("Error creating collection:", error);
      }
    };

    // Handle input change for form
    const handleInputChange = (e) => {
      const { name, value, type, checked, files } = e.target;

      const newValue =
        type === "number"
          ? Number(value)
          : type === "checkbox"
          ? checked
          : value;
      setFormData({
        ...formData,
        [name]: newValue,
      });
    };

    return (
      <>
        <CollectionForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleAddCollection={handleAddCollection}
        />
      </>
    );
}

export default FormShow

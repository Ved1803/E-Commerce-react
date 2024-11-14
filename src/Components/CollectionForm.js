import React, { useState, useRef } from "react";
import "./CollectionForm.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const CollectionForm = ({
  formData,
  handleInputChange,
  handleAddCollection,
  }) => {
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleInputChange({ target: { name: "image", value: file } });
  };



  return (
    <div className="form-container">
      <h1 className="form-title">Add New Collection</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddCollection();
          alert("Successfully Created");
        }}
      >
        <div className="form-group">
          <label htmlFor="name">Collection Name:</label>
          <input
            type="text"
            id="name" // Use id for accessibility
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Collection Name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Collection Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            ref={fileInputRef} // Attach the ref here
            onChange={handleFileChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category} // Bind the value to formData
            onChange={handleInputChange} // Add onChange handler to capture changes
            required
          >
            <option value="">Select...</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="new_price">New Price:</label>
          <input
            type="number"
            id="new_price" // Use id for accessibility
            name="new_price"
            value={formData.new_price}
            onChange={handleInputChange}
            placeholder="New Price"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="old_price">Old Price:</label>
          <input
            type="number"
            id="old_price" // Use id for accessibility
            name="old_price"
            value={formData.old_price}
            onChange={handleInputChange}
            placeholder="Old Price"
            required
          />
        </div>
        <div className="form-group">
          <label style={{ fontWeight: "normal" }}>
            <input
              type="checkbox"
              name="newCollection"
              checked={formData.newCollection}
              onChange={handleInputChange}
            />
            New Collection
          </label>
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>

        <button
          type="button"
          className="get-collections-button"
          onClick={() => navigate("/collections")} // Navigate to the All Collections page
        >
          Get All Collections
        </button>
      </form>
    </div>
  );
};

export default CollectionForm;

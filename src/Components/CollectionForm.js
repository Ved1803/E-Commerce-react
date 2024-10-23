import React from 'react';

const CollectionForm = ({ formData, handleInputChange, handleAddCollection }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleAddCollection();
      }}
    >
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Collection Name"
        required
      />
      <input
        type="number"
        name="new_price"
        value={formData.new_price}
        onChange={handleInputChange}
        placeholder="New Price"
        required
      />
      <input
        type="number"
        name="old_price"
        value={formData.old_price}
        onChange={handleInputChange}
        placeholder="Old Price"
        required
      />
      <label>
        New Collection:
        <input
          type="checkbox"
          name="newCollection"
          checked={formData.newCollection}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CollectionForm;

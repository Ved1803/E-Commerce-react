import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getCollectionById } from "../api/apiFunctions";

const Collection = () => {
  const { id } = useParams(); // Get the collection ID from the URL
  const [collection, setCollection] = useState(null);

  // Fetch the collection details when the component loads
  useEffect(() => {
    const fetchCollectionDetails = async () => {
      try {
        const response = await getCollectionById
        setCollection(response.data);
      } catch (error) {
        console.error("Error fetching collection details:", error);
      }
    };

    fetchCollectionDetails();
  }, [id]);

  if (!collection) {
    return <p>Loading collection details...</p>;
  }

  return (
    <div>
      <h2>Collection Details</h2>
      <table border="1" style={{ width: "50%", borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{collection.name}</td>
          </tr>
          <tr>
            <td>New Price</td>
            <td>${collection.new_price}</td>
          </tr>
          <tr>
            <td>Old Price</td>
            <td>${collection.old_price}</td>
          </tr>
          <tr>
            <td>New Collection</td>
            <td>{collection.new_collection ? "Yes" : "No"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Collection;
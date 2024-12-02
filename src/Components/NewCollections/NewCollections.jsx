import React, { useState, useEffect } from "react";
import "./NewCollections.css";
import Item from "../Item/Item";
import { getAllCollections } from "../../api/apiFunctions";
// import axios from "axios";
// import Image from "../Assets/product_13.png";

const NewCollections = () => {
  const [collections, setCollections] = useState([]);

  // Fetch collections from API
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await getAllCollections();
        setCollections(response.data);
      } catch (err) {
        console.error("Error fetching collections:", err);
      }
    };

    fetchCollections();
  }, []);

  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {collections?.map((item, i) => {
          {/* console.log(item) */}
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image_url}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewCollections;

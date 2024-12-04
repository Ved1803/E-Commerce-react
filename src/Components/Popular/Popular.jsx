import React, { useState, useEffect } from "react";
import "./Popular.css";
import Item from "../Item/Item";
import { getAllCollections } from "../../api/apiFunctions";

const PopularForWomen = () => {
  const [popularCollections, setpopularCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await getAllCollections();
        setpopularCollections(response.data);
      } catch (err) {
        console.error("Error fetching collections:", err);
      }
    };
    fetchCollections();
  }, []);

  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {popularCollections
          .filter(
            (item) => item.new_collection === true && item.category === "women"
          )
          .map((item, i) => {
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

export default PopularForWomen;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Breadcrum from "../Components/Breadcrum/Breadcrum";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";
import { getCollectionById } from "../api/apiFunctions";

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchCollectionDetails = async () => {
      try {
        const response = await getCollectionById(productId);
          console.log(response, "collection ..............................");
          setProduct(response.data);
      } catch (error) {
        console.error("Error fetching collection details:", error);
      }
    };
    fetchCollectionDetails();
  }, [productId]); // Added dependency

  if(!product){
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
};

export default Product;

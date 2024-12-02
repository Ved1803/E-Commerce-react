import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { createCartItems } from "../../api/apiFunctions";

const ProductDisplay = (props) => {
  const { product } = props;
  const {addToCart} = useContext(ShopContext)
  
  const addToCardData = async (id, total) => {
    console.log(id,'dsfadsfafadsf');
    const updatedData = {
      collection_id: id,
      quantity: 1,
      total: total,
    };
    try {
      const response = await createCartItems(updatedData);
      console.log(response,'created cart');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="productDisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image_url} alt="" />
          <img src={product.image_url} alt="" />
          <img src={product.image_url} alt="" />
          <img src={product.image_url} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image_url} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ${product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          Made from ultra-soft, high-quality cotton blend, this sweatshirt
          ensures that your child stays warm and comfortable throughout the day.
          The fabric is gentle on the skin, making it ideal for playtime,
          school, or cozying up on chilly evenings.
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button onClick={()=>{
          addToCart(product.id)
          addToCardData(product.id, product.new_price);
        }}>ADD TO CART</button>
        <p className="productdisplay-right-category"><span>Category : </span>Woman, T-Shirt, Crop Top</p>
        <p className="productdisplay-right-category"><span>Tags : </span>Modern, latest</p>
      </div>
    </div>
  );
};

export default ProductDisplay;

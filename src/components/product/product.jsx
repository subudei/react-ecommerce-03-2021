import React from "react";
import Button from "../forms/button/button";
import "./product.styles.css";

function Product({
  productThumbnail,
  productPrice,
  productDescription,
  productName,
}) {
  if (!productThumbnail || !productName || typeof productPrice === "undefined")
    return null;

  const configAddToCartBtn = {
    type: "button",
  };

  return (
    <div className="product">
      <div className="thumbnail">
        <img src={productThumbnail} alt={productName} />
      </div>
      <div className="details">
        <ul>
          <li>
            <span className="product__name">{productName}</span>
          </li>
          <li>
            <span>{productDescription}</span>
          </li>
          <li>
            <span className="product__price">$ {productPrice}</span>
          </li>
          <li>
            <div className="add__to__cart">
              <Button {...configAddToCartBtn}>Add to cart</Button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Product;

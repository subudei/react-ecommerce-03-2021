import React from "react";

import { Link } from "react-router-dom";

import Button from "../forms/button/button";
import "./product.styles.css";

function Product({
  documentID,
  productThumbnail,
  productPrice,
  productDescription,
  productName,
}) {
  if (
    !documentID ||
    !productThumbnail ||
    !productName ||
    typeof productPrice === "undefined"
  )
    return null;

  const configAddToCartBtn = {
    type: "button",
  };

  return (
    <div className="product">
      <div className="thumbnail">
        <Link to={`/product/${documentID}`}>
          <img src={productThumbnail} alt={productName} />
        </Link>
      </div>
      <div className="details">
        <ul>
          <li>
            <span className="product__name">
              <Link to={`/product/${documentID}`}>{productName}</Link>
            </span>
          </li>
          {/* <li>
            <span>{productDescription}</span>
          </li> */}
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

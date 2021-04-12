import React from "react";
import "./product.styles.css";

import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addProduct } from "../../redux/cart/cart.actions";

import Button from "../forms/button/button";

function Product(product) {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    documentID,
    productThumbnail,
    productPrice,
    productDescription,
    productName,
  } = product;

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

  const handleAddToCart = (product) => {
    if (!product) return;
    dispatch(addProduct(product));
    history.push("/cart");
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
            <div className="product__name">
              <Link to={`/product/${documentID}`}>{productName}</Link>
            </div>
          </li>
          <li>
            <div className="product__price">$ {productPrice}</div>
          </li>
          <li>
            <div className="add__to__cart">
              <Button
                {...configAddToCartBtn}
                onClick={() => handleAddToCart(product)}
              >
                Add to cart
              </Button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Product;

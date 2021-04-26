import React from "react";

import { useDispatch } from "react-redux";

import {
  removeCartItem,
  addProduct,
  reduceCartItem,
} from "../../../redux/cart/cart.actions";

function Item(product) {
  const dispatch = useDispatch();
  const {
    productName,
    productPrice,
    quantity,
    productThumbnail,
    documentID,
  } = product;

  const handleRemoveCartItem = (documenId) => {
    dispatch(
      removeCartItem({
        documentID,
      })
    );
  };
  const handleAddProduct = (product) => {
    dispatch(addProduct(product));
  };

  const handleReduceItem = (product) => {
    dispatch(reduceCartItem(product));
  };

  return (
    <div className="cart__item">
      <div className="item__props wide">
        <img src={productThumbnail} alt={productName} />
      </div>
      <div className="item__props">{productName}</div>
      <div className="item__props">
        <span className="item__btn" onClick={() => handleReduceItem(product)}>
          {"< "}
        </span>
        <span>{quantity}</span>
        <span className="item__btn" onClick={() => handleAddProduct(product)}>
          {" >"}
        </span>
      </div>
      <div className="item__props">$ {productPrice}</div>
      <div className="item__props">
        <span
          style={{ color: "red", fontWeight: "700" }}
          className="item__btn"
          onClick={() => handleRemoveCartItem(documentID)}
        >
          X
        </span>
      </div>
    </div>
  );
}

export default Item;

// #17 33:00

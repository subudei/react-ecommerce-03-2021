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
    <table className="cart__item" border="0" cellPadding="10" cellSpacing="0">
      <tbody>
        <tr>
          <td>
            <img src={productThumbnail} alt={productName} />
          </td>
          <td>{productName}</td>
          <td>
            <span
              className="item__btn"
              onClick={() => handleReduceItem(product)}
            >
              {"< "}
            </span>
            <span>{quantity}</span>
            <span
              className="item__btn"
              onClick={() => handleAddProduct(product)}
            >
              {" >"}
            </span>
          </td>
          <td>$ {productPrice}</td>
          <td align="center">
            <span
              className="item__btn"
              onClick={() => handleRemoveCartItem(documentID)}
            >
              X
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Item;

// #17 33:00

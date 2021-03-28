import React from "react";

function Item(product) {
  const {
    productName,
    productPrice,
    quantity,
    productThumbnail,
    documentID,
  } = product;
  return (
    <table className="cart__item" border="0" cellPadding="10" cellSpacing="0">
      <tbody>
        <tr>
          <td>
            <img src={productThumbnail} alt={productName} />
          </td>
          <td>{productName}</td>
          <td>
            <span>{quantity}</span>
          </td>
          <td>$ {productPrice}</td>
          <td align="center">
            <span>X</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Item;

import React from "react";
import "./checkout.styles.css";

import Button from "../forms/button/button";

import { useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCartItems } from "../../redux/cart/cart.selectors";
import Item from "./item/item";

const mapState = createStructuredSelector({
  cartItems: selectCartItems,
});

function Checkout({}) {
  const { cartItems } = useSelector(mapState);
  return (
    <div className="checkout__container">
      <h1>Checkout</h1>
      <div className="cart">
        <table
          className="checkout__header"
          border="0"
          cellPadding="0"
          cellSpacing="0"
        >
          <tbody>
            <tr>
              <table
                className="checkout__header"
                border="0"
                cellPadding="0"
                cellSpacing="0"
              >
                <tbody>
                  <tr>
                    <th>Product</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Remove</th>
                  </tr>
                </tbody>
              </table>
            </tr>
            <tr>
              <table border="0" cellSpacing="0" cellPadding="0">
                <tbody>
                  {cartItems.map((item, position) => {
                    return (
                      <tr key={position}>
                        <td>
                          <Item {...item} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </tr>

            <tr>
              <table align="right" border="0" cellPadding="10" cellSpacing="0">
                <tr align="right">
                  <td>
                    <h3>Total:</h3>
                  </td>
                </tr>
                <tr>
                  <table border="0" cellSpacing="0" cellPadding="10">
                    <tbody>
                      <tr>
                        <td>
                          <Button>Continue Shoping</Button>
                        </td>
                        <td>
                          <Button>Checkout</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </tr>
              </table>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Checkout;

//#17 - 07:00

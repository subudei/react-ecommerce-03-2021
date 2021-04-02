import React from "react";
import "./checkout.styles.css";

import Button from "../forms/button/button";

import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selectors";
import Item from "./item/item";

const mapState = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

function Checkout({}) {
  const history = useHistory();
  const { cartItems, total } = useSelector(mapState);
  return (
    <div className="checkout__container">
      <h1>Checkout</h1>
      <div className="cart">
        {cartItems.length > 0 ? (
          <table
            className="checkout__header"
            border="0"
            cellPadding="10"
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
                <table
                  align="right"
                  border="0"
                  cellPadding="10"
                  cellSpacing="0"
                >
                  <tbody>
                    <tr align="right">
                      <td>
                        <h3>Total: {total.toFixed(2)}</h3>
                      </td>
                    </tr>
                    <tr>
                      <table border="0" cellSpacing="10" cellPadding="0">
                        <tbody>
                          <tr>
                            <td>
                              <Button onClick={() => history.goBack()}>
                                Continue Shoping
                              </Button>
                            </td>
                            <td>
                              <Button>Checkout</Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </tr>
                  </tbody>
                </table>
              </tr>
            </tbody>
          </table>
        ) : (
          <p style={{ color: "red" }}>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
}

export default Checkout;

//#17 - 07:00

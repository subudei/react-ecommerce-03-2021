import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import OrderDetails from "../../order-details/orderDetails";

import { getOrderDetailsStart } from "../../../redux/orders/orders.actions";

const mapState = ({ ordersData }) => ({
  orderDetails: ordersData.orderDetails,
});

function Order() {
  const { orderID } = useParams();
  const dispatch = useDispatch();
  const { orderDetails } = useSelector(mapState);
  const { orderTotal } = orderDetails;

  useEffect(() => {
    dispatch(getOrderDetailsStart(orderID));
  }, []);

  return (
    <div>
      <h1>Order ID: #{orderID}</h1>
      <OrderDetails order={orderDetails} />
      <h3>Total: $ {orderTotal}</h3>
      {/* <h3>Total: $ {orderTotal.toFixed(2)}</h3> */}
    </div>
  );
}

export default Order;

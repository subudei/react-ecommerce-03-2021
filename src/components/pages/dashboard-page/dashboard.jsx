import React, { useEffect } from "react";
import "./dshboard.styles.css";

import { useDispatch, useSelector } from "react-redux";

import OrderHistory from "../../order-history/orderHistory";

import { getUserOrderHistory } from "../../../redux/orders/orders.actions";

const mapState = ({ user, ordersData }) => ({
  currentUser: user.currentUser,
  orderHistory: ordersData.orderHistory.data,
});
function Dashboard(props) {
  const dispatch = useDispatch();
  const { currentUser, orderHistory } = useSelector(mapState);

  useEffect(() => {
    dispatch(getUserOrderHistory(currentUser.id));
  }, []);
  return (
    <div>
      <h1>Order History</h1>
      <OrderHistory orders={orderHistory} />
    </div>
  );
}

export default Dashboard;

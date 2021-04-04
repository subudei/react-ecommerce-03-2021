import ordersTypes from "./orders.types";

import { takeLatest, put, all, call } from "redux-saga/effects";
import { handleSaveOrder } from "./orders.helpers";
import { auth } from "../../firebase/utils";

export function* saveOrder({ payload }) {
  try {
    const timestamps = new Date().toDateString();
    yield handleSaveOrder({
      ...payload,
      orderUserID: auth.currentUser.uid,
      orderCreatedDate: timestamps,
    });
  } catch (err) {
    //console.log(err)
  }
}

export function* onSaveOrderHistoryStart() {
  yield takeLatest(ordersTypes.SAVE_ORDER_HISTORY_START, saveOrder);
}

export default function* ordersSagas() {
  yield all([call(onSaveOrderHistoryStart)]);
}

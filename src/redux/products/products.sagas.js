import { auth } from "../../firebase/utils";
import { all, takeLatest, put, call } from "redux-saga/effects";
import productsTypes from "./products.types";
import { setProducts } from "./products.actions";
import { handleAddProduct, handleFetchProducts } from "./products.helpers";

export function* addProduct({
  payload: { productCategory, productName, productThumbnail, productPrice },
}) {
  try {
    const timestamp = new Date();
    yield handleAddProduct({
      productCategory,
      productName,
      productThumbnail,
      productPrice,
      productAdminUserUID: auth.currentUser.uid,
      createdDate: timestamp,
    });
  } catch (err) {
    //console.log(err)
  }
}

export function* onAddproductStart() {
  yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct);
}

export function* fetchProducts() {
  try {
    const products = yield handleFetchProducts();
    yield put(setProducts(products));
  } catch (err) {
    //console.log(err)
  }
}

export function* onFetchProductsStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts);
}

export default function* productsSagas() {
  yield all([call(onAddproductStart), call(onFetchProductsStart)]);
}

import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import productsReducer from "./products/products.reducer";
import cartReducer from "./cart/cart.reducers";

export default combineReducers({
  user: userReducer,
  productsData: productsReducer,
  cartData: cartReducer,
});

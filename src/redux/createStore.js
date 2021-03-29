import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";

import createSagaMiddleware from "redux-saga";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga"; // after rootReducer !!!

const sagaMiddleware = createSagaMiddleware();
export const middlewares = [thunk, sagaMiddleware, logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga); //must come after the store !!!!!

export const persistor = persistStore(store);

export default { store, persistor };

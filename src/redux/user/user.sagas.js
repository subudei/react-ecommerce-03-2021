import { takeLatest, call, all } from "redux-saga/effects";
import userTypes from "./user.types";
import { signInSucess } from "./user.actions";

export function* emailSignIn({ payload: { email, password } }) {}

export function* onEmailSignInStart() {
  yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}

export default function* userSagas() {
  yield all([call(onEmailSignInStart)]);
}

// sagas 14:00

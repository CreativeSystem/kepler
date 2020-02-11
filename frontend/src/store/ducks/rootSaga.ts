import { all, takeLatest } from "redux-saga/effects";
import { SessionType } from "./session/types";
import { login } from "./session/sagas";

export default function* rootSaga() {
  yield all([takeLatest(SessionType.LOGIN_REQUEST, login)]);
}

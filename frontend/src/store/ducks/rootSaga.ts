import { all, takeLatest } from "redux-saga/effects";

import { login } from "./session/sagas";
import { SessionType } from "./session/types";

export default function* rootSaga() {
  yield all([takeLatest(SessionType.LOGIN_REQUEST, login)]);
}

import { call, put } from "redux-saga/effects";

import api from "@services/api";


import { loginSuccess, loginFailure } from "./actions";

export function* login(action: any) {
  try {
    const response = yield call(api.post, "/auth/", action.payload);
    const {
      token,
      user: {
        id,
        email,
        is_superuser: superUser,
        first_name: firstName,
        last_name: lastName,
      },
    } = response.data;
    const profile = {
      id,
      email,
      superUser,
      firstName,
      lastName,
    };
    yield put(loginSuccess({ token, profile }));
  } catch (err) {
    yield put(loginFailure());
  }
}

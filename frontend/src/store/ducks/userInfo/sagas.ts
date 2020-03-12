import { call, put } from "redux-saga/effects";

import api from "@services/api";

import {
  dataRegisterSuccess,
  dataRegisterFailure,
  dataConsultSuccess,
  dataConsultFailure,
} from "./actions";

export function* dataRegister(action: any) {
  try {
    yield call(api.post, "/user-info/", action.payload);
    yield put(dataRegisterSuccess());
  } catch (err) {
    yield put(dataRegisterFailure());
  }
}

export function* dataConsult(action: any) {
  try {
    yield call(api.get, "/user-info/", action.payload);
    yield put(dataConsultSuccess());
  } catch (err) {
    yield put(dataConsultFailure());
  }
}

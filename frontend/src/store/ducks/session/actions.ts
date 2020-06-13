import { action } from "typesafe-actions";

import { ILogin, SessionType, ILoginSuccess } from "./types";

export const loginRequest = (data: ILogin) => action(SessionType.LOGIN_REQUEST, data);

export const loginSuccess = (data: ILoginSuccess) => action(SessionType.LOGIN_SUCCESS, data);

export const loginFailure = () => action(SessionType.LOGIN_FAILURE);

export const logoutRequest = () => action(SessionType.LOGOUT_REQUEST);

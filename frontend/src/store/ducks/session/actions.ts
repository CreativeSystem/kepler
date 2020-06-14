import { action } from "typesafe-actions";

import { ILogin, SessionType } from "./types";

export const loginRequest = (data: ILogin) => action(SessionType.LOGIN_REQUEST, data);

export const loginSuccess = (token: string) => action(SessionType.LOGIN_SUCCESS, token);

export const loginFailure = () => action(SessionType.LOGIN_FAILURE);

export const logoutRequest = () => action(SessionType.LOGOUT_REQUEST);

import { action } from "typesafe-actions";

import { IUserData, IUserId, UserInfoType } from "./types";

export const dataRegisterRequest = (data: IUserData) => action(UserInfoType.DATA_REGISTER_REQUEST, data);

export const dataRegisterSuccess = () => action(UserInfoType.DATA_REGISTER_SUCCESS);

export const dataRegisterFailure = () => action(UserInfoType.DATA_REGISTER_FAILURE);

export const dataConsultRequest = (data: IUserId) => action(UserInfoType.DATA_CONSULT_REQUEST, data);

export const dataConsultSuccess = () => action(UserInfoType.DATA_CONSULT_SUCCESS);

export const dataConsultFailure = () => action(UserInfoType.DATA_CONSULT_REQUEST);

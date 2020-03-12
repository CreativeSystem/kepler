export enum UserInfoType {
  DATA_REGISTER_REQUEST = "@userInfo/DATA_REGISTER_REQUEST",
  DATA_REGISTER_SUCCESS = "@userInfo/DATA_REGISTER_SUCCESS",
  DATA_REGISTER_FAILURE = "@userInfo/DATA_REGISTER_FAILURE",
  DATA_CONSULT_REQUEST = "@userInfo/DATA_CONSULT_REQUEST",
  DATA_CONSULT_SUCCESS = "@userInfo/DATA_CONSULT_SUCCESS",
  DATA_CONSULT_FAILURE = "@userInfo/DATA_CONSULT_FAILURE"
}

export interface IUserData {
  name: string;
  whatsapp?: string;
  telephone?: string;
  birthDate: string;
  interests: string[];
}

export interface IUserId {
  id: number;
}

export interface UserInfoState {
  readonly loading: boolean;
  readonly error: boolean;
  readonly userData?: IUserData;
}

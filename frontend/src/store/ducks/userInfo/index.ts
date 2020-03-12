import { Reducer } from "redux";

import { UserInfoState, UserInfoType } from "./types";

const INITIAL_STATE: UserInfoState = {
  loading: false,
  error: false,
  userData: undefined,
};

const reducer: Reducer<UserInfoState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserInfoType.DATA_REGISTER_REQUEST:
      return { ...state, loading: true, error: false };
    case UserInfoType.DATA_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        userData: action.payload.userData,
      };
    case UserInfoType.DATA_REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        userData: undefined,
      };
    case UserInfoType.DATA_CONSULT_REQUEST:
      return { ...state, loading: true, error: false };
    case UserInfoType.DATA_CONSULT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        userData: action.payload.userData,
      };
    case UserInfoType.DATA_CONSULT_FAILURE:
      return {
        ...state, loading: false, error: true, userData: undefined,
      };
    default:
      return state;
  }
};

export default reducer;

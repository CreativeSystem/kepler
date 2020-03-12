import { Reducer } from "redux";

import { SessionState, SessionType } from "./types";

const INITIAL_STATE: SessionState = {
  token: undefined,
  loading: false,
  error: false,
  isAuthenticated: false,
  profile: undefined,
};

const reducer: Reducer<SessionState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SessionType.LOGIN_REQUEST:
      return { ...state, loading: true, error: false };
    case SessionType.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        token: action.payload.token,
        profile: action.payload.profile,
        isAuthenticated: true,
      };
    case SessionType.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        token: undefined,
        profile: undefined,
        isAuthenticated: false,
      };
    case SessionType.LOGOUT_REQUEST:
      return {
        ...state,
        loading: false,
        error: false,
        token: undefined,
        profile: undefined,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default reducer;

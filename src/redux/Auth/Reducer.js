import {
  GETUSER_FAILURE,
  GETUSER_SUCCESS,
  GETUSER_REQ,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_REQ,
  LOGOUT_REQ,
  SIGNUP_FAILURE,
  SIGNUP_REQ,
  SIGNUP_SUCCESS,
  REFRESH_FAILURE,
  REFRESH_REQ,
  REFRESH_SUCCESS,
} from "./ActionType";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQ:
    case LOGIN_REQ:
    case GETUSER_REQ:
    case REFRESH_REQ:
      return { ...state, loading: true, error: null };

    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
    case REFRESH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case GETUSER_SUCCESS:
      return { ...state, loading: false, error: null, user: action.payload };

    case SIGNUP_FAILURE:
    case LOGIN_FAILURE:
    case GETUSER_FAILURE:
    case REFRESH_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case LOGOUT_REQ:
      return { ...initialState };

    default:
      return state;
  }
};

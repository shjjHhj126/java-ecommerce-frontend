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
} from "./ActionType";
const initial_state = {
  user: null,
  loading: false,
  error: null,
  jwt: null,
};

export const authReducer = (state = initial_state, action) => {
  switch (action.type) {
    case SIGNUP_REQ:
    case LOGIN_REQ:
    case GETUSER_REQ:
      return { ...state, loading: true, error: null };

    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return { ...state, loading: false, error: null, jwt: action.payload };
    case GETUSER_SUCCESS:
      return { ...state, loading: false, error: null, user: action.payload };

    case SIGNUP_FAILURE:
    case LOGIN_FAILURE:
    case GETUSER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case LOGOUT_REQ:
      return { ...initial_state };

    default:
      return state;
  }
};

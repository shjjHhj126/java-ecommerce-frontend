import {
  SIGNUP_REQ,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQ,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GETUSER_REQ,
  GETUSER_SUCCESS,
  GETUSER_FAILURE,
  LOGOUT_REQ,
  REFRESH_REQ,
  REFRESH_SUCCESS,
  REFRESH_FAILURE,
} from "./ActionType";
import { api } from "../../config/ApiConfig";

const signupReq = () => ({ type: SIGNUP_REQ });
const signupSuccess = (tokens) => ({ type: SIGNUP_SUCCESS, payload: tokens });
const signupFailure = (error) => ({ type: SIGNUP_FAILURE, payload: error });

const loginReq = () => ({ type: LOGIN_REQ });
const loginSuccess = (tokens) => ({ type: LOGIN_SUCCESS, payload: tokens });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

const getUserReq = () => ({ type: GETUSER_REQ });
const getUserSuccess = (user) => ({ type: GETUSER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GETUSER_FAILURE, payload: error });

const refreshReq = () => ({ type: REFRESH_REQ });
const refreshSuccess = (tokens) => ({ type: REFRESH_SUCCESS, payload: tokens });
const refreshFailure = (error) => ({ type: REFRESH_FAILURE, payload: error });

// (data) => (thunk function, can be async, thunk give this power)
export const signup = (data) => async (dispatch) => {
  dispatch(signupReq());

  try {
    const res = await api.post("/auth/register", data);
    const tokens = res.data;

    if (tokens.accessToken) {
      localStorage.setItem("accessToken", tokens.accessToken);
    }

    dispatch(signupSuccess(tokens));
  } catch (err) {
    dispatch(signupFailure(err.message));
    console.log(err.message);
  }
};

export const login = (data) => async (dispatch) => {
  dispatch(loginReq());

  try {
    const res = await api.post("/auth/authenticate", data);
    const tokens = res.data;

    if (tokens.accessToken) {
      localStorage.setItem("accessToken", tokens.accessToken);
    }
    dispatch(loginSuccess(tokens));
  } catch (err) {
    dispatch(loginFailure(err.message));
  }
};

export const getUser = (accessToken) => async (dispatch) => {
  dispatch(getUserReq());

  try {
    const res = await api.get(`/users/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const user = res.data;

    dispatch(getUserSuccess(user));
  } catch (err) {
    dispatch(getUserFailure(err.message));
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT_REQ, payload: null });
  localStorage.clear();
};

export const refresh = (refreshToken) => async (dispatch) => {
  dispatch({ type: REFRESH_REQ });
  try {
    const response = await api.get("/auth/refresh-token", {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    const tokens = response.data;

    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);

    dispatch({
      type: REFRESH_SUCCESS,
      payload: tokens,
    });
  } catch (error) {
    dispatch({
      type: REFRESH_FAILURE,
      payload: error.message,
    });
  }
};

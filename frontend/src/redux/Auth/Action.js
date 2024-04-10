import { API_BASE_URL } from "../../config/apiConfig";
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
} from "./ActionType";
import axios from "axios";
import { api } from "../../config/apiConfig";

const signupReq = () => ({ type: SIGNUP_REQ });
const signupSuccess = (user) => ({ type: SIGNUP_SUCCESS, payload: user });
const signupFailure = (error) => ({ type: SIGNUP_FAILURE, payload: error });

const loginReq = () => ({ type: LOGIN_REQ });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

const getUserReq = () => ({ type: GETUSER_REQ });
const getUserSuccess = (user) => ({ type: GETUSER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GETUSER_FAILURE, payload: error });

// (data) => (thunk function, can be async, thunk give this power)
export const signup = (data) => async (dispatch) => {
  dispatch(signupReq());

  try {
    const res = await api.post("/auth/signup", data);
    const user = res.data;

    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
    }

    dispatch(signupSuccess(user.jwt));
  } catch (err) {
    dispatch(signupFailure(err.message));
    console.log(err.message);
  }
};

export const login = (data) => async (dispatch) => {
  dispatch(loginReq());

  try {
    const res = await api.post("/auth/login", data);
    const user = res.data;
    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
    }
    dispatch(loginSuccess(user.jwt));
  } catch (err) {
    dispatch(loginFailure(err.message));
  }
};

export const getUser = (jwt) => async (dispatch) => {
  dispatch(getUserReq());

  try {
    const res = await api.get(`/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
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

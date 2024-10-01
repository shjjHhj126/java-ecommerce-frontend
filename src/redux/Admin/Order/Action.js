import { api } from "../../../config/ApiConfig";
import {
  CANCEL_ORDER_FAILURE,
  CANCEL_ORDER_REQ,
  CANCEL_ORDER_SUCCESS,
  CONFIRM_ORDER_FAILURE,
  CONFIRM_ORDER_REQ,
  CONFIRM_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE,
  DELETE_ORDER_REQ,
  DELETE_ORDER_SUCCESS,
  DELIVER_ORDER_FAILURE,
  DELIVER_ORDER_REQ,
  DELIVER_ORDER_SUCCESS,
  GET_ORDERS_FAILURE,
  GET_ORDERS_REQ,
  GET_ORDERS_SUCCESS,
  SHIP_ORDER_FAILURE,
  SHIP_ORDER_REQ,
  SHIP_ORDER_SUCCESS,
} from "./ActionType";

export const getOrders = () => async (dispatch) => {
  dispatch({ type: GET_ORDERS_REQ });
  try {
    const { data } = await api.get("/api/admin/orders/");
    dispatch({ type: GET_ORDERS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: GET_ORDERS_FAILURE, payload: err.message });
  }
};

export const confirmOrder = (orderId) => async (dispatch) => {
  dispatch({ type: CONFIRM_ORDER_REQ });
  try {
    const { data } = await api.put(`/api/admin/orders/confirm/${orderId}`);
    dispatch({ type: CONFIRM_ORDER_SUCCESS, payload: data });
    console.log("confirmed order : ", data);
  } catch (err) {
    dispatch({ type: CONFIRM_ORDER_FAILURE, payload: err.message });
  }
};

export const shipOrder = (orderId) => async (dispatch) => {
  dispatch({ type: SHIP_ORDER_REQ });
  try {
    const { data } = await api.put(`/api/admin/orders/ship/${orderId}`);
    dispatch({ type: SHIP_ORDER_SUCCESS, payload: data });
    console.log("shipped order : ", data);
  } catch (err) {
    dispatch({ type: SHIP_ORDER_FAILURE, payload: err.message });
  }
};

export const deliverOrder = (orderId) => async (dispatch) => {
  dispatch({ type: DELIVER_ORDER_REQ });
  try {
    const { data } = await api.put(`/api/admin/orders/deliver/${orderId}`);
    dispatch({ type: DELIVER_ORDER_SUCCESS, payload: data });
    console.log("delivered order : ", data);
  } catch (err) {
    dispatch({ type: DELIVER_ORDER_FAILURE, payload: err.message });
  }
};

export const cancelOrder = (orderId) => async (dispatch) => {
  dispatch({ type: CANCEL_ORDER_REQ });
  try {
    const { data } = await api.put(`/api/admin/orders/cancel/${orderId}`);
    dispatch({ type: CANCEL_ORDER_SUCCESS, payload: data });
    console.log("canceled order : ", data);
  } catch (err) {
    dispatch({ type: CANCEL_ORDER_FAILURE, payload: err.message });
  }
};

export const deleteOrder = (orderId) => async (dispatch) => {
  dispatch({ type: DELETE_ORDER_REQ });
  try {
    const { data } = await api.put(`/api/admin/orders/delete/${orderId}`);
    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data });
    console.log("deleted order : ", data);
  } catch (err) {
    dispatch({ type: DELETE_ORDER_FAILURE, payload: err.message });
  }
};

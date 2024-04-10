import { api } from "../../config/apiConfig";
import {
  GET_ORDER_HISTORY_REQ,
  GET_ORDER_HISTORY_FAILURE,
  GET_ORDER_HISTORY_SUCCESS,
  CREATE_ORDER_REQ,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  GET_ORDER_BY_ID_REQ,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
} from "./ActionType";

export const createOrder = (data) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQ });
  try {
    const { data } = await api.post("/api/orders/", data.address);
    if (data.id) {
      data.navigate({ search: `step=3&order_id=${data.id}` });
    }
    console.log("create order - ", data);
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: CREATE_ORDER_FAILURE, payload: err.message });
  }
};

export const getOrderById = (orderId) => async (dispatch) => {
  console.log("get order by id -", orderId);
  dispatch({ type: GET_ORDER_BY_ID_REQ });
  try {
    const { data } = await api.post(`/api/orders/${orderId}`);

    console.log("create order - ", data);
    dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: GET_ORDER_BY_ID_FAILURE, payload: err.message });
  }
};

export const getOrderHistory = (data) => async (dispatch) => {
  dispatch({ type: GET_ORDER_HISTORY_REQ });
  try {
    const { data } = await api.get("/api/orders/id/user");
    dispatch({ type: GET_ORDER_HISTORY_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: GET_ORDER_HISTORY_FAILURE, payload: err.message });
  }
};

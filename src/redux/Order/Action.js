import { api } from "../../config/apiConfig";
import {
  GET_ORDERS_REQ,
  GET_ORDERS_FAILURE,
  GET_ORDERS_SUCCESS,
  CREATE_ORDER_REQ,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  GET_ORDER_BY_ID_REQ,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
} from "./ActionType";

export const createOrder = (dataReq) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQ });
  try {
    const { data } = await api.post("/api/orders/", dataReq.address);
    if (data.id) {
      dataReq.navigate({ search: `step=3&order_id=${data.id}` });
    }

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: CREATE_ORDER_FAILURE, payload: err.message });
  }
};

export const getOrderById = (orderId) => async (dispatch) => {
  dispatch({ type: GET_ORDER_BY_ID_REQ });
  try {
    const { data } = await api.get(`/api/orders/${orderId}`);
    dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: GET_ORDER_BY_ID_FAILURE, payload: err.message });
  }
};

export const getOrders = (data) => async (dispatch) => {
  dispatch({ type: GET_ORDERS_REQ });
  try {
    const { data } = await api.get("/api/orders/user");
    dispatch({ type: GET_ORDERS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: GET_ORDERS_FAILURE, payload: err.message });
  }
};

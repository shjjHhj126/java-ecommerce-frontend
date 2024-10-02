import { api } from "../../../config/ApiConfig";
import {
  CHANGE_ORDER_STATE_FAILURE,
  CHANGE_ORDER_STATE_REQ,
  CHANGE_ORDER_STATE_SUCCESS,
  GET_ORDERS_FAILURE,
  GET_ORDERS_REQ,
  GET_ORDERS_SUCCESS,
} from "./ActionType";

const accessToken = localStorage.getItem("accessToken");

export const getOrders = () => async (dispatch) => {
  dispatch({ type: GET_ORDERS_REQ });
  try {
    //Todo:orderState, paymentStatus, shippingState
    const { data } = await api.get(`/orders/details`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    dispatch({ type: GET_ORDERS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: GET_ORDERS_FAILURE, payload: err.message });
  }
};

export const changeOrderState = (dataReq) => async (dispatch) => {
  dispatch({ type: CHANGE_ORDER_STATE_REQ });
  try {
    const { data } = await api.put("/management/orders/set-state", dataReq, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch({ type: CHANGE_ORDER_STATE_SUCCESS, payload: data });
    console.log("changed order : ", data);
  } catch (err) {
    dispatch({ type: CHANGE_ORDER_STATE_FAILURE, payload: err.message });
  }
};

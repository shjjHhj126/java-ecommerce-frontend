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
import { api } from "../../config/ApiConfig";
const accessToken = localStorage.getItem("accessToken");

export const createOrder = (dataReq) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQ });
  const jsonData = {
    cartItemIdList: dataReq.cartItemIdList,
  };

  console.log(jsonData);

  try {
    const { data } = await api.post("/orders", jsonData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log(data); //data = order's id
    if (data) {
      dataReq.navigate(`/checkout?step=2&order_id=${data}`);
    }

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: CREATE_ORDER_FAILURE, payload: err.message });
  }
};

export const getOrderById = (orderId) => async (dispatch) => {
  dispatch({ type: GET_ORDER_BY_ID_REQ });
  try {
    const { data } = await api.get(`/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: GET_ORDER_BY_ID_FAILURE, payload: err.message });
  }
};

export const getOrders = (dataReq) => async (dispatch) => {
  dispatch({ type: GET_ORDERS_REQ });
  let url = "/orders/details?";
  if (dataReq?.orderState != undefined) {
    url += `?orderState=${dataReq.orderState}`;
  }

  try {
    const { data } = await api.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch({ type: GET_ORDERS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: GET_ORDERS_FAILURE, payload: err.message });
  }
};

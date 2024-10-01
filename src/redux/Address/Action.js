import {
  GET_ADDRESSES_REQ,
  GET_ADDRESSES_SUCCESS,
  GET_ADDRESSES_FAILURE,
  CREATE_ADDRESS_REQ,
  CREATE_ADDRESS_FAILURE,
  CREATE_ADDRESS_SUCCESS,
  ADD_ADDRESS_FAILURE,
  ADD_ADDRESS_REQ,
  ADD_ADDRESS_SUCCESS,
  DELETE_ADDRESS_REQ,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAILURE,
} from "./ActionType";
import { api } from "../../config/ApiConfig";

const accessToken = localStorage.getItem("accessToken");

export const getAddresses = () => async (dispatch) => {
  dispatch({ type: GET_ADDRESSES_REQ });
  try {
    const response = await api.get("/addresses", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    dispatch({
      type: GET_ADDRESSES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ADDRESSES_FAILURE,
      payload: error.message,
    });
  }
};

export const createAddress = (address) => async (dispatch) => {
  dispatch({ type: CREATE_ADDRESS_REQ });
  console.log("address:", address);

  try {
    const response = await api.post("/addresses", address, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log(response.data);

    dispatch({ type: CREATE_ADDRESS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: CREATE_ADDRESS_FAILURE,
      payload: error.message,
    });
  }
};

export const addAddress = (dataReq) => async (dispatch) => {
  dispatch({ type: ADD_ADDRESS_REQ });
  const addrObj = {
    addressId: dataReq.addressId,
  };

  try {
    const response = await api.put(
      `/orders/${dataReq.orderId}/address`,
      addrObj,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    dispatch({ type: ADD_ADDRESS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: ADD_ADDRESS_FAILURE,
      payload: error.message,
    });
  }
};

export const deleteAddress = (addressId) => async (dispatch) => {
  dispatch({ type: DELETE_ADDRESS_REQ });

  try {
    const response = await api.delete(`/addresses/${addressId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log(response.data);

    dispatch({ type: DELETE_ADDRESS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: DELETE_ADDRESS_FAILURE,
      payload: error.message,
    });
  }
};

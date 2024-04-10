import {
  ADD_ITEM_TO_CART_REQ,
  ADD_ITEM_TO_CART_SUCCESS,
  ADD_ITEM_TO_CART_FAILURE,
  REMOVE_CART_ITEM_REQ,
  REMOVE_CART_ITEM_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
  UPDATE_CART_ITEM_REQ,
  UPDATE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  GET_CART_REQ,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
} from "./ActionType";
import { api } from "../../config/apiConfig";

export const getCart = () => async (dispatch) => {
  dispatch({ type: GET_CART_REQ });
  try {
    const { data } = await api.get("/api/cart/");
    dispatch({ type: GET_CART_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: GET_CART_FAILURE, payload: err.message });
  }
};

export const addItemToCart = (req) => async (dispatch) => {
  dispatch({ type: ADD_ITEM_TO_CART_REQ });
  try {
    const { data } = await api.put("/api/cart/add", req);

    dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data });
    // console.log("data", data);
  } catch (err) {
    console.log(err);
    dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: err.message });
  }
};

export const removeCartItem = (cartItemId) => async (dispatch) => {
  dispatch({ type: REMOVE_CART_ITEM_REQ });
  try {
    const { data } = await api.delete(`/api/cart_items/${cartItemId}`);
    dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: cartItemId });
  } catch (err) {
    dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: err.message });
  }
};

export const updateCartItem = (req) => async (dispatch) => {
  dispatch({ type: UPDATE_CART_ITEM_REQ });
  try {
    const { data } = await api.put(
      `/api/cart_items/${req.cartItemId}`,
      req.data
    );
    dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: err.message });
  }
};

import axios from "axios";
import { api } from "../../config/apiConfig";
import {
  FIND_PRODUCTS_SUCCESS,
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCTS_REQ,
  FIND_PRODUCT_BY_ID_REQ,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_SUCCESS,
} from "./ActionType";
const jwt = localStorage.getItem("jwt");

export const findProducts = (dataReq) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCTS_REQ });
  const {
    color,
    size,
    minPrice,
    maxPrice,
    minDiscount,
    category,
    stock,
    sort,
    pageNum,
    pageSize,
  } = dataReq;

  try {
    const { data } = await api.get(
      `/api/products?color=${color}&size=${size}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&category=${category}&stock=${stock}&sort=${sort}&pageNum=${pageNum}&pageSize=${pageSize}`
    );
    console.log(data);

    dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: FIND_PRODUCTS_FAILURE, payload: err.message });
  }
};

export const findProductById = (dataReq) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_ID_REQ });
  const { productId } = dataReq;
  try {
    const { data } = await api.get(`/api/products/id/${productId}`);
    dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: err.message });
  }
};

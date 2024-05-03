import axios from "axios";
import { api } from "../../config/apiConfig";
import {
  FIND_PRODUCTS_SUCCESS,
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCTS_REQ,
  FIND_PRODUCT_BY_ID_REQ,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_SUCCESS,
  DELETE_PRODUCT_BY_ID_REQ,
  DELETE_PRODUCT_BY_ID_FAILURE,
  DELETE_PRODUCT_BY_ID_SUCCESS,
  CREATE_PRODUCT_REQ,
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_SUCCESS,
} from "./ActionType";
const jwt = localStorage.getItem("jwt");

//special syntax provided by redux-thunk
//given dataReq as input, return async (dispatch)=>{}, that takes dispatch as input
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
    // const { data } = await api.get(`/api/admin/products/all`);
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

export const createProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQ });
    const { data } = await api.post("/api/admin/products/", product);
    console.log(data);
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: CREATE_PRODUCT_FAILURE, payload: err.message });
  }
};

export const deleteProductById = (productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_BY_ID_REQ });
    const { data } = await api.delete(
      `/api/admin/products/delete/${productId}`
    );
    console.log(data);
    dispatch({ type: DELETE_PRODUCT_BY_ID_SUCCESS, payload: productId });
  } catch (err) {
    dispatch({ type: DELETE_PRODUCT_BY_ID_FAILURE, payload: err.message });
  }
};

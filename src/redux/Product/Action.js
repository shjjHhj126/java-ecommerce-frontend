import axios from "axios";
import { api } from "../../config/ApiConfig";
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
  FIND_CATEGORIES_FAILURE,
  FIND_CATEGORIES_SUCCESS,
  FIND_CATEGORIES_REQ,
} from "./ActionType";
const accessToken = localStorage.getItem("accessToken");

//special syntax provided by redux-thunk
//given dataReq as input, return async (dispatch)=>{}, that takes dispatch as input
export const findProducts = (dataReq) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCTS_REQ });
  const {
    minPrice,
    maxPrice,
    minDiscount,
    discountRange,
    categoryId,
    inStock,
    sort,
    pageNum,
    pageSize,
    searchParam,
  } = dataReq;

  try {
    let path = `/products?`;
    if (minPrice) {
      path += `minPrice=${minPrice}&`;
    }
    if (maxPrice) {
      path += `maxPrice=${maxPrice}&`;
    }
    if (minDiscount) {
      path += `minDiscount=${minDiscount}&`;
    }
    if (categoryId) {
      path += `categoryId=${categoryId}&`;
    }
    if (discountRange) {
      //pass 0-100,
      path += `discountRange=${discountRange / 100}&`;
    }
    if (inStock !== undefined) {
      path += `inStock=${inStock}&`;
    }
    if (searchParam !== "" && searchParam != undefined) {
      path += `searchParam=${searchParam}&`;
    }
    if (sort) {
      path += `sort=${sort}&`;
    }
    if (pageNum !== undefined && pageNum > 0) {
      path += `pageNum=${pageNum}&`;
    } else {
      path += `pageNum=0&`;
    }
    if (pageSize) {
      path += `pageSize=${pageSize}&`;
    }

    // Remove the trailing '&'
    path = path.endsWith("&") ? path.slice(0, -1) : path;

    console.log(path);

    const { data } = await api.get(path, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: FIND_PRODUCTS_FAILURE, payload: err.message });
  }
};

export const findProductById = (dataReq) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_ID_REQ });
  const { productId } = dataReq;
  try {
    const { data } = await api.get(`/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(data);
    dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: err.message });
  }
};

export const createProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQ });
    const { data } = await api.post("/management/products", product, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: CREATE_PRODUCT_FAILURE, payload: err.message });
  }
};

export const deleteProductById = (productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_BY_ID_REQ });
    const { data } = await api.delete(`/management/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch({ type: DELETE_PRODUCT_BY_ID_SUCCESS, payload: productId });
  } catch (err) {
    dispatch({ type: DELETE_PRODUCT_BY_ID_FAILURE, payload: err.message });
  }
};

export const findCategories = () => async (dispatch) => {
  try {
    dispatch({ type: FIND_CATEGORIES_REQ });
    const { data } = await api.get(`/categories/top`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch({ type: FIND_CATEGORIES_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: FIND_CATEGORIES_FAILURE, payload: err.message });
  }
};

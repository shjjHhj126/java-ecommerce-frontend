import {
  FIND_PRODUCTS_REQ,
  FIND_PRODUCTS_SUCCESS,
  FIND_PRODUCTS_FAILURE,
  DELETE_PRODUCT_BY_ID_REQ,
  DELETE_PRODUCT_BY_ID_SUCCESS,
  DELETE_PRODUCT_BY_ID_FAILURE,
  CREATE_PRODUCT_REQ,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  FIND_PRODUCT_BY_ID_REQ,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_CATEGORIES_REQ,
  FIND_CATEGORIES_SUCCESS,
  FIND_CATEGORIES_FAILURE,
} from "./ActionType";

const initialState = {
  product: null,
  products: [],
  loading: false,
  error: null,
  categories: null,
};

export const customerProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_PRODUCTS_REQ:
    case FIND_PRODUCT_BY_ID_REQ:
    case DELETE_PRODUCT_BY_ID_REQ:
    case FIND_CATEGORIES_REQ:
      return { ...state, loading: true, error: null };

    case FIND_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload,
      };

    case FIND_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        product: action.payload,
      };

    case FIND_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        categories: action.payload,
      };

    case FIND_PRODUCT_BY_ID_FAILURE:
    case FIND_PRODUCTS_FAILURE:
    case DELETE_PRODUCT_BY_ID_FAILURE:
    case FIND_CATEGORIES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case DELETE_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        deletedProduct: action.payload,
      };
    default:
      return state;
  }
};

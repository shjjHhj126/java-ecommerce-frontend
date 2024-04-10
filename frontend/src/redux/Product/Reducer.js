import {
  FIND_PRODUCT_BY_ID_REQ,
  FIND_PRODUCTS_REQ,
  FIND_PRODUCTS_SUCCESS,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCT_BY_ID_FAILURE,
} from "./ActionType";

const initialState = {
  product: null,
  products: [],
  loading: false,
  error: null,
};

export const customerProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_PRODUCTS_REQ:
    case FIND_PRODUCT_BY_ID_REQ:
      return { ...state, loading: true, error: null };

    case FIND_PRODUCTS_SUCCESS:
      return { ...state, loading: false, products: action.payload };

    case FIND_PRODUCT_BY_ID_SUCCESS:
      return { ...state, loading: false, product: action.payload };

    case FIND_PRODUCT_BY_ID_FAILURE:
    case FIND_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

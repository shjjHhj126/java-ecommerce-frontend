import {
  GET_ORDER_HISTORY_REQ,
  GET_ORDER_HISTORY_FAILURE,
  GET_ORDER_HISTORY_SUCCESS,
  CREATE_ORDER_REQ,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  GET_ORDER_BY_ID_REQ,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
} from "./ActionType";

const initialState = {
  order: null,
  orders: [],
  loading: false,
  error: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQ:
    case GET_ORDER_BY_ID_REQ:
      return { ...state, loading: true, error: null };

    case CREATE_ORDER_SUCCESS:
    case GET_ORDER_BY_ID_SUCCESS:
      return { ...state, loading: false, error: null, order: action.payload };

    case CREATE_ORDER_FAILURE:
    case GET_ORDER_BY_ID_FAILURE:
    case GET_ORDER_HISTORY_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case GET_ORDER_HISTORY_REQ:
      return { ...state, loading: true, orders: [] };
    case GET_ORDER_HISTORY_SUCCESS:
      return { ...state, loading: true, orders: action.payload, error: null };

    default:
      return state;
  }
};

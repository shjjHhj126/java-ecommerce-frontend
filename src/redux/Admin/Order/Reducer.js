import {
  CHANGE_ORDER_STATE_FAILURE,
  CHANGE_ORDER_STATE_REQ,
  CHANGE_ORDER_STATE_SUCCESS,
  GET_ORDERS_FAILURE,
  GET_ORDERS_REQ,
  GET_ORDERS_SUCCESS,
} from "./ActionType";

const initialState = {
  loading: false,
  orders: [],
  error: "",
};

const adminOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS_REQ:
      return { ...state, loading: true };

    case GET_ORDERS_SUCCESS:
      return { loading: false, orders: action.payload, error: "" };

    case GET_ORDERS_FAILURE:
      return { loading: false, orders: [], error: action.payload };

    case CHANGE_ORDER_STATE_REQ:
      return { ...state, loading: true };

    case CHANGE_ORDER_STATE_SUCCESS:
      return { ...state, changedOrder: action.payload, loading: true };

    case CHANGE_ORDER_STATE_FAILURE:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};

export default adminOrderReducer;

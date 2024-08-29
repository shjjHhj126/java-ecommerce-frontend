import {
  CANCEL_ORDER_FAILURE,
  CANCEL_ORDER_REQ,
  CANCEL_ORDER_SUCCESS,
  CONFIRM_ORDER_FAILURE,
  CONFIRM_ORDER_REQ,
  CONFIRM_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE,
  DELETE_ORDER_REQ,
  DELETE_ORDER_SUCCESS,
  DELIVER_ORDER_FAILURE,
  DELIVER_ORDER_REQ,
  DELIVER_ORDER_SUCCESS,
  GET_ORDERS_FAILURE,
  GET_ORDERS_REQ,
  GET_ORDERS_SUCCESS,
  SHIP_ORDER_FAILURE,
  SHIP_ORDER_REQ,
  SHIP_ORDER_SUCCESS,
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

    case CONFIRM_ORDER_REQ:
    case CANCEL_ORDER_REQ:
    case DELIVER_ORDER_REQ:
      return { ...state, loading: true };

    case CONFIRM_ORDER_SUCCESS:
      return { ...state, confirmed: action.payload, loading: true };

    case DELIVER_ORDER_SUCCESS:
      return { ...state, delivered: action.payload, loading: true };

    case DELETE_ORDER_SUCCESS:
      return { ...state, deleted: action.payload, loading: true };

    case CANCEL_ORDER_SUCCESS:
      return { ...state, canceled: action.payload, loading: true };

    case CONFIRM_ORDER_FAILURE:
    case CANCEL_ORDER_FAILURE:
    case DELIVER_ORDER_FAILURE:
      return { ...state, error: action.payload, loading: false };

    case DELETE_ORDER_REQ:
      return { ...state, loading: true };

    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: state.orders.filter((order) => order.id !== action.payload),
      };

    case DELETE_ORDER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case SHIP_ORDER_REQ:
      return { ...state, loading: true, error: null };

    case SHIP_ORDER_SUCCESS:
      return { ...state, loading: false, shipped: action.payload };

    case SHIP_ORDER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default adminOrderReducer;

import {
  GET_ADDRESSES_REQ,
  GET_ADDRESSES_SUCCESS,
  GET_ADDRESSES_FAILURE,
  CREATE_ADDRESS_REQ,
  CREATE_ADDRESS_SUCCESS,
  CREATE_ADDRESS_FAILURE,
  ADD_ADDRESS_REQ,
  ADD_ADDRESS_FAILURE,
  ADD_ADDRESS_SUCCESS,
  DELETE_ADDRESS_REQ,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAILURE,
} from "./ActionType";

const initialState = {
  addresses: [],
  address: null,
  loading: false,
  error: null,
};

export const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADDRESSES_REQ:
    case CREATE_ADDRESS_REQ:
    case ADD_ADDRESS_REQ:
    case DELETE_ADDRESS_REQ:
      return { ...state, loading: true, error: null };

    case GET_ADDRESSES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        addresses: action.payload,
      };

    case DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        addresses: addresses.filter((address) => address.id != action.payload),
        deletedAddressId: action.payload,
      };

    case CREATE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        address: action.payload,
      };

    case ADD_ADDRESS_SUCCESS:
      return state;

    case GET_ADDRESSES_FAILURE:
    case CREATE_ADDRESS_FAILURE:
    case ADD_ADDRESS_FAILURE:
    case DELETE_ADDRESS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

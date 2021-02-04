import {
  GET_ORDERS,
  GET_SPECIFIC_ORDER,
  UPDATE_STATE_ORDER,
  LOGIN_USER
} from '../constants/productConstants.js';


const initialState = {
  allOrders: [],
  order: [],
  user: {},

};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        allOrders: action.payload
      }

    case GET_SPECIFIC_ORDER:
      return {
        ...state,
        order: action.payload
      }

    case UPDATE_STATE_ORDER:
      return {
        ...state,
        order: action.payload
      }
    case LOGIN_USER:
      return {
        user: action.payload
      }

    default:
      return state;
  }
};
import {
  GET_ORDERS,
  GET_SPECIFIC_ORDER,
  UPDATE_STATE_ORDER
} from '../constants/productConstants.js';


const initialState = {
  allOrders: [],
  order: [],

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


    default:
      return state;

  }
};
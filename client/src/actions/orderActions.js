import axios from "axios";
import {GET_ORDERS, GET_SPECIFIC_ORDER, UPDATE_STATE_ORDER} from "../constants/productConstants";

if(localStorage.getItem('data')){
  const accessToken = localStorage.getItem('data')

  axios.interceptors.request.use(
      config =>{
          config.headers.authorization=`Bearer ${accessToken}`;
          return config;
      },
      error =>{
          return Promise.reject(error)
      }
  )
}

export function getAllOrders() {
  return function(dispatch) {
    return axios.get('http://localhost:3001/orders')
      .then(orders => {
        dispatch({ type: GET_ORDERS, payload: orders.data });
      });
  };
}


export function getUserOrder(id) {
  return function(dispatch) {
    return axios.get(`http://localhost:3001/orders/${id}`)
      .then(userOrders => {
        dispatch({ type: GET_SPECIFIC_ORDER, payload: userOrders.data });
      });
  };
};

export function updateStateOrder(orderId, state) {
  return function(dispatch) {
    return axios.put(`http://localhost:3001/orders/${orderId}`, {"state": state})
      .then(order =>{
        dispatch({type: UPDATE_STATE_ORDER, payload: order.data})
      });
  };
};
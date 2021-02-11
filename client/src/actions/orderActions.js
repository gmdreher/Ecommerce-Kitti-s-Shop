import axios from "axios";
import { GET_ORDERS, GET_SPECIFIC_ORDER, UPDATE_STATE_ORDER, MELI_CART } from "../constants/productConstants";



export function getAllOrders() {
  return function (dispatch, getState) {
    if (getState().auth.userInfo !== null) {
      const accessToken = localStorage.getItem('data')

      axios.interceptors.request.use(
        config => {
          config.headers.authorization = `Bearer ${accessToken}`;
          return config;
        },
        error => {
          return Promise.reject(error)
        }
      )
    }
    return axios.get('http://localhost:3001/orders')
      .then(orders => {
        dispatch({ type: GET_ORDERS, payload: orders.data });
      });
  };
}


export function getUserOrder(id) {
  return function (dispatch, getState) {
    if (getState().auth.userInfo !== null) {
      const accessToken = localStorage.getItem('data')

      axios.interceptors.request.use(
        config => {
          config.headers.authorization = `Bearer ${accessToken}`;
          return config;
        },
        error => {
          return Promise.reject(error)
        }
      )
    }
    return axios.get(`http://localhost:3001/orders/${id}`)
      .then(userOrders => {
        dispatch({ type: GET_SPECIFIC_ORDER, payload: userOrders.data });
      });
  };
};

export function updateStateOrder(orderId, state) {

  console.log("RECIBE LA ACCION!", orderId, state);

  return function (dispatch, getState) {
    if (getState().auth.userInfo !== null) {
      const accessToken = localStorage.getItem('data')

      axios.interceptors.request.use(
        config => {
          config.headers.authorization = `Bearer ${accessToken}`;
          return config;
        },
        error => {
          return Promise.reject(error)
        }
      )
    }
    return axios.put(`http://localhost:3001/orders/${orderId}`, { "state": state })
      .then(order => {
        console.log("SE LLEVA EL DISPATCH", order);
        dispatch({ type: UPDATE_STATE_ORDER, payload: order.data })
      });
  };
};

//-----------------------------MELI-----------------------------------//


export const meliPost = (data) => async (dispatch, getState) => {
  try {
    if (getState().auth.userInfo !== null) {
      const accessToken = localStorage.getItem('data')

      axios.interceptors.request.use(
        config => {
          config.headers.authorization = `Bearer ${accessToken}`;
          return config;
        },
        error => {
          return Promise.reject(error)
        }
      )
    }
    console.log(data)
    const algo = await axios.post(`http://localhost:3001/mercadopago/`, { carrito: data })

    console.log("esto es la data de la ction", algo)

    window.location = algo.data.redirect

    dispatch({
      type: MELI_CART,
      payload: algo.data
    })
  } catch (err) {
    console.log("este es el bendito error", err)
  }

};


import axios from 'axios';

import {POST_USER, ADD_TO_CART, LOGIN_USER, LOGOUT_USER, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, GET_PRODUCT_BY_CATEGORY} from '../constants/productConstants.js';
import { POST_USER, ADD_TO_CART, GET_USER, UPDATE_USER, UPDATE_PROMOTE } from '../constants/productConstants.js';


export const getUsers = () => async (dispatch) => {
    try {
        const respuesta = await axios.get('http://localhost:3001/users/');
        dispatch({
            type: GET_USER,
            payload: respuesta.data
        });
    } catch (error) {
        console.log("Error: " + error)
    }
}

export const bloquearUsers = ({ id, banned, fullname, email, password, rol }) => async (dispatch, getState) => {

    if (id) {

        const users = getState().product.user.slice();
        var body = { id, banned, fullname, email, password, rol }

        try {
            const res = await axios.put(`http://localhost:3001/users/${id}`, body);

            users && users.forEach((x) => {

                if (x.id == id) {
                    x.banned = true;
                }
            });

            console.log(users);
            dispatch({
                type: UPDATE_USER,
                payload: users
            });

        } catch (error) {
            console.log("Error: " + error)
        }

    }
}

export const updateToAdmin = ({ id, rol }) => async (dispatch, getState) => {

    if (id) {
        const users = getState().product.user.slice();

        try {
            const res = await axios.put(`http://localhost:3001/auth/promote/${id}`);

            users && users.forEach((x) => {

                if (x.id == id && x.rol !== "admin") {
                    x.rol = "admin";
                }
            });

            console.log("SE VA------", users);

            dispatch({
                type: UPDATE_PROMOTE,
                payload: users
            });
        } catch (error) {
            console.log("Error: " + error)
        }
    }
}



export const postUser = (data) => async (dispatch, getState) => {

    const response = await axios.post('http://localhost:3001/users/', data);
    dispatch({
        type: POST_USER,
        payload: response.data
    })
    if (getState().cart.cartItems.length > 0) {
        const cartItems = getState().cart.cartItems;

        for (var i = 0; i < cartItems.length; i++) {

            const prod = await axios.get(`http://localhost:3001/products/${cartItems[i].id}`)
            const res = await axios.post(`http://localhost:3001/users/${response.data.id}/order`, { productId: cartItems[i].id, price: prod.data.price, quantity: cartItems[i].quantity });
            //este me trae el id de laorden id user y catidad, lo demas lo tengo del localstorage
            let order = {
                description: prod.data.description, id: prod.data.id,
                images: prod.data.images, name: prod.data.name,
                price: prod.data.price, quantity: res.quantity, userId: res.userId,
                orderId: res.id
            }
            dispatch({
                type: ADD_TO_CART,
                payload: order
            });
            localStorage.clear();
        }
    }
}

export const loginUser = (email, password) => {
  return function (dispatch){
    dispatch({type: LOGIN_USER, payload: {email, password}});
    return axios.post('http://localhost:3001/auth/login', {email, password})
      .then(res => {
        dispatch({type: USER_LOGIN_SUCCESS, payload: res.data})
        localStorage.setItem('data', res.data);
        let cartItems = localStorage.getItem('cartItems', )
        dispatch({type: ADD_TO_CART, payload: cartItems})
        localStorage.removeItem('cartItems');
      })
      .catch(error =>{
        dispatch({
          type: USER_LOGIN_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
      })
  }
}


//   => async (dispatch, getState) => {
//   dispatch({type: LOGIN_USER, payload: {email, password}});
//
//   try {
//     const {data} = await axios.post('http://localhost:3001/auth/login', {email, password})
//
//     dispatch({type: USER_LOGIN_SUCCESS, payload: data})
//     localStorage.setItem('data', data);
//   } catch (error) {
//     dispatch({
//       type: USER_LOGIN_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     })
//   }
// }


  
    export const logoutUser = () => (dispatch) => {
      localStorage.removeItem('data')
      dispatch({type: LOGOUT_USER})
    }
  
  


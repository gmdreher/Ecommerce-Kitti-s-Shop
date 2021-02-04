import axios from 'axios';

import {POST_USER, ADD_TO_CART, LOGIN_USER, LOGOUT_USER, GET_PRODUCT_BY_CATEGORY} from '../constants/productConstants.js';

export const postUser = (data) =>async (dispatch, getState)=>{

    const response = await axios.post('http://localhost:3001/users/', data);
    dispatch({
        type:POST_USER,
        payload :response.data
    })
    if(getState().cart.cartItems.length>0){
        const cartItems = getState().cart.cartItems;

          for(var i=0;i<cartItems.length;i++){
        
            const prod = await axios.get(`http://localhost:3001/products/${cartItems[i].id}`)
            const res = await axios.post(`http://localhost:3001/users/${response.data.id}/order`, {productId:cartItems[i].id,price:prod.data.price,quantity:cartItems[i].quantity});
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

export function loginUser (user) {
  return function (dispatch) {
    return axios.post('http://localhost:3001/auth/login', {email: user.email, password: user.password})
      .then(res => {
        dispatch({ type: LOGIN_USER, payload: res.data });
      })
      .catch(err => console.log(err))
  };
}

export function logoutUser (user) {
  return function (dispatch) {
    return axios.post('http://localhost:3001/logout', {email: user.email, password: user.password})
      .then(res => {
        dispatch({ type: LOGOUT_USER, payload: res.data });
      })
      .catch(err => console.log(err))
  };
}

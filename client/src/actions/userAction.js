import axios from 'axios';

import { POST_USER, ADD_TO_CART, LOGIN_USER, LOGOUT_USER,
     USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, GET_USER, UPDATE_USER,
      UPDATE_PROMOTE, GET_USER_BY_ID, UPDATE_PASSWORD, POST_RESERT_PASSWORD, FORGOT_PASSWORD } from '../constants/productConstants.js';


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


export const bloquearUsers = ({ id }) => async (dispatch, getState) => {
    if (id) {
        const users = getState().product.user.slice();

        try {
            const res = await axios.put(`http://localhost:3001/auth/${id}/banned`);

            users && users.forEach((x) => {
                if (x.id == id && x.banned == false) {
                    x.banned = true;
                }
            });

            dispatch({
                type: UPDATE_USER,
                payload: res.data
            });

        } catch (error) {
            console.log("Error: " + error)
        }
    }
}

export const desbloquearUsers = ({ id }) => async (dispatch, getState) => {
    if (id) {
        const users = getState().product.user.slice();

        try {
            const res = await axios.put(`http://localhost:3001/auth/${id}/banned`);

            users && users.forEach((x) => {
                if (x.id == id && x.banned == true) {
                    x.banned = false;
                }
            });

            dispatch({
                type: UPDATE_USER,
                payload: res.data
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

            dispatch({
                type: UPDATE_PROMOTE,
                payload: users
            });
        } catch (error) {
            console.log("Error: " + error)
        }
    }
}

export const updateToUsers = ({ id, rol }) => async (dispatch, getState) => {

    if (id) {
        const users = getState().product.user.slice();
        try {
            const res = await axios.put(`http://localhost:3001/auth/demote/${id}`);
            users && users.forEach((x) => {
                if (x.id == id && x.rol == "admin") {
                    x.rol = "user";
                }
            });

            dispatch({
                type: UPDATE_PROMOTE,
                payload: users
            });
        } catch (error) {
            console.log("Error: " + error)
        }
    }
}


export const postResertPassword = ({ id }) => async (dispatch, getState) => {

    const users = getState().product.user.slice();
    console.log('LO QUE RECIBE LA ACCION', id);
    try {

        const res = await axios.post(`http://localhost:3001/auth/${id}/forceReset/`);

        dispatch({
            type: POST_RESERT_PASSWORD,
            payload: users
        });

    } catch (error) {
        console.log("Error: " + error)
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
    return function (dispatch) {
        dispatch({ type: LOGIN_USER, payload: { email, password } });
        return axios.post('http://localhost:3001/auth/login', { email, password })
            .then(res => {
                dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data })
                localStorage.setItem('data', res.data);
                let cartItems = localStorage.getItem('cartItems',)
                dispatch({ type: ADD_TO_CART, payload: cartItems })
                localStorage.removeItem('cartItems');
            })
            .catch(error => {
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

export const getUserById = (id) => async (dispatch) => {
    try {
        const respuesta = await axios.get(`http://localhost:3001/users/${id}`);
        dispatch({
            type: GET_USER_BY_ID,
            payload: respuesta.data
        });
    } catch (error) {
        console.log("Error: " + error)
    }
}

export const updatePassword = user => async (dispatch) => {
    try {
        let answer = await axios.put(`http://localhost:3001/users/passwordReset/${user.id}`, user);
        dispatch({
            type: UPDATE_PASSWORD,
            payload: answer.data
        });
    } catch (error) {
        console.log("Error" + error)
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

export const forgotPassword = email => async (dispatch) => {
    try {
        let answer = await axios.post(`http://localhost:3001/users/forgot`, email);
        dispatch({
            type: FORGOT_PASSWORD,
            payload: answer.data
        });
    } catch (error) {
        console.log("Error" + error)
    }
}



export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('data')
    dispatch({ type: LOGOUT_USER })
}




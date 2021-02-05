import axios from 'axios';

import { POST_USER, ADD_TO_CART, GET_USER, UPDATE_USER, UPDATE_PROMOTE, POST_RESERT_PASSWORD } from '../constants/productConstants.js';


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
                if (x.id == id && x.banned == false) {
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

export const postResertPassword = ({ id, password }) => async (dispatch, getState) => {

    const users = getState().product.user.slice();
    console.log('LO QUE RECIBE LA ACCION', id, password);
    try {

        const res = await axios.post(`http://localhost:3001/auth/${id}/forceReset/`);

        users && users.forEach((x) => {
            if (x.id == id && x.password !== null) {
                x.password = null;
            }
        });

        console.log("SE VA------", users);
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
    console.log('buscado el id de usuariooooooooooooooooo')
    console.log(response.data)

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

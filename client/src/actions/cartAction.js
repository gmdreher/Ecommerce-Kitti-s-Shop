import axios from 'axios';
import { ADD_TO_CART, GET_PRODUCT_CART, DELETE_TOTAL_CART } from '../constants/productConstants.js';

export const addProductCart = (data) => async (dispatch) => {

    try {
        const res = await axios.post(`http://localhost:3001/users/${data.userId}/order`, data);
        console.log(res);
        dispatch({
            type: ADD_TO_CART,
            payload: res.data
        });
    } catch (error) {
        console.log("Error: " + error);
    }

};


export const getProductsCart = (data) => async dispatch => {
    console.log("de mi data");
    console.log(data);

    try {
        const res = await axios.get(`http://localhost:3001/users/${data.userId}/order/${data.state}`);
        console.log("Get products cart");
        console.log(res);
        res.data.map((valor) => {
            let dato1 = valor.quantity;
            let ordeId = valor.orderId;
            axios.get(`http://localhost:3001/products/${valor.productId}`)
                .then((data) => {
                    // console.log("Todos los productos de un usuario en su carrito");
                    let order = {
                        description: data.data.description, id: data.data.id,
                        images: data.data.images, name: data.data.name,
                        price: data.data.price, quantity: dato1, orderId: ordeId,
                    }
                    // console.log(order);
                    dispatch({
                        type: GET_PRODUCT_CART,
                        payload: order,
                    });
                });
        })
    } catch (error) {
        console.log("Error: " + error);
    }
}


export const deleteTotalCart = (data) => async dispatch => {

    console.log("Info de delete");
    console.log(data);
    try {

        const res = await axios.delete(`http://localhost:3001/users/${data.userId}/order`, data.orderId);

        console.log("delete accion");
        dispatch({
            type: DELETE_TOTAL_CART,
            payload: res.data.orderId
        });
    } catch (error) {
        console.log("Error: " + error);
    }
}